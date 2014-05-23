var L=require('leaflet');
require('leaflet-draw');
require('leaflet-providers');

L.Icon.Default.imagePath='node_modules/leaflet/dist/images/';

var map=L.map('map');
map.setView([47.63, -122.32], 11); // 11 is zoom level
var layer=L.tileLayer.provider('Stamen.Watercolor');
layer.addTo(map);

var drawnItems=L.geoJson();
map.addLayer(drawnItems);

var drawControl=new L.Control.Draw({
  edit: { featureGroup: drawnItems }
});

map.addControl(drawControl);

var features=[];
map.on('draw:created', function (e) {
  drawnItems.addLayer(e.layer);
  var layers=drawnItems._layers;
  for (var key in layers) features.push(layers[key].toGeoJSON());
  console.log(drawnItems);
});

map.on('draw:edited', function (e) {
  var layers=drawnItems._layers;
  for (var key in layers) features.push(layers[key].toGeoJSON());
  console.log(drawnItems);
});

