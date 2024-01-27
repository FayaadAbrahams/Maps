require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/widgets/Locate",
  "esri/widgets/Track",
  "esri/widgets/Search",
  "esri/Graphic"
], function (esriConfig, Map, MapView, Locate, Track, Search, Graphic) {

  esriConfig.apiKey = "AAPKcf0e552bb1ad4ee9bb07ee1824ff1577B7hcvmdLR-rRa9W7It-3RF4pO7ka9Ckxzzh4ZYOthZzivrGtOP_wwrYGSoh1F5XZ";

  const map = new Map({
    basemap: "arcgis/topographic" // basemap styles service
  });

  const view = new MapView({
    map: map,
    center: [18, -33], // Longitude, latitude
    zoom: 2, // Zoom level, Zoomed out
    container: "viewDiv" // Div element
  });

  // Locate Widget button: to locate current device's location
  const locate = new Locate({
    view: view,
    //useHeadingEnabled: false is Deprecated
    rotationEnabled: false,
    goToOverride: function (view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    }
  });

  // Tracking Widget: keep track of device's current location
  const track = new Track({
    view: view,
    graphic: new Graphic({
      symbol: {
        type: {
          type: "simple-marker",
          size: "12px",
          color: "red",
          outline: {
            color: "#ffffff",
            width: "1.5px"
          }
        }
      }
    }),
    //useHeadingEnabled: false is Deprecated
    rotationEnabled: false
  })

  // Searching Widget: Allows you to interactively search for addresses and places
  const search = new Search({
    view: view
  });

  view.ui.add(search, "top-right");
  view.ui.add(locate, "top-right");
  view.ui.add(track, "top-right");
});