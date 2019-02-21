/* globals self */
import {getStationMap} from '@mapnificent/runner'

self.addEventListener('message', (event) => {
  var options = event.data.options

  options['progressCallback'] = (data) => {
    // Call postmessage only on self!
    self.postMessage(data)
  }

  var stationMap = getStationMap(
    event.data.coordinates,
    event.data.stations,
    event.data.lines,
    options
  )
  self.postMessage({status: 'done', stationMap: stationMap})
})

export default self
