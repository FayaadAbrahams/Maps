require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/Graphic",
  "esri/layers/GraphicsLayer"
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

  esriConfig.apiKey = "AAPKcf0e552bb1ad4ee9bb07ee1824ff1577B7hcvmdLR-rRa9W7It-3RF4pO7ka9Ckxzzh4ZYOthZzivrGtOP_wwrYGSoh1F5XZ";

  const map = new Map({
    basemap: "osm/standard-relief" // basemap styles service
  });

  const view = new MapView({
    map: map,
    center: [18.50823197308748, -33.989426929366324], // Longitude, latitude
    zoom: 14, // Zoom level
    container: "viewDiv" // Div element
  });

  //Create a graphics layer, so we can place it above the base map layer
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  //Construct the line, this is set by the co-ordinates on map
  const polyline = {
    type: "polyline",
    paths: [
      [18.505164843854825, -33.98600444145761],//First Point
      [18.50430833178321, -33.983688487738725],//Second Point
      [18.507463733815424, -33.98286720950386],//Third Point
      [18.508287644346055, -33.98517839702311], //Fourth Point
      [18.50602412055101, -33.98575506959276],// Fifth Point
      [18.50691920044287, -33.98837343767994] // Sixth Point
    ]
  };

  // Visually customize the line
  const simpleLineSymbol = {
    type: "simple-line",
    color: [235, 52, 52], //Red
    width: 4
  };

  const polyLineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  });

  // Create a point graphic
  const point = {
    type: "point",
    longitude: 18.506917695210472,
    latitude: -33.988343248500065
  };

  // Create a simple marker symbol
  const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [230, 46, 46], // Red
    outline: {
      color: [0, 0, 0], // White
      width: 3
    }
  };

  // Create a Graphic object for the point with specified geometry and symbol
  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
  });


  //Create a polygon geometry
  const polygon = {
    type: "polygon",
    rings: [
      [18.480980294661318, -33.99971037387518],
      [18.486568112593794, -33.99965047049178],
      [18.48618274583983, -33.99308080977499],
      [18.48093739468188, -33.99354630417455]
    ]
  }

  const simpleFillSymbol = {
    type: "simple-fill",
    color: [181, 7, 103, 0.9], //Pink, Opacity at 90%
    outline: {
      color: [255, 255, 255], // White
      width: 1
    }
  };

  const popupTemplate = {
    title: "Kenilworth Racecourse",
    content: "Kenilworth Racecourse Conservation Area is a 52-hectare nature reserve, situated in the centre of Kenilworth Racecourse, in Cape Town, South Africa. Due to its location, it has been left undisturbed for more than 100 years, making it now the best preserved patch of “Cape Flats Sand Fynbos” in the world."

  }
  const attributes = {
    title: "Kenilworth Racecourse",
    content: "Kenilworth Racecourse Conservation Area is a 52-hectare nature reserve, situated in the centre of Kenilworth Racecourse, in Cape Town, South Africa. Due to its location, it has been left undisturbed for more than 100 years, making it now the best preserved patch of “Cape Flats Sand Fynbos” in the world."
  }

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,
    attributes: attributes,
    popupTemplate: popupTemplate
  })

  //Add the Graphics to the Graphics Layer
  graphicsLayer.add(pointGraphic);
  graphicsLayer.add(polyLineGraphic);
  graphicsLayer.add(polygonGraphic);
});