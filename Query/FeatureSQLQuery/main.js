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
    container: "viewDiv",
    map: map,
    center: [-118.80543, 34.02700], // Longitude, latitude
    zoom: 12
  });

  // Create a UI with the filter expressions
  const sqlExpressions = ["Choose a SQL where clause...", "Roll_LandValue < 200000", "TaxRateArea = 10853", "Bedrooms5 > 0", "UseType = 'Residential'", "Roll_RealEstateExemp > 0"];

  // UI
  const selectFilter = document.createElement("select");
  selectFilter.setAttribute("class", "esri-widget esri-select");
  selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next; font-size: 1em;");

  sqlExpressions.forEach(function (sql) {
    let option = document.createElement("option");
    option.value = sql;
    option.innerHTML = sql;
    selectFilter.appendChild(option);
  });

  view.ui.add(selectFilter, "top-right");

  // Add a feature layer to map with all features visible on client (no filter)
  const featureLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: {
      title: "{UseType}",
      content: "Description: {UseDescription}. Land value: {Roll_LandValue}"
    },
    definitionExpression: "1=0"
  });
  map.add(featureLayer);

  // Server-side filter
  function setFeatureLayerFilter(expression) {
    featureLayer.definitionExpression = expression;
  }

  // Event listener
  selectFilter.addEventListener('change', function (event) {
    setFeatureLayerFilter(event.target.value);
  });

});