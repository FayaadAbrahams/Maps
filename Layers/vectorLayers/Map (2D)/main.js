require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/layers/VectorTileLayer"
], function (esriConfig, Map, MapView, VectorTileLayer) {

  esriConfig.apiKey = "AAPKcf0e552bb1ad4ee9bb07ee1824ff1577B7hcvmdLR-rRa9W7It-3RF4pO7ka9Ckxzzh4ZYOthZzivrGtOP_wwrYGSoh1F5XZ";

  const vTLLayer = new VectorTileLayer({
    url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
  });

  const map = new Map({
    basemap: "arcgis/topographic",// basemap styles service
    layers: [vTLLayer]
  });

  const view = new MapView({
    map: map,
    center: [18.384580252731308, -33.917565440496], // Longitude, latitude
    zoom: 15, // Zoom level
    container: "viewDiv" // Div element
  });

});