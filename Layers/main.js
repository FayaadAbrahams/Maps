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

   //Trailheads feature layer (points)
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
  });

  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  });

  map.add(parksLayer, 0);
  map.add(trailsLayer, 0);
  map.add(trailheadsLayer);

  // Create a new map view with specified properties
  const view = new MapView({
    map: map,
    // center: [18.384580252731308, -33.917565440496], // Longitude, latitude
    center: [-118.80543,34.02700], //Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv" // Div element
  });

  // POLYGON SHAPE
  // Define the renderer for the trailheads layer
  const trailheadsRenderer = {
    "type": "simple",
    "symbol": {
      "type": "picture-marker",
      "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
      "width": "18px",
      "height": "18px"
    }
  };

  // Define the label symbol and placement for the trailheads layer
  const trailheadsLabels = {
    symbol: {
      type: "text",
      color: [255, 0, 89],
      haloColor: "#ffffff",
      haloSize: "2px",
      font: {
        size: "12px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal"
      }
    },

    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: "$feature.TRL_NAME"
    }
  };

  // Create the feature layer for trailheads with defined renderer and labeling
  const trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    renderer: trailheadsRenderer,
    labelingInfo: [trailheadsLabels]
  });

  map.add(trailheads);

  // LINE SHAPE
  // Define a unique value renderer and symbols
  const trailsRenderer = {
    type: "simple",
    symbol: {
      color: "BA55D3",
      type: "simple-line",
      style: "solid"
    },

    visualVariables: [
      {
        type: "size",
        field: "ELEV_GAIN",
        minDataValue: 0,
        maxDataValue: 2300,
        minSize: "3px",
        maxSize: "7px"
      }
    ]
  };

  const trails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    renderer: trailsRenderer,
    opacity: 0.75
  });

  // Add the layer
  map.add(trails, 0);

 
});

