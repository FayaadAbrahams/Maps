require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer",
], function (esriConfig, Map, MapView, Basemap, VectorTileLayer, TileLayer) {

    esriConfig.apiKey = "AAPKcf0e552bb1ad4ee9bb07ee1824ff1577B7hcvmdLR-rRa9W7It-3RF4pO7ka9Ckxzzh4ZYOthZzivrGtOP_wwrYGSoh1F5XZ";

    const vectorTileLayer = new VectorTileLayer({
        portalItem: {
            id: "6976148c11bd497d8624206f9ee03e30"
        },
        opacity: 1
    });

    const imageTileLayer = new TileLayer({
        portalItem: {
            id: "1b243539f4514b6ba35e7d995890db1d"
        },
    });

    console.log(imageTileLayer);

    const basemap = new Basemap({
        baseLayers: [
            imageTileLayer,
            vectorTileLayer
        ]
    })

    const map = new Map({
        basemap: basemap,
    });

    // Try to load the map, catch if it fails and log the error
    try {
        const view = new MapView({
            container: "viewDiv",
            map: map,

            center: [-100, 30],
            zoom: 3
        });

    } catch (error) {
        console.log(error);
    }
});
