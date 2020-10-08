var dropdownmenu = (function(Control) {
    function dropdownmenu(opt_options) {
        var options = opt_options || {};

        var OSMStandard = document.createElement('input');
        OSMStandard.type = "radio";
        OSMStandard.name = "baseLayerRadioButton";
        OSMStandard.className = "baseLayerRadioButton";
        OSMStandard.id = "OSMStandard";
        OSMStandard.value = "OSMStandard";
        OSMStandard.checked = "true";

        var OSMHumanitarian = document.createElement('input');
        OSMHumanitarian.type = "radio";
        OSMHumanitarian.name = "baseLayerRadioButton";
        OSMHumanitarian.className = "baseLayerRadioButton";
        OSMHumanitarian.value = "OSMHumanitarian";

        var BingMaps = document.createElement('input');
        BingMaps.type = "radio";
        BingMaps.name = "baseLayerRadioButton";
        BingMaps.className = "baseLayerRadioButton";
        BingMaps.value = "BingMaps";

        var CartoDarkAll = document.createElement('input');
        CartoDarkAll.type = "radio";
        CartoDarkAll.name = "baseLayerRadioButton";
        CartoDarkAll.className = "baseLayerRadioButton";
        CartoDarkAll.value = "CartoDarkAll";

        var StamenTerrainWithLabels = document.createElement('input');
        StamenTerrainWithLabels.type = "radio";
        StamenTerrainWithLabels.name = "baseLayerRadioButton";
        StamenTerrainWithLabels.className = "baseLayerRadioButton";
        StamenTerrainWithLabels.value = "StamenTerrainWithLabels";

        var StamenTerrain = document.createElement('input');
        StamenTerrain.type = "radio";
        StamenTerrain.name = "baseLayerRadioButton";
        StamenTerrain.className = "baseLayerRadioButton";
        StamenTerrain.value = "StamenTerrain";

        var OSMStandardLabels = document.createElement('div');
        OSMStandardLabels.className = "LayerLabels";
        OSMStandardLabels.id = "OSMStandardLabels";
        OSMStandardLabels.innerHTML = "OSM Standard";

        var OSMHumanitarianLabels = document.createElement('div');
        OSMHumanitarianLabels.className = "LayerLabels";
        OSMHumanitarianLabels.id = "OSMHumanitarianLabels";
        OSMHumanitarianLabels.innerHTML = "OSM Humanitarian";

        var BingMapsLabels = document.createElement('div');
        BingMapsLabels.className = "LayerLabels";
        BingMapsLabels.id = "BingMapsLabels";
        BingMapsLabels.innerHTML = "Bing Maps";

        var CartoDarkAllLabels = document.createElement('div');
        CartoDarkAllLabels.className = "LayerLabels";
        CartoDarkAllLabels.id = "CartoDarkAllLabels";
        CartoDarkAllLabels.innerHTML = "Carto Dark All";

        var StamenTerrainWithLabelsLabels = document.createElement('div');
        StamenTerrainWithLabelsLabels.className = "LayerLabels";
        StamenTerrainWithLabelsLabels.id = "StamenTerrainWithLabelsLabels";
        StamenTerrainWithLabelsLabels.innerHTML = "Stamen Terrain With Labels";

        var StamenTerrainLabels = document.createElement('div');
        StamenTerrainLabels.className = "LayerLabels";
        StamenTerrainLabels.id = "StamenTerrainLabels";
        StamenTerrainLabels.innerHTML = "Stamen Terrain";

        var dropdowncontent = document.createElement('div');
        dropdowncontent.className = 'dropdowncontent';
        dropdowncontent.id = 'myDropdown';
        dropdowncontent.appendChild(OSMStandard);
        dropdowncontent.appendChild(OSMHumanitarian);
        dropdowncontent.appendChild(BingMaps);
        dropdowncontent.appendChild(CartoDarkAll);
        dropdowncontent.appendChild(StamenTerrainWithLabels);
        dropdowncontent.appendChild(StamenTerrain);
        dropdowncontent.appendChild(OSMStandardLabels);
        dropdowncontent.appendChild(OSMHumanitarianLabels);
        dropdowncontent.appendChild(BingMapsLabels);
        dropdowncontent.appendChild(CartoDarkAllLabels);
        dropdowncontent.appendChild(StamenTerrainWithLabelsLabels);
        dropdowncontent.appendChild(StamenTerrainLabels);

        var dropBotton = document.createElement('button');
        dropBotton.innerHTML = '<img src="images/layers.png"\height="20px"\width="20px">';
        dropBotton.className = "dropbtn";


        var dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown';
        dropdownMenu.appendChild(dropdowncontent);
        dropdownMenu.appendChild(dropBotton);

        Control.call(this, {
            element: dropdownMenu,
            target: options.target,
        });

        dropBotton.addEventListener('click', this.myFunction.bind(this), false);
        window.addEventListener('click', this.clickandhide.bind(this), false);
        window.addEventListener('load', this.BaseLayersInit.bind(this), false);

    }

    if (Control) dropdownmenu.__proto__ = Control;
    dropdownmenu.prototype = Object.create(Control && Control.prototype);
    dropdownmenu.prototype.constructor = dropdownmenu;

    dropdownmenu.prototype.myFunction = function() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    dropdownmenu.prototype.clickandhide = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdowncontent");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    dropdownmenu.prototype.BaseLayersInit = function() {
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
                imagerySet: 'Road' // Road, CanvasDark, CanvasGray
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
        const baseLayerElements = document.querySelectorAll('.dropdowncontent > input[type=radio]')
        for (let baseLayerElement of baseLayerElements) {
            baseLayerElement.addEventListener('change', function() {
                let baseLayerElementValue = this.value;
                baseLayerGroup.getLayers().forEach(function(element, index, array) {
                    let baseLayerName = element.get('title');
                    element.setVisible(baseLayerName === baseLayerElementValue);
                })
            })
        }
    }

    return dropdownmenu;

}(ol.control.Control));