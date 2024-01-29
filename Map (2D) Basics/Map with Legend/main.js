require([
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/WebMap"
], (MapView, Legend, WebMap) => {
  const webmap = new WebMap({
    portalItem: {
      // autocasts as new PortalItem()
      id: "05e015c5f0314db9a487a9b46cb37eca"
    }
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap
  });

  view.when(() => {
    // get the first layer in the collection of operational layers in the WebMap
    // when the resources in the MapView have loaded.
    const featureLayer = webmap.layers.getItemAt(0);

    const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: featureLayer,
          title: "NY Educational Attainment"
        }
      ]
    });

    view.ui.add(legend, "bottom-right");
  });
});