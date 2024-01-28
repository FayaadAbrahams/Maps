require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/layers/FeatureLayer"
], function (esriConfig, Map, MapView, FeatureLayer) {

  esriConfig.apiKey = "AAPKcf0e552bb1ad4ee9bb07ee1824ff1577B7hcvmdLR-rRa9W7It-3RF4pO7ka9Ckxzzh4ZYOthZzivrGtOP_wwrYGSoh1F5XZ";

  const map = new Map({
    basemap: "arcgis/topographic" // basemap styles service
  });

  const view = new MapView({
    map: map,
    center: [18.384580252731308, -33.917565440496], // Longitude, latitude
    zoom: 15, // Zoom level
    container: "viewDiv" // Div element
  });

  // SQL Query Array, Allows the option to select the specific query we want to use
  const parcelLayerSQL = ["Choose a SQL where clause...", "UseType = 'Residential'", "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
  let whereClause = parcelLayerSQL[0];

  const select = 
});