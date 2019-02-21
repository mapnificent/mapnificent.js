import Quadtree from '@mapnificent/quadtree'

var runMapnificentNetwork = function (nextStations, stations, lines, options) {
  var nsl = nextStations.length
  var stationMap = {}
  var uberNextStations = []
  var count = 0
  var i, j, arrival, stationId, station, travelOptionLength,
    stay, seconds, line, nextSeconds, nextwalkTime, waittime, fromStation,
    testWalkTime, walkTime, trace, next, debugMap
  var secondsPerM = 1 / options.walkingSpeed

  const debug = options.debug

  if (debug) {
    debugMap = {}
  }

  while (nsl > 0) { // as long as we have next stations to go
    for (i = 0; i < nsl; i += 1) {
      count += 1
      // Reporting progress to main thread occasionally
      if (options.reportInterval !== 0 && count % options.reportInterval === 0) {
        options.progressCallback({status: 'working', at: count})
      }

      arrival = nextStations[i]
      stationId = arrival.stationId
      line = arrival.line
      seconds = arrival.seconds
      stay = arrival.stay
      walkTime = arrival.walkTime
      fromStation = arrival.fromStation
      station = stations[stationId]

      if (station.TravelOptions !== undefined) {
        travelOptionLength = station.TravelOptions.length
      } else {
        travelOptionLength = 0
      }

      if (debug) {
        trace = arrival.trace
        if (trace === undefined) {
          trace = []
        }
        trace.push({
          from: fromStation,
          to: stationId,
          time: seconds,
          walkTime: walkTime,
          line: line,
          waittime: arrival.waittime,
          stay: stay
        })
      }
      /* ## Same line look ahead
         if you are on line 1 and you arrive at station X,
         only to realize that you arrived at X before in shorter time with another line 2!
         No despair, your arrival migth be still of use!
         Since anyone who arrived here before with line 2 has to wait for your line 1
         Therefore you still might be faster to arrive at the next stop on line 1,
         because you don't have to wait, you are on line 1 (only wait = stay time)
         Check if you can arrive faster at the next station of your line and if so, travel there.
      */
      if (line !== -1 && stationMap[stationId] !== undefined &&
                         stationMap[stationId] <= seconds) {
        for (j = 0; j < travelOptionLength; j += 1) {
          let rStation = station.TravelOptions[j]
          var travelTime = rStation.TravelTime || 0
          rStation.Stop = rStation.Stop || 0
          if (rStation.Stop !== fromStation && rStation.Line === line) {
            nextSeconds = seconds + travelTime + stay
            if (stationMap[rStation.Stop] === undefined ||
                stationMap[rStation.Stop] > nextSeconds) {
              next = {
                stationId: rStation.Stop,
                line: rStation.Line,
                stay: rStation.StayTime || 0,
                seconds: nextSeconds,
                walkTime: walkTime,
                fromStation: stationId
              }
              if (debug) {
                next.trace = trace.slice()
              }
              uberNextStations.push(next)
            }
          }
        }
        // stationMap[stationId] <= seconds from above still holds, continue;
        continue
      }
      // If I arrived faster before at this station, continue;
      if (stationMap[stationId] !== undefined && stationMap[stationId] <= seconds) {
        continue
      }
      // If I arrived here the fastest, record the time
      stationMap[stationId] = seconds
      if (debug) {
        debugMap[stationId] = trace.slice()
      }

      // check all connections from this station
      for (j = 0; j < travelOptionLength; j += 1) {
        let rStation = station.TravelOptions[j]
        let travelTime = rStation.TravelTime || 0
        rStation.Stop = rStation.Stop || 0
        nextwalkTime = walkTime
        waittime = 0
        if (rStation.Stop === fromStation) {
          // don't go back, can't possibly be faster
          continue
        }
        if (rStation.WalkDistance !== undefined) { // Walking
          /* calculate time to travel the distance, if it takes longer than
            maximum allowed walking time, continue */
          testWalkTime = rStation.WalkDistance * secondsPerM
          if (walkTime + testWalkTime > options.maxWalkTime) {
            continue
          }
          nextSeconds = seconds + testWalkTime
          nextwalkTime += testWalkTime
        } else if (fromStation === -1) {
          // My first station
          if (lines[rStation.Line] === undefined) {
            // line is not in service at current time
            continue
          }
          // I don't have to wait (design decision)
          nextSeconds = seconds + travelTime
        } else if (rStation.Line === line) {
          // Same line! The current transport may pause here for some time
          nextSeconds = seconds + travelTime + stay
        } else {
          waittime = lines[rStation.Line]
          if (waittime === undefined) {
            // line is not in service at current time
            continue
          }
          // Switch line! Guess the wait time for the next line
          // Apply clever heuristic. Yeah...
          if (waittime > 0 && waittime < 10) {
            waittime = waittime / 2
            // waittime = waittime/2;
          } else if (waittime >= 10) {
            waittime = waittime / 2.3
          } else {
            waittime = 0
          }
          nextSeconds = seconds + waittime + travelTime
          if (nextSeconds < 0) {
            nextSeconds = 0 // whut??
          }
        }
        // add to next station list
        next = {
          stationId: rStation.Stop,
          line: !rStation.Line ? -1 : rStation.Line,
          stay: rStation.StayTime || 0,
          waittime: waittime,
          seconds: nextSeconds,
          walkTime: nextwalkTime,
          fromStation: stationId
        }

        if (debug) {
          next.trace = trace.slice()
        }
        uberNextStations.push(next)
      }
    }
    nextStations = uberNextStations
    nsl = nextStations.length
    uberNextStations = []
  }

  options.progressCallback({status: 'working', at: count})
  return stationMap
}

var getStationMap = function (coordinates, stations, lines, options) {
  const quadtree = Quadtree.create(stations)

  var optimizedLines = {}

  // throw away any time ranges that are not the requested one
  for (var line in lines) {
    if (lines[line][options.intervalKey] !== undefined) {
      optimizedLines[line] = lines[line][options.intervalKey]
    }
  }

  var nextStations = quadtree.getDistancesInRadius(
      coordinates[1],
      coordinates[0],
      options.searchRadius
  )

  // Add initial seed of stations to walk to and start traveling from there
  var startStations = []
  for (var k = 0; k < nextStations.length; k += 1) {
    var stationId = nextStations[k][0].id
    var distance = nextStations[k][1]
    var seconds = distance * (1 / options.walkingSpeed)
    if (seconds <= options.maxWalkTime) {
      startStations.push({
        stationId: stationId,
        line: -1,  // walking to station
        stay: 0,
        seconds: seconds,
        walkTime: seconds,
        fromStation: -1
      })
    }
  }
  if (options.reportInterval !== 0) {
    options.progressCallback({status: 'working', at: 0})
  }

  return runMapnificentNetwork(startStations, stations, optimizedLines, options)
}

export {
  runMapnificentNetwork,
  getStationMap
}
