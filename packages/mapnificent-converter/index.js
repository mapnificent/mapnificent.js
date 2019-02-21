import turfBuffer from '@turf/buffer'
import turfUnion from '@turf/union'
import turfBbox from '@turf/bbox'

const h = require('virtual-hyperscript-svg')
const geojson2svg = require('geojson-to-svg')
const mercator = require('projections/mercator')
const toHTML = require('virtual-dom-stringify')
const svgify = require('geojson-svgify')

class MapnificentConverter {
  constructor (options, stationMap) {
    this.options = options
    this.stationMap = stationMap
  }
  getStationMapAsGeoJSON () {
    var features = []
    for (var key in this.stationMap) {
      var time = this.stationMap[key]
      var station = this.stations[key]
      features.push({
        'type': 'Feature',
        'properties': {
          'stationid': station.id,
          'time': time
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [station.lng, station.lat]
        }
      })
    }
    return features
  }

  getCirclesAtTime (time) {
    var features = []
    var pointFeatures = this.getStationMapAsGeoJSON()
    for (var i = 0; i < pointFeatures.length; i += 1) {
      let point = pointFeatures[i]
      if (point.properties.time < time) {
        var secs = Math.min((time - point.properties.time), this.options.maxWalkTime)
        var mradius = secs * (1 / this.options.secondsPerM)
        var circle = turfBuffer(point, mradius, 'meters')
        circle.properties = point.properties
        features.push(
          circle
        )
      }
    }
    return features
  }

  getShapeAtTime (time) {
    var circleFeatures = this.getCirclesAtTime(time)
    var unionPoly
    for (var i = 0; i < circleFeatures.length; i += 1) {
      let circle = circleFeatures[i]
      if (unionPoly) {
        unionPoly = turfUnion(unionPoly, circle)
      } else {
        unionPoly = circle
      }
    }
    // unionPoly.properties = {'time':
    //  time;
    if (!unionPoly) {
      return {type: 'FeatureCollection', features: []}
    }
    return {
      type: 'FeatureCollection',
      features: [unionPoly]
    }
  }

  _getSVGAtTime (time) {
    let geojson = this.getShapeAtTime(time)
    let svg = geojson2svg()
      .styles({ 'MultiPolygon': { fill: '#aaa', stroke: 'none' } })
      .projection(function (coords) {

      })
      .data(geojson)
      .render()

    return svg
  }

  getSVGAtTime (time) {
    let geojson = this.getShapeAtTime(time)

    // let factor = 100000

    let mercatorProjection = ([lon, lat]) => {
      const {x, y} = mercator({lon, lat})
      return [x * 100, y * 100] // todo
    }

    const polylines = svgify(geojson, {projection: mercatorProjection})

    // const centroid = turf.centroid(geojson)

    const [west, south, east, north] = turfBbox(geojson)

    const [left, top] = mercatorProjection([west, north])
    const [right, bottom] = mercatorProjection([east, south])
    let width = Math.abs(right - left)
    let height = Math.abs(bottom - top)

    const styles = h('style', {}, `
        .shape {
            stroke: none;
            fill: #aaa;
        }
    `)

    let viewPortWidth = 1200
    let viewPortHeight = Math.round(height / width * viewPortWidth)

    const svg = h('svg', {
      width: viewPortWidth,
      height: viewPortHeight,
      viewBox: [left, top, width, height].join(',')
    }, [].concat(styles, polylines))

    return toHTML(svg)
  }
}

export default MapnificentConverter
