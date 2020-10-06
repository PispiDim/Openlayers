window.onload = init;

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

function init(){
  // Base Layers
  // Openstreet Map Standard
  const openstreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),    
    visible: true,
    title: 'OSMStandard'        
  })

  // Openstreet Map Humanitarian
  const openstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OSMHumanitarian'
  })

  // Bing Maps Basemap Layer
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "kF7MazMMAjb5WkIxfOxX~7JgrC8cJ2TvpTlaLd61XLw~At-P8dRv7RIRTOUP9lHprRifWNsu7_C3DUoOBX5mf2zHDDqWqYT2Pdqk8mKssoox",
      imagerySet: 'Road'  // Road, CanvasDark, CanvasGray
    }),
    visible: false,
    title: 'BingMaps'
  })

  // CartoDB BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
      attributions: '© CARTO'
    }),
    visible: false,
    title: 'CartoDarkAll'
  })

  // Stamen basemap layer
  const StamenTerrainWithLabels = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: 'terrain-labels',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrainWithLabels'
  })
  
  const StamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrain'
  })

  

  // Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandard, openstreetMapHumanitarian, bingMaps, cartoDBBaseLayer,
      StamenTerrainWithLabels, StamenTerrain
    ]
  })
  map.addLayer(baseLayerGroup);

  
  

  // Layer Switcher Logic for BaseLayers
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
  for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function(element, index, array){
        let baseLayerName = element.get('title');
        element.setVisible(baseLayerName === baseLayerElementValue); 
      })
    })
  }
}
map.addControl(new kleidacontrol());

var details = document.getElementById("details");

document.querySelector("button")
      .addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(SeePosition);
  } 
  else { 
    details.innerHTML = "Geolocation is not supported by this browser.";
}
}

function SeePosition(position) {

  var fl = flwgs84toed50(position.coords.latitude,  position.coords.longitude);
  var UTM = fl2EDMGRS(fl[0], fl[1]);
  var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];    
  if (kleidacontrol.prototype.kleida.length == 4) var krypto = UTM[1] + " " + kleidacontrol.prototype.ektelesiergasias(ArmyCoord);
  else krypto = "Εισάγετε ΚΛΕΙΔΑ";
  details.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude +
  "<br>Accuracy: " + position.coords.accuracy +
  "<br>ArmyCoord: " +  UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5] +
  "<br>Krypto: " + krypto;

  CenterMap(position.coords.longitude, position.coords.latitude);
  positionpoint (position);
}

function CenterMap(long, lat) {
  map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
  map.getView().setZoom(5);
}

function positionpoint (position) {
  const iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude])),
    name: 'MyPosition',
  });
  
  const point = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [iconFeature]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })
    })
  })

  map.addLayer(point);
}



