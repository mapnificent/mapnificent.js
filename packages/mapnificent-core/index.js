import Quadtree from '@mapnificent/quadtree'

import {getStationMap} from '@mapnificent/runner'
import {fromBuffer, fromCity} from '@mapnificent/loader'

const MAX_WALK_TIME = 15 * 60 // in seconds
const WALKING_SPEED = 1.3 // in meters per second
const SEARCH_RADUIUS = MAX_WALK_TIME * WALKING_SPEED

var getLineTimesByInterval = function (lineTimes) {
  var result = {}
  for (var i = 0; i < lineTimes.length; i += 1) {
    result[lineTimes[i].Weekday + '-' + lineTimes[i].Start] = lineTimes[i].Interval
  }
  return result
}

class Mapnificent {
  constructor (data, options) {
    options = options || {}

    var stations = data.Stops
    var lines = {}

    for (var i = 0; i < stations.length; i += 1) {
      stations[i].id = i
      stations[i].lat = data.Stops[i].Latitude
      stations[i].lng = data.Stops[i].Longitude
    }

    for (i = 0; i < data.Lines.length; i += 1) {
      if (!data.Lines[i].LineTimes[0]) { continue }
      lines[data.Lines[i].LineId] = getLineTimesByInterval(data.Lines[i].LineTimes)
    }
    this.setOptions(options)

    this.quadtree = Quadtree.create(stations)

    this.lines = lines
    this.stations = stations
  }

  static fromBuffer (buffer, options) {
    return new Promise((resolve, reject) => {
      resolve(
        new Mapnificent(fromBuffer(buffer), options)
      )
    })
  }

  static fromCity (city, options) {
    return fromCity(city, options).then((network) => {
      return new Mapnificent(network)
    })
  }

  setOptions (options) {
    options = options || {}
    this.options = {
      reportInterval: 0,
      maxWalkTime: MAX_WALK_TIME,
      walkingSpeed: WALKING_SPEED,
      searchRadius: SEARCH_RADUIUS,
      intervalKey: '1-6'
    }
    for (var o in options) {
      this.options[o] = options[o]
    }
  }

  startWorkerForCoordinates (worker, coordinates) {
    worker.postMessage({
      coordinates: coordinates,
      stations: this.stations,
      lines: this.lines,
      options: this.options
    })
  }

  getStationMapForCoordinates (coordinates) {
    var stationMap = getStationMap(
      coordinates,
      this.stations,
      this.lines,
      this.options
    )
    return stationMap
  }
}

export default Mapnificent
