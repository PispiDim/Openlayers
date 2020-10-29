// window.onload = init;

// Attribution Control
const attributionControl = new ol.control.Attribution({
  collapsible: true
})

const map = new ol.Map({
  view: new ol.View({
    center: [0, 0],
    zoom: 3,     
  }),    
  target: 'js-map',
  controls: ol.control.defaults({attribution: false}).extend([attributionControl]) 
})

map.addControl(new kleidaControl());
map.addControl(new dropdownLayersMenu());
