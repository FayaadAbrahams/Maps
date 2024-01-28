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

  // Define feature layers for displaying trailheads, trails, and parks
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
  });

  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  });

  // Create a new MapView object with specified properties
  const view = new MapView({
    map: map,
    // center: [18.384580252731308, -33.917565440496], // Longitude, latitude
    center: [-118.80543, 34.02700], //Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv" // Div element
  });

  ////////////////  AREA SHAPE ////////////////  
  // Define the renderer for the trailheads in a Shape layer
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
      color: [255, 0, 68],
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

  ////////////////  LINE SHAPE ////////////////
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

  ////////////////  POINT SHAPE (Pop-up Graphic) ////////////////
  const pointPopUp = {
    "title": "Trailhead",
    "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
  }

  const pointPopUpFeatureLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
    popupTemplate: pointPopUp
  });

  ////////////////  CHART ITEM  ////////////////
  const trailsCharts = {
    title: "Trail Info",
    content: [{
      type: "media",
      mediaInfos: [{
        type: "column-chart",
        caption: "Table representing the trail information.",
        value: {
          fields: ["ELEV_MIN", "ELEV_MAX"],
          normalizeField: null,
          tooltipField: "Min & Max elevation values"
        }
      }]
    }]
  }

  const chartFeatureLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    outFields: ["TRL_NAME", "ELEV_GAIN"],
    popupTemplate: trailsCharts
  });

  ////////////////  TABLE ITEM  ////////////////
  // Define popup for Parks and Open Spaces
  const popupOpenspaces = {
    "title": "{PARK_NAME}",
    "content": [{
      "type": "fields",
      "fieldInfos": [
        {
          "fieldName": "AGNCY_NAME",
          "label": "Agency",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": null,
          "stringFieldOption": "text-box"
        },
        {
          "fieldName": "TYPE",
          "label": "Type",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": null,
          "stringFieldOption": "text-box"
        },
        {
          "fieldName": "ACCESS_TYP",
          "label": "Access",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": null,
          "stringFieldOption": "text-box"
        },

        {
          "fieldName": "GIS_ACRES",
          "label": "Acres",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": {
            "places": 2,
            "digitSeparator": true
          },

          "stringFieldOption": "text-box"
        }
      ]
    }]
  }

  const openSpaces = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
    outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES", "TRLS_MI", "TOTAL_GOOD", "TOTAL_FAIR", "TOTAL_POOR"],
    popupTemplate: popupOpenspaces
  });

  // Add the Objects to the Map Layer
  map.add(pointPopUpFeatureLayer);
  map.add(trails, 0);
  map.add(trailheads);
  map.add(parksLayer, 0);
  map.add(trailsLayer, 0);
  map.add(openSpaces, 0);
  // Chart feature disabled, removed because it sits on top of point symbols
  // map.add(chartFeatureLayer, 0);
  // Simple Pointers for trail heads, Removed because it sits on top of Image icons
  // map.add(trailheadsLayer);
});

