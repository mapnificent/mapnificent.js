const Quadtree = require('./quadtree');
const turf = {
  buffer: require('turf-buffer'),
  featurecollection: require('turf-featurecollection'),
  union: require('turf-union'),
  bbox: require('turf-bbox')
};

const h = require('virtual-hyperscript-svg')
const geojson2svg = require('geojson-to-svg');
const mercator = require('projections/mercator')
const toHTML = require('virtual-dom-stringify')
const svgify = require('geojson-svgify')


var runMapnificentNetwork = function(nextStations, stations, lines, options) {
  var nsl = nextStations.length,
    stationMap = {},
    uberNextStations = [], count = 0,
    i, j, arrival, stationId, station, rStation, travelOptionLength,
    stay, seconds, line, nextSeconds, nextwalkTime, waittime, fromStation,
    testWalkTime, walkTime, closeStations = {}, trace, next;

  while (nsl > 0){ // as long as we have next stations to go
    for (i = 0; i < nsl; i += 1){
      count += 1;
      // Reporting progress to main thread occasionally
      if (options.reportInterval !== 0 && count % options.reportInterval === 0){
        options.progressCallback({status: 'working', at: count});
      }

      arrival = nextStations[i];
      stationId = arrival.stationId;
      line = arrival.line;
      seconds = arrival.seconds;
      stay = arrival.stay;
      walkTime = arrival.walkTime;
      fromStation = arrival.fromStation;
      station = stations[stationId];
      travelOptionLength = station.TravelOptions.length;
      if (options.debug) {
        trace = arrival.trace;
        if (trace === undefined) {
          trace = []
        }
        trace.push({
          from: fromStation,
          to: stationId,
          time: seconds,
          walkTime: walkTime,
          line: line,
        });
      }
      /* I call the following: same line look ahead
         if you are on line 1 and you arrive at station X,
         only to realize that you arrived at X before in shorter time with another line Z!
         No despair, your arrival migth be still of use!
         Since anyone who arrived here before with line Z has to wait for your line 1
         Therefore you still might be faster to arrive at the next stop on line 1,
         because you don't have to wait, you are on line 1 (only wait = stay time)
         Check if you can arrive faster at the next station of your line and if so, travel there.
      */
      if (line !== -1 && stationMap[stationId] !== undefined &&
                         stationMap[stationId] <= seconds){
        for (j = 0; j < travelOptionLength; j += 1){
          rStation = station.TravelOptions[j];
          if(rStation.Stop != fromStation && rStation.Line === line){
            nextSeconds = seconds + rStation.TravelTime + stay;
            if (stationMap[rStation.Stop] === undefined ||
                stationMap[rStation.Stop] > nextSeconds) {
                next = {
                  stationId: rStation.Stop,
                  line: rStation.Line,
                  stay: rStation.StayTime,
                  seconds: nextSeconds,
                  walkTime: walkTime,
                  fromStation: stationId
                }
                if (options.debug) {
                  next.trace = trace.slice();
                }
                uberNextStations.push(next);
            }
          }
        }
        // stationMap[stationId] <= seconds from above still holds, continue;
        continue;
      }
      // If I arrived faster before at this station, continue;
      if(stationMap[stationId] !== undefined && stationMap[stationId] <= seconds){
        continue;
      }
      // If I arrived here the fastest, record the time
      stationMap[stationId] = seconds;
      if (options.debug) {
        debugMap[stationId] = trace.slice();
      }

      // Check if walking to nearby station helps
      // var maxWalkDistance = 50;
      // activate quadtree calc here
      // if (station.walkDistancesSet !== undefined) {
      //   var walkNextStations = quadtree.getDistancesInRadius(
      //       station.Latitude,
      //       station.Longitude,
      //       maxWalkDistance
      //   );
      //   var walkCount = 0;
      //   var walkTravelOptions = [];
      //
      //   for (var m = 0; m < walkNextStations.length; m += 1) {
      //     var walkStationId = walkNextStations[m][0].id;
      //     if (walkStationId === stationId) {
      //       continue;
      //     }
      //     station.TravelOptions.push({
      //       WalkDistance: walkNextStations[m][1],
      //       TravelTime: 0,
      //       StayTime: 0,
      //       Line: false,
      //       Stop: walkNextStations[m][0].id
      //     });
      //   }
      //   station.walkDistancesSet = true;
      //   travelOptionLength = station.TravelOptions.length;
      // }

      // check all connections from this station
      for (j = 0; j < travelOptionLength; j += 1) {
        rStation = station.TravelOptions[j];
        nextwalkTime = walkTime;
        if (rStation.Stop === fromStation) {
          // don't go back, can't possibly be faster
          continue;
        }
        if (!!rStation.WalkDistance) { // Walking
          /* calculate time to travel the distance, if it takes longer than
            maximum allowed walking time, continue */
          testWalkTime = rStation.WalkDistance * options.secondsPerM;
          if (walkTime + testWalkTime > options.maxWalkTime) {
            continue;
          }
          nextSeconds = seconds + testWalkTime;
          nextwalkTime += testWalkTime;
        }
        else if (fromStation === -1) {
          // My first station
          if (lines[rStation.Line] === undefined) {
            // line is not in service at current time
            continue;
          }
          // I don't have to wait (design decision)
          nextSeconds = seconds + rStation.TravelTime;
        } else if (rStation.Line === line) {
          // Same line! The current transport may pause here for some time
          nextSeconds = seconds + rStation.TravelTime + stay;
        } else {
          waittime = lines[rStation.Line];
          if (waittime === undefined) {
            // line is not in service at current time
            continue;
          }
          // Switch line! Guess the wait time for the next line
          // Apply clever heuristic. Yeah...
          if (waittime > 0 && waittime < 10) {
            waittime = waittime / 2;
            // waittime = waittime/2;
          } else if (waittime >= 10){
            waittime = waittime / 2.3;
          } else {
            waittime = 0;
          }
          nextSeconds = seconds + waittime + rStation.TravelTime;
          if (nextSeconds < 0){
            nextSeconds = 0; // whut??
          }
        }
        // add to next station list
        next = {
          stationId: rStation.Stop,
          line: !rStation.Line ? -1 : rStation.Line,
          stay: rStation.StayTime || 0,
          seconds: nextSeconds,
          walkTime: nextwalkTime,
          fromStation: stationId
        };

        if (options.debug) {
          next.trace = trace.slice();
        }
        uberNextStations.push(next);
      }
    }
    nextStations = uberNextStations;
    nsl = nextStations.length;
    uberNextStations = [];
  }
  options.progressCallback({status: 'working', at: count});
  return stationMap;
};

var getLineTimesByInterval = function(lineTimes) {
  var result = {};
  for (var i = 0; i < lineTimes.length; i += 1) {
    result[lineTimes[i].Weekday + '-' + lineTimes[i].Start] = lineTimes[i].Interval;
  }
  return result;
};

function Mapnificent(data, options) {
  options = options || {};
  var stations = data.Stops;
  var lines = {};
  var selat = Infinity, nwlat = -Infinity, nwlng = Infinity, selng = -Infinity;

  for (var i = 0; i < stations.length; i += 1){
    stations[i].id = i;
    stations[i].lat = data.Stops[i].Latitude;
    stations[i].lng = data.Stops[i].Longitude;
    selat = Math.min(selat, stations[i].lat);
    nwlat = Math.max(nwlat, stations[i].lat);
    selng = Math.max(selng, stations[i].lng);
    nwlng = Math.min(nwlng, stations[i].lng);
  }

  for (i = 0; i < data.Lines.length; i += 1) {
    if (!data.Lines[i].LineTimes[0]) { continue; }
    lines[data.Lines[i].LineId] = getLineTimesByInterval(data.Lines[i].LineTimes);
  }

  var b = 0.01;
  options.bounds = options.bounds || [selat - b, nwlat + b, nwlng - b, selng + b];
  this.setOptions(options);

  this.quadtree = Quadtree.create(
      options.bounds[0], options.bounds[1],
      options.bounds[2], options.bounds[3]
    );

  this.quadtree.insertAll(stations);

  this.lines = lines;
  this.stations = stations;
}

Mapnificent.prototype.setOptions = function(options) {
  options = options || {};
  options.searchRadius = options.searchRadius || 250;
  options.reportInterval = options.reportInterval || 0;
  options.maxWalkTime = options.maxWalkTime || (15 * 60);
  options.secondsPerM = options.secondsPerM || ((13 * 60) / 1000);
  options.intervalKey = options.intervalKey || '1-6';
  options.progressCallback = options.progressCallback || function() {};
  this.options = options;
};

Mapnificent.prototype.getStationMapForCoordinates = function(coordinates) {
  var optimizedLines = {};

  // throw away any time ranges that are not the requested one
  for(var line in this.lines){
    if(this.lines[line][this.options.intervalKey] !== undefined){
      optimizedLines[line] = this.lines[line][this.options.intervalKey];
    }
  }

  var nextStations = this.quadtree.getDistancesInRadius(
      coordinates[1],
      coordinates[0],
      this.options.searchRadius
  );

  // Add initial seed of stations to walk to and start traveling from there

  var startStations = [];
  for (var k = 0; k < nextStations.length; k += 1) {
    var stationId = nextStations[k][0].id;
    var distance = nextStations[k][1];
    var seconds = distance * this.options.secondsPerM;
    if (seconds <= this.options.maxWalkTime){
      startStations.push({
        stationId: stationId,
        line: -1,  // walking to station
        stay: 0,
        seconds: seconds,
        walkTime: seconds,
        fromStation: -1
      });
    }
  }
  var stationMap = runMapnificentNetwork(startStations, this.stations, optimizedLines, this.options);

  if (this.options.reportInterval !== 0) {
    this.options.progressCallback({status: 'working', at: count});
  }

  return stationMap;
};

Mapnificent.prototype.getStationMapAsGeoJSON = function(stationMap) {
  var features = [];
  for (var key in stationMap) {
    var time = stationMap[key];
    var station = this.stations[key];
    features.push({
      "type": "Feature",
      "properties": {
        "stationid": station.id,
        "time": time,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [station.lng, station.lat]
      }
    });
  }
  return features;
};


Mapnificent.prototype.getCirclesAtTime = function(stationMap, time) {
  var features = [];
  var pointFeatures = this.getStationMapAsGeoJSON(stationMap);
  for (var i = 0; i < pointFeatures.length; i += 1) {
    let point = pointFeatures[i];
    if (point.properties.time < time) {
      var secs = Math.min((time - point.properties.time), this.options.maxWalkTime);
      var mradius = secs * (1 / this.options.secondsPerM);
      var circle = turf.buffer(point, mradius, 'meters');
      circle.properties = point.properties;
      features.push(
        circle
      );
    }

  }
  return features;
};

Mapnificent.prototype.getShapeAtTime = function(stationMap, time) {
  var circleFeatures = this.getCirclesAtTime(stationMap, time);
  var unionPoly;
  for (var i = 0; i < circleFeatures.length; i += 1) {
    let circle = circleFeatures[i];
    if (unionPoly) {
      unionPoly = turf.union(unionPoly, circle);
    } else {
      unionPoly = circle;
    }
  }
  // unionPoly.properties = {'time':
  //  time;
  if (!unionPoly) {
    return {type: 'FeatureCollection', features: []};
  }
  return {
    type: 'FeatureCollection',
    features: [unionPoly]
  }
};

Mapnificent.prototype._getSVGAtTime = function(stationMap, time) {

  let geojson = this.getShapeAtTime(stationMap, time)
  let svg = geojson2svg()
    .styles({ 'MultiPolygon' : { fill: '#aaa', stroke: 'none' } })
    .projection(function(coords){
      return
    })
    .data(geojson)
    .render();

  return svg;
}

Mapnificent.prototype.getSVGAtTime = function(stationMap, time) {

  let geojson = this.getShapeAtTime(stationMap, time)

  let factor = 100000

  let mercatorProjection = ([lon, lat]) => {
    const {x, y} = mercator({lon, lat})
    return [x * 100, y * 100] // todo
  }

  const polylines = svgify(geojson, {projection: mercatorProjection});

  // const centroid = turf.centroid(geojson)

  const [west, south, east, north] = turf.bbox(geojson);

  const [left, top] = mercatorProjection([west, north]);
  const [right, bottom] = mercatorProjection([east, south]);
  let width = Math.abs(right - left);
  let height = Math.abs(bottom - top);

  const styles = h('style', {}, `
      .shape {
          stroke: none;
          fill: #aaa;
      }
  `);

  let viewPortWidth = 1200;
  let viewPortHeight = Math.round(height / width * viewPortWidth)

  const svg = h('svg', {
      width: viewPortWidth,
      height: viewPortHeight,
      viewBox: [left, top, width, height].join(',')
  }, [].concat(styles, polylines));

  return toHTML(svg);
}

module.exports = Mapnificent;
