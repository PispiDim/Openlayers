var kleidacontrol = (function(Control) {
    function kleidacontrol(opt_options) {
        var options = opt_options || {};

        var buttonkleida = document.createElement('button');
        buttonkleida.innerHTML = '<img src="images/key.png"\height="20px"\width="20px">';
        buttonkleida.id = 'button-insert';
        buttonkleida.className = "button-insert";

        var elementinput = document.createElement('input');
        elementinput.type = "text";
        elementinput.placeholder = "πχ:1ΑΡΦ";
        elementinput.id = "keimeno";
        elementinput.className = "keimeno";
        elementinput.value = "";

        var buttonektelesi = document.createElement('button');
        buttonektelesi.innerHTML = '<img src="images/head.png"\height="20px"\width="20px">';
        buttonektelesi.id = "ektelesi";
        buttonektelesi.className = "ektelesi";

        var elementposition = document.createElement('div');
        elementposition.className = 'mouse-position';
        elementposition.id = 'mouse-position';

        var elementclick = document.createElement('div');
        elementclick.className = 'mouse-click';
        elementclick.id = 'mouse-click';

        var speechbubble = document.createElement('div');
        speechbubble.className = 'speechbubble';
        speechbubble.innerHTML = '<img src="images/speech-bubble.png"\height="50px"\width="50px">';

        var speechtext = document.createElement('div');
        speechtext.className = 'speechtext';
        speechtext.innerHTML = 'Λάθος<br> Κλείδα!!!';

        var speech = document.createElement('div');
        speech.className = 'speech';
        speech.id = 'speech';
        speech.appendChild(speechbubble);
        speech.appendChild(speechtext);

        var buttonLocation = document.createElement('button');
        buttonLocation.innerHTML = '<img src="images/map-position.png"\height="20px"\width="20px">';
        buttonLocation.id = "myLocation";
        buttonLocation.className = "myLocation";

        var myLocationText = document.createElement('div');
        myLocationText.className = 'myLocationText';
        myLocationText.id = 'myLocationText';
        myLocationText.innerHTML = '';

        var elementcontainer = document.createElement('div');
        elementcontainer.className = 'container';
        elementcontainer.appendChild(buttonkleida);
        elementcontainer.appendChild(elementinput);
        elementcontainer.appendChild(buttonektelesi);
        elementcontainer.appendChild(elementposition);
        elementcontainer.appendChild(elementclick);
        elementcontainer.appendChild(speech);
        elementcontainer.appendChild(buttonLocation);
        elementcontainer.appendChild(myLocationText);


        Control.call(this, {
            element: elementcontainer,
            target: options.target,
        });

        buttonkleida.addEventListener('click', this.emfanisi.bind(this), false);
        buttonektelesi.addEventListener('click', this.getkleida.bind(this), false);
        window.addEventListener('load', this.clickandmove.bind(this), false);
        elementinput.addEventListener('click', this.ekatharisi.bind(this), false);
        buttonLocation.addEventListener('click', this.getLocation.bind(this), false);
        elementinput.addEventListener('keyup', this.emfanisiBtnEisagogis.bind(this), false);

    }

    if (Control) kleidacontrol.__proto__ = Control;
    kleidacontrol.prototype = Object.create(Control && Control.prototype);
    kleidacontrol.prototype.constructor = kleidacontrol;

    kleidacontrol.prototype.kleida = "";
    kleidacontrol.prototype.thesi = "";

    kleidacontrol.prototype.koikloiKleidas = [
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['Α', 'Ε', 'Ι', 'Η', 'Γ', 'Ζ', 'Β', 'Θ', 'Δ', 'Κ'],
        ['Λ', 'Ρ', 'Ν', 'Π', 'Υ', 'Ο', 'Σ', 'Μ', 'Ξ', 'Τ'],
        ['Φ', '', 'U', 'Ψ', '', 'J', 'Χ', 'V', '', 'Ω']
    ];

    kleidacontrol.prototype.koiklosStatheres = [
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        [, 'A', 'D', 'G', 'K', 'N', 'O', 'R', 'U', 'X'],
        [, 'B', 'E', 'H', 'L', '', 'P', 'S', 'V', 'Y'],
        [, 'C', 'F', 'J', 'M', '', 'Q', 'T', 'W', 'Z']
    ];

    kleidacontrol.prototype.emfanisi = function() {
        if (document.querySelector("#keimeno").style.visibility == "visible" && kleidacontrol.prototype.kleida.length != 4) {
            document.querySelector("#keimeno").style.visibility = "hidden";
            document.querySelector("#ektelesi").style.visibility = "hidden";
            document.querySelector("#speech").style.visibility = "hidden";
        } else if (kleidacontrol.prototype.kleida.length != 4) {
            document.querySelector("#keimeno").style.visibility = "visible";
        } else {
            kleidacontrol.prototype.kleida = "";
            document.getElementById("keimeno").value = "";
            document.querySelector("#mouse-click").textContent = "";
            document.querySelector("#mouse-click").style.visibility = "visible";
            document.querySelector("#button-insert").innerHTML = '<img src="images/key.png"\height="20px"\width="20px">';
        }
    };

    kleidacontrol.prototype.emfanisiBtnEisagogis = function() {
        var localLength = document.getElementById("keimeno").value.length;
        if (localLength == 4) {
            document.querySelector("#ektelesi").style.visibility = "visible";
        } else {
            document.querySelector("#ektelesi").style.visibility = "hidden";
        }
    }

    kleidacontrol.prototype.getLocation = function() {
        if (document.querySelector(".myLocationText").innerHTML.length != 0) {
            document.querySelector(".myLocationText").innerHTML = "";
            document.querySelector(".myLocationText").style.visibility = "hidden";
            map.removeLayer(this.geolocationPoint);
            map.getView().setCenter([0, 0]);
            map.getView().setZoom(3);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(kleidacontrol.prototype.SeePosition);
            } else {
                document.querySelector("#myLocationText").textContent = "Geolocation is not supported by this browser.";
            }
        }
    }

    kleidacontrol.prototype.SeePosition = function(position) {
        var fl = flwgs84toed50(position.coords.latitude, position.coords.longitude);
        var UTM = fl2EDMGRS(fl[0], fl[1]);
        var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
        if (kleidacontrol.prototype.kleida.length == 4) var krypto = UTM[1] + " " + kleidacontrol.prototype.ektelesiergasias(ArmyCoord);
        else krypto = "Εισάγετε ΚΛΕΙΔΑ";
        document.querySelector(".myLocationText").style.visibility = "visible";
        document.querySelector(".myLocationText").innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude +
            "<br>Accuracy: " + position.coords.accuracy +
            "<br>ArmyCoord: " + UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5] +
            "<br>Krypto: " + krypto;

        kleidacontrol.prototype.CenterMap(position.coords.longitude, position.coords.latitude);
        kleidacontrol.prototype.positionpoint(position);
    }

    kleidacontrol.prototype.CenterMap = function(long, lat) {
        map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(5.5);
    }

    kleidacontrol.prototype.positionpoint = function(position) {
        const iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude])),
            name: 'MyPosition',
        });

        this.geolocationPoint = new ol.layer.Vector({
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
        
        map.addLayer(this.geolocationPoint);
    }

    kleidacontrol.prototype.ekatharisi = function() {
        document.getElementById("keimeno").value = "";
        document.querySelector("#speech").style.visibility = "hidden";
        document.querySelector("#ektelesi").style.visibility = "hidden";
    }

    kleidacontrol.prototype.errorSpeech = function() {
        document.querySelector("#speech").style.visibility = "visible";
    }

    kleidacontrol.prototype.getkleida = function() {
        const koikloi = kleidacontrol.prototype.koikloiKleidas;
        let localThesi = "";
        let check;
        let localKleida = document.getElementById("keimeno").value;
        for (var i = 0; i < 4; i++) {
            check = 0;
            for (var j = 0; j < 10; j++) {
                if (koikloi[i][j] == localKleida[i]) {
                    check = 1;
                    localThesi = localThesi + j;
                    break;
                }
            }
            if (check == 0) {
                kleidacontrol.prototype.errorSpeech();
                localKleida = "";
                break;
            }
        }
        if (check == 1) {
            document.querySelector("#keimeno").style.visibility = "hidden";
            document.querySelector("#ektelesi").style.visibility = "hidden";
            document.querySelector("#button-insert").textContent = "ΚΛΕΙΔΑ: " + localKleida;
            kleidacontrol.prototype.thesi = localThesi;
            kleidacontrol.prototype.kleida = localKleida;
        }
    }

    kleidacontrol.prototype.clickandmove = function() {
        this.getMap().on('pointermove', function(evt) {
            var coord = ol.proj.toLonLat(evt.coordinate);
            var fl = flwgs84toed50(coord[1], coord[0]);
            var UTM = fl2EDMGRS(fl[0], fl[1]);
            var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
            if (kleidacontrol.prototype.kleida.length == 4) {
                var krypto = kleidacontrol.prototype.ektelesiergasias(ArmyCoord);
                document.querySelector("#mouse-position").textContent = UTM[1] + " " + krypto;
            } else {
                document.querySelector("#mouse-position").textContent = UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5];
                document.querySelector("#mouse-click").textContent = "";
                document.querySelector("#mouse-click").style.visibility = "hidden";
            }
        });

        this.getMap().on('click', function(evt) {
            var coord = ol.proj.toLonLat(evt.coordinate);
            var fl = flwgs84toed50(coord[1], coord[0]);
            var UTM = fl2EDMGRS(fl[0], fl[1]);
            var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
            if (kleidacontrol.prototype.kleida.length == 4) {
                var krypto = kleidacontrol.prototype.ektelesiergasias(ArmyCoord);
                document.querySelector("#mouse-click").style.visibility = "visible";
                document.querySelector("#mouse-click").textContent = UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5] + " : " + UTM[1] + " " + krypto;
            }
        });
    };

    kleidacontrol.prototype.ektelesiergasias = function(syntetagmeni) {
        const koikloi = kleidacontrol.prototype.koikloiKleidas;
        const statheres = kleidacontrol.prototype.koiklosStatheres;
        let thesi = kleidacontrol.prototype.thesi;
        let kleida = kleidacontrol.prototype.kleida;
        var kryptografisi = "";
        let check, count;
        for (var k = 0; k < syntetagmeni.length; k++) {
            if (k < 2) {
                for (var i = 1; i < 4; i++) {
                    for (var j = 1; j < 10; j++) {
                        if (syntetagmeni[k] == statheres[i][j]) {
                            if (syntetagmeni[k] != 'N') {
                                if ((parseFloat(statheres[0][j]) + parseFloat(kleida[0])) > 9) {
                                    kryptografisi = kryptografisi + ((parseFloat(statheres[0][j]) + parseFloat(kleida[0])) - 10);
                                } else kryptografisi = kryptografisi + (parseFloat(statheres[0][j]) + parseFloat(kleida[0]));
                                kryptografisi = kryptografisi + i;
                            } else {
                                if ((parseFloat(statheres[0][j]) + parseFloat(kleida[0])) > 9) {
                                    kryptografisi = kryptografisi + ((parseFloat(statheres[0][j]) + parseFloat(kleida[0])) - 10);
                                } else kryptografisi = kryptografisi + (parseFloat(statheres[0][j]) + parseFloat(kleida[0]));
                            }
                        }
                    }
                }
            } else {
                if (k == 2) {
                    if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) < 0) {
                        if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10 > 9) {
                            kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                        } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10];
                    } else {
                        if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) > 9) {
                            kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) - 10];
                        } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                    }
                } else {
                    count = 0;
                    for (i = 2; i < k; i++) {
                        if (syntetagmeni[i] == syntetagmeni[k]) count++
                    }
                    if (count == 0) {
                        if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) < 0) {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10 > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                            } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10];
                        } else {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) - 10];
                            } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                        }
                    } else if (count == 1) {
                        if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) < 0) {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[2]) + 10 > 9) {
                                kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[2])];
                            } else kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[2]) + 10];
                        } else {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[2]) > 9) {
                                kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[2]) - 10];
                            } else kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[2])];
                        }
                    } else if (count == 2) {
                        check = 0;
                        if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) < 0) {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) + 10 > 9) {
                                if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) == 1 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) == 4 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3])];
                            } else {
                                if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) + 10 == 1 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) + 10 == 4 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) + 10 == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) + 10];
                            }
                        } else {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) > 9) {
                                if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) - 10 == 1 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) - 10 == 4 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) - 10 == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) - 10];
                            } else {
                                if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) == 1 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) == 4 ||
                                    parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3]) == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[3])];
                            }
                        }
                        if (check == 1) {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) < 0) {
                                if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10 > 9) {
                                    kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                                } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10];
                            } else {
                                if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) > 9) {
                                    kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) - 10];
                                } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                            }
                        }
                    } else if (count > 2) {
                        if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) < 0) {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10 > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                            } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) + 10];
                        } else {
                            if (parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1]) - 10];
                            } else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k]) - parseFloat(thesi[0]) + parseFloat(thesi[1])];
                        }
                    }
                }
            }
        }
        return kryptografisi;
    }
    return kleidacontrol;
}(ol.control.Control));