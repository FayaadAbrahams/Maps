require([
    "esri/Map",
    "esri/views/SceneView"
], (Map, SceneView) => {

    const map = new Map({
        basemap: "topo-3d",
        ground: "world-elevation"
    })

    const view = new SceneView({
        container: "viewDiv",
        map: map
    })
});