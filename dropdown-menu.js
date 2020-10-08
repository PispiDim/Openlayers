var dropdownmenu = (function (Control) {
    function dropdownmenu (opt_options) {
      var options = opt_options || {};

      var OSMStandard = document.createElement('input');
      OSMStandard.type = "radio";
      OSMStandard.name = "baseLayerRadioButton";
      OSMStandard.value = "OSMStandard";
      OSMStandard.checked = "true";
      OSMStandard.textContent = "OSM Standard<br>";

      var OSMHumanitarian = document.createElement('input');
      OSMStandard.type = "radio";
      OSMStandard.name = "baseLayerRadioButton";
      OSMStandard.value = "OSMHumanitarian";
      OSMStandard.checked = "false";
      OSMStandard.textContent = "OSM Humanitarian<br>";

      var BingMaps = document.createElement('input');
      OSMStandard.type = "radio";
      OSMStandard.name = "baseLayerRadioButton";
      OSMStandard.value = "BingMaps";
      OSMStandard.checked = "false";
      OSMStandard.textContent = "Bing Maps<br>";

      var CartoDarkAll = document.createElement('input');
      OSMStandard.type = "radio";
      OSMStandard.name = "baseLayerRadioButton";
      OSMStandard.value = "CartoDarkAll";
      OSMStandard.checked = "false";
      OSMStandard.textContent = "Carto Dark All<br>";

      var StamenTerrainWithLabels = document.createElement('input');
      OSMStandard.type = "radio";
      OSMStandard.name = "baseLayerRadioButton";
      OSMStandard.value = "StamenTerrainWithLabels";
      OSMStandard.checked = "false";
      OSMStandard.textContent = "Stamen Terrain With Labels<br>";

      var StamenTerrain = document.createElement('input');
      OSMStandard.type = "radio";
      OSMStandard.name = "baseLayerRadioButton";
      OSMStandard.value = "StamenTerrain";
      OSMStandard.checked = "false";
      OSMStandard.textContent = "Stamen Terrain<br>";

      var dropdowncontent = document.createElement('div');
      dropdowncontent.className = 'dropdowncontent';
      dropdowncontent.id = 'myDropdown';
      dropdowncontent.appendChild(OSMStandard);
      dropdowncontent.appendChild(OSMHumanitarian);
      dropdowncontent.appendChild(BingMaps);
      dropdowncontent.appendChild(CartoDarkAll);
      dropdowncontent.appendChild(StamenTerrainWithLabels);
      dropdowncontent.appendChild(StamenTerrain);

      var dropBotton = document.createElement('button');
      dropBotton.innerHTML = '<img src="images/a.jpg"\height="20px"\width="20px">';
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

    }

    if ( Control ) dropdownmenu.__proto__ = Control;
    dropdownmenu.prototype = Object.create( Control && Control.prototype);
    dropdownmenu.prototype.constructor = dropdownmenu;

    dropdownmenu.prototype.myFunction = function () {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    dropdownmenu.prototype.clickandhide = function (event) {
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

    return dropdownmenu;

}(ol.control.Control));