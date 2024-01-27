require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

  esriConfig.apiKey = "AAPKcf0e552bb1ad4ee9bb07ee1824ff1577B7hcvmdLR-rRa9W7It-3RF4pO7ka9Ckxzzh4ZYOthZzivrGtOP_wwrYGSoh1F5XZ";

  const map = new Map({
    basemap: "osm/standard"
  });

  const view = new MapView({
    map: map,
    center: [18.384279891983827, -33.91761928861323], // Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv" // Div element
  });

  //Graphics Layer to store a Graphic
  const graphicsLayer = new GraphicsLayer();
  // Add point graphic to map object
  map.add(graphicsLayer);

  // Create a point graphic
  const point = {
    type: "point",
    longitude: 18.385653183140366,
    latitude: -33.9185096064487
  };

  // Create a simple marker symbol
  const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [230, 46, 46], // Red
    outline: {
      color: [255, 255, 255], // White
      width: 1
    }
  };

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
  });

  graphicsLayer.add(pointGraphic);

  // Create a 2nd Point graphic
  const point2 = {
    type: "point",
    longitude: 18.39299170655888,
    latitude: -33.919969707579234
  }
  // Style the 2nd point
  const secondMarkerSymbol = {
    type: "simple-marker",
    color: [255, 106, 0], // Orange
    outline: {
      color: [255, 255, 255], // White
      width: 1
    }
  }
  // Create a 2nd point graphic object
  const secondPointGraphic = new Graphic({
    geometry: point2,
    symbol: secondMarkerSymbol
  });

  graphicsLayer.add(secondPointGraphic);

  // Create a 3rd point graphic
  const point3 = {
    type: "point",
    longitude: 18.379301712336634,
    latitude: -33.92296105620783
  }
  // Style the 3rd point
  const thirdMarkerSymbol = {
    type: "simple-marker",
    color: [0, 181, 88], // Green
    outline: {
      color: [255, 255, 255], // White
      width: 1
    }
  }
  // Create a 3rd point graphic object
  const thirdPointGraphic = new Graphic({
    geometry: point3,
    symbol: thirdMarkerSymbol
  });

  graphicsLayer.add(thirdPointGraphic);


  // Object to hold properties for each basemap
  const updateBasemapStyle = (basemapId) => {
    view.map.basemap = basemapId;
  };

  // Create a basemap gallery widget for the Combobox
  const basemapStylesDiv = document.getElementById("basemapStyles");
  view.ui.add(basemapStylesDiv, "top-right");

  // Get the value from the Combobox
  const styleCombobox = document.getElementById("styleCombobox");
  styleCombobox.addEventListener("calciteComboboxChange", (event) => {
    updateBasemapStyle(event.target.value);
  });

});