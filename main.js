"use strict";
                  
var map = new ol.Map({
    controls: ol.control.defaults().extend([new kleidacontrol()]),  
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM(),
        }) ],
    target: 'map',
    view: new ol.View({
        center: [42524392.03995305, 4784091.469096056],
        zoom: 6 
    }),
});