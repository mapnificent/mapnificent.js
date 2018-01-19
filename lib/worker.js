var mapnificent = require('./mapnificent')

module.exports = function(event) {
  var options = event.data.options;
  options['progressCallback'] = postMessage

  var stationMap = mapnificent(event.data.data, event.data.coordinates, options);
  postMessage({status: 'done', stationMap: stationMap});
}

onmessage = module.exports = mapnificentWorker;
