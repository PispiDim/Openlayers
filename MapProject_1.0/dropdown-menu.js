var dropdownmenu = (function(Control) {
    function dropdownmenu(opt_options) {
        var options = opt_options || {};

        var dropdowncontent = document.createElement('div');
        dropdowncontent.className = 'dropdowncontent';
        dropdowncontent.id = 'myDropdown';
        dropdowncontent.innerHTML = "<input id ='ddddd' type='radio' name='baseLayerRadioButton' value='OSMStandard' checked>OSM Standard<br> <input type='radio' name='baseLayerRadioButton' value='OSMHumanitarian'>OSM Humanitarian<br><input type='radio' name='baseLayerRadioButton' value='BingMaps'>Bing Maps<br> <input type='radio' name='baseLayerRadioButton' value='CartoDarkAll'>Carto Dark All<br> <input type='radio' name='baseLayerRadioButton' value='StamenTerrainWithLabels'>Stamen Terrain With Labels<br> <input type='radio' name='baseLayerRadioButton' value='StamenTerrain'>Stamen Terrain<br>";

        var dropBotton = document.createElement('button');
        dropBotton.innerHTML = 'L';
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