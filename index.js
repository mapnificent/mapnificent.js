var fs = require('fs');

var protobuf = require("protobufjs");

var Mapnificent = require('./lib/mapnificent');

protobuf.load("mapnificent.proto", function(err, root) {
  if (err) throw err;
  const MapnificentNetwork = root.lookupType("mapnificent.MapnificentNetwork");
  let buffer = fs.readFileSync(process.argv[2])
  let network = MapnificentNetwork.decode(buffer);
  // let coordinates = [-83.7263294, 42.2708716];
  let coordinates = [13.3695, 52.5256];
  let mapnificent = new Mapnificent(network);

  var stationMap = mapnificent.getStationMapForCoordinates(coordinates);
  // var features = [];
  // for (var t = 5; t < 60; t += 10) {
  //   let geojson = mapnificent.getShapeAtTime(stationMap, t * 60);
  //   features.concat(geojson.features);
  // }
  // console.log(JSON.stringify(mapnificent.getShapeAtTime(stationMap, 40 * 60)));
  console.log(mapnificent.getSVGAtTime(stationMap, 15 * 60));
});
