var kleidaControl = (function(Control) {
    function kleidaControl(opt_options) {
        var options = opt_options || {};

        var buttonKleida = document.createElement('button');
        buttonKleida.innerHTML = '<img src="images/key.png"\height="20px"\width="20px">';
        buttonKleida.id = 'buttonKleida';
        buttonKleida.className = "buttonKleida";

        var keimenoKleidasInput = document.createElement('input');
        keimenoKleidasInput.type = "text";
        keimenoKleidasInput.placeholder = "πχ:1ΑΡΦ";
        keimenoKleidasInput.id = "keimenoKleidasInput";
        keimenoKleidasInput.className = "keimenoKleidasInput";
        keimenoKleidasInput.value = "";

        var buttonEktelesiKrypto = document.createElement('button');
        buttonEktelesiKrypto.innerHTML = '<img src="images/head.png"\height="20px"\width="20px">';
        buttonEktelesiKrypto.id = "buttonEktelesiKrypto";
        buttonEktelesiKrypto.className = "buttonEktelesiKrypto";

        var mousePositionText = document.createElement('div');
        mousePositionText.className = 'mousePositionText';
        mousePositionText.id = 'mousePositionText';

        var mouseClickText = document.createElement('div');
        mouseClickText.className = 'mouseClickText';
        mouseClickText.id = 'mouseClickText';

        var errorSpeechBubble = document.createElement('div');
        errorSpeechBubble.className = 'errorSpeechBubble';
        errorSpeechBubble.innerHTML = '<img src="images/speech-bubble.png"\height="50px"\width="50px">';

        var errorSpeechText = document.createElement('div');
        errorSpeechText.className = 'errorSpeechText';
        errorSpeechText.innerHTML = 'Λάθος<br> Κλείδα!!!';

        var errorSpeechNotification = document.createElement('div');
        errorSpeechNotification.className = 'errorSpeechNotification';
        errorSpeechNotification.id = 'errorSpeechNotification';
        errorSpeechNotification.appendChild(errorSpeechBubble);
        errorSpeechNotification.appendChild(errorSpeechText);

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
        elementcontainer.appendChild(buttonKleida);
        elementcontainer.appendChild(keimenoKleidasInput);
        elementcontainer.appendChild(buttonEktelesiKrypto);
        elementcontainer.appendChild(mousePositionText);
        elementcontainer.appendChild(mouseClickText);
        elementcontainer.appendChild(errorSpeechNotification);
        elementcontainer.appendChild(buttonLocation);
        elementcontainer.appendChild(myLocationText);


        Control.call(this, {
            element: elementcontainer,
            target: options.target,
        });

        buttonKleida.addEventListener('click', this.emfanisi.bind(this), false);
        buttonEktelesiKrypto.addEventListener('click', this.getKleida.bind(this), false);
        window.addEventListener('load', this.mouseClickAndMouseMove.bind(this), false);
        keimenoKleidasInput.addEventListener('click', this.ekatharisi.bind(this), false);
        buttonLocation.addEventListener('click', this.getLocation.bind(this), false);
        keimenoKleidasInput.addEventListener('keyup', this.emfanisiBtnEisagogis.bind(this), false);

    }

    if (Control) kleidaControl.__proto__ = Control;
    kleidaControl.prototype = Object.create(Control && Control.prototype);
    kleidaControl.prototype.constructor = kleidaControl;

    kleidaControl.prototype.kleida = "";
    kleidaControl.prototype.thesi = "";

    kleidaControl.prototype.koikloiKleidas = [
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['Α', 'Ε', 'Ι', 'Η', 'Γ', 'Ζ', 'Β', 'Θ', 'Δ', 'Κ'],
        ['Λ', 'Ρ', 'Ν', 'Π', 'Υ', 'Ο', 'Σ', 'Μ', 'Ξ', 'Τ'],
        ['Φ', '', 'U', 'Ψ', '', 'J', 'Χ', 'V', '', 'Ω']
    ];

    kleidaControl.prototype.koiklosStatheres = [
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        [, 'A', 'D', 'G', 'K', 'N', 'O', 'R', 'U', 'X'],
        [, 'B', 'E', 'H', 'L', '', 'P', 'S', 'V', 'Y'],
        [, 'C', 'F', 'J', 'M', '', 'Q', 'T', 'W', 'Z']
    ];

    kleidaControl.prototype.emfanisi = function() {
        if (document.querySelector("#keimenoKleidasInput").style.visibility == "visible" && kleidaControl.prototype.kleida.length != 4) {
            document.querySelector("#keimenoKleidasInput").style.visibility = "hidden";
            document.querySelector("#buttonEktelesiKrypto").style.visibility = "hidden";
            document.querySelector("#errorSpeechNotification").style.visibility = "hidden";
        } else if (kleidaControl.prototype.kleida.length != 4) {
            document.querySelector("#keimenoKleidasInput").style.visibility = "visible";
        } else {
            kleidaControl.prototype.kleida = "";
            document.getElementById("keimenoKleidasInput").value = "";
            document.querySelector("#mouseClickText").textContent = "";
            document.querySelector("#mouseClickText").style.visibility = "visible";
            document.querySelector("#buttonKleida").innerHTML = '<img src="images/key.png"\height="20px"\width="20px">';
        }
    };

    kleidaControl.prototype.emfanisiBtnEisagogis = function() {
        var localLength = document.getElementById("keimenoKleidasInput").value.length;
        if (localLength == 4) {
            document.querySelector("#buttonEktelesiKrypto").style.visibility = "visible";
        } else {
            document.querySelector("#buttonEktelesiKrypto").style.visibility = "hidden";
        }
    }

    kleidaControl.prototype.getLocation = function() {
        if (document.querySelector(".myLocationText").innerHTML.length != 0) {
            document.querySelector(".myLocationText").innerHTML = "";
            document.querySelector(".myLocationText").style.visibility = "hidden";
            map.removeLayer(this.geolocationPoint);
            // map.getView().setCenter([0, 0]);
            // map.getView().setZoom(3);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(kleidaControl.prototype.SeePosition);
            } else {
                document.querySelector("#myLocationText").textContent = "Geolocation is not supported by this browser.";
            }
        }
    }

    kleidaControl.prototype.SeePosition = function(position) {
        var fl = flwgs84toed50(position.coords.latitude, position.coords.longitude);
        var UTM = fl2EDMGRS(fl[0], fl[1]);
        var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
        if (kleidaControl.prototype.kleida.length == 4) var krypto = UTM[1] + " " + kleidaControl.prototype.ektelesiKryptografisis(ArmyCoord);
        else krypto = "Εισάγετε ΚΛΕΙΔΑ";
        document.querySelector(".myLocationText").style.visibility = "visible";
        document.querySelector(".myLocationText").innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude +
            "<br>Accuracy: " + position.coords.accuracy +
            "<br>ArmyCoord: " + UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5] +
            "<br>Krypto: " + krypto;

            kleidaControl.prototype.CenterMap(position.coords.longitude, position.coords.latitude);
            kleidaControl.prototype.positionpoint(position);
    }

    kleidaControl.prototype.CenterMap = function(long, lat) {
        map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(5.5);
    }

    kleidaControl.prototype.positionpoint = function(position) {
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

    kleidaControl.prototype.ekatharisi = function() {
        document.getElementById("keimenoKleidasInput").value = "";
        document.querySelector("#errorSpeechNotification").style.visibility = "hidden";
        document.querySelector("#buttonEktelesiKrypto").style.visibility = "hidden";
    }

    kleidaControl.prototype.errorSpeech = function() {
        document.querySelector("#errorSpeechNotification").style.visibility = "visible";
    }

    kleidaControl.prototype.getKleida = function() {
        const koikloi = kleidaControl.prototype.koikloiKleidas;
        let localThesi = "";
        let check;
        let localKleida = document.getElementById("keimenoKleidasInput").value;
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
                kleidaControl.prototype.errorSpeech();
                localKleida = "";
                break;
            }
        }
        if (check == 1) {
            document.querySelector("#keimenoKleidasInput").style.visibility = "hidden";
            document.querySelector("#buttonEktelesiKrypto").style.visibility = "hidden";
            document.querySelector("#buttonKleida").textContent = "ΚΛΕΙΔΑ: " + localKleida;
            kleidaControl.prototype.thesi = localThesi;
            kleidaControl.prototype.kleida = localKleida;
        }
    }

    kleidaControl.prototype.mouseClickAndMouseMove = function() {
        this.getMap().on('pointermove', function(evt) {
            var coord = ol.proj.toLonLat(evt.coordinate);
            var fl = flwgs84toed50(coord[1], coord[0]);
            var UTM = fl2EDMGRS(fl[0], fl[1]);
            var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
            if (kleidaControl.prototype.kleida.length == 4) {
                var krypto = kleidaControl.prototype.ektelesiKryptografisis(ArmyCoord);
                document.querySelector("#mousePositionText").textContent = UTM[1] + " " + krypto;
            } else {
                document.querySelector("#mousePositionText").textContent = UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5];
                document.querySelector("#mouseClickText").textContent = "";
                document.querySelector("#mouseClickText").style.visibility = "hidden";
            }
        });

        this.getMap().on('click', function(evt) {
            var coord = ol.proj.toLonLat(evt.coordinate);
            var fl = flwgs84toed50(coord[1], coord[0]);
            var UTM = fl2EDMGRS(fl[0], fl[1]);
            var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
            if (kleidaControl.prototype.kleida.length == 4) {
                var krypto = kleidaControl.prototype.ektelesiKryptografisis(ArmyCoord);
                document.querySelector("#mouseClickText").style.visibility = "visible";
                document.querySelector("#mouseClickText").textContent = UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5] + " : " + UTM[1] + " " + krypto;
            }
        });
    };

    kleidaControl.prototype.ektelesiKryptografisis = function(syntetagmeni) {
        const koikloi = kleidaControl.prototype.koikloiKleidas;
        const statheres = kleidaControl.prototype.koiklosStatheres;
        let thesi = kleidaControl.prototype.thesi;
        let kleida = kleidaControl.prototype.kleida;
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
    return kleidaControl;
}(ol.control.Control));