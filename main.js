"use strict";
                  
var map = new ol.Map({
    controls: ol.control.defaults().extend([new kleidacontrol()]),  
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM(),
        }) ],
    target: 'map',
    view: new ol.View({
        center: [22.274087106194855, 42.05697726038768],
        zoom: 6, 
        projection: 'EPSG:4326',
    }),
});