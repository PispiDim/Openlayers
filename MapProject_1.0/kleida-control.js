
var kleidacontrol = (function (Control) {
    function kleidacontrol (opt_options) {
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
      
      var elementeisagogi = document.createElement('div');
      elementeisagogi.className = 'eisagogi';
      elementeisagogi.id = 'eisagogi';
      elementeisagogi.appendChild(elementinput);
      elementeisagogi.appendChild(buttonektelesi);
  
      var elementposition = document.createElement('div');
      elementposition.className = 'mouse-position';
      elementposition.id = 'mouse-position';

      var elementclick = document.createElement('div');
      elementclick.className = 'mouse-click';
      elementclick.id = 'mouse-click';

      var elementcontainer = document.createElement('div');
      elementcontainer.className = 'container';
      elementcontainer.appendChild(buttonkleida);
      elementcontainer.appendChild(elementeisagogi);
      elementcontainer.appendChild(elementposition);
      elementcontainer.appendChild(elementclick);
        
      Control.call(this, {
        element: elementcontainer,
        target: options.target,
      });

      buttonkleida.addEventListener('click', this.emfanisi.bind(this), false);
      buttonektelesi.addEventListener('click', this.getkleida.bind(this), false);
      window.addEventListener('load', this.clickandmove.bind(this), false);
      elementinput.addEventListener('click', this.ekatharisi.bind(this), false);

    }
  
    if ( Control ) kleidacontrol.__proto__ = Control;
    kleidacontrol.prototype = Object.create( Control && Control.prototype);
    kleidacontrol.prototype.constructor = kleidacontrol; 

    kleidacontrol.prototype.kleida = "";
    kleidacontrol.prototype.thesi = "";
    
    kleidacontrol.prototype.koikloiKleidas  = [['0','1','2','3','4','5','6','7','8','9'],
                                                ['Α','Ε','Ι','Η','Γ','Ζ','Β','Θ','Δ','Κ'],
                                                ['Λ','Ρ','Ν','Π','Υ','Ο','Σ','Μ','Ξ','Τ'],
                                                ['Φ','','U','Ψ','','J','Χ','V','','Ω']];

    kleidacontrol.prototype.koiklosStatheres = [['0','1','2','3','4','5','6','7','8','9'],
                                                [,'A','D','G','K','N','O','R','U','X'],
                                                [,'B','E','H','L','','P','S','V','Y'],
                                                [,'C','F','J','M','','Q','T','W','Z']];

    kleidacontrol.prototype.emfanisi = function emfanisi(){
        if (document.querySelector("#eisagogi").style.visibility == "visible" && kleidacontrol.prototype.kleida.length != 4){
            document.querySelector("#eisagogi").style.visibility = "hidden";
        }
        else if (kleidacontrol.prototype.kleida.length != 4){
            document.querySelector("#eisagogi").style.visibility = "visible";
        }
        else {
            kleidacontrol.prototype.kleida = "";
            document.getElementById("keimeno").value = "";
            document.querySelector("#mouse-click").textContent = "";
            document.querySelector("#button-insert").innerHTML = '<img src="images/key.png"\height="20px"\width="20px">';
        }    
    };

    kleidacontrol.prototype.ekatharisi = function(){
        document.getElementById("keimeno").value = "";
    }

    kleidacontrol.prototype.getkleida = function(){
        const koikloi  = kleidacontrol.prototype.koikloiKleidas;
        let localThesi = ""; 
        let check;
        let localKleida = document.getElementById("keimeno").value;
        if (localKleida.length != 4){
            document.getElementById("keimeno").value = "Λάθος!!!";
            localKleida = "";
        }
        else{        
            for (var i=0; i<4; i++){
                check = 0;
                for (var j=0; j<10; j++){
                    if (koikloi[i][j]==localKleida[i]){
                        check = 1;
                        localThesi = localThesi + j;
                        break; 
                   }
                }
                if (check == 0) {
                    document.getElementById("keimeno").value = "Λάθος!!!";
                    localKleida = "";
                    break;
                }
            }
            if (check == 1) {
                document.querySelector("#eisagogi").style.visibility = "hidden";
                document.querySelector("#button-insert").textContent = "ΚΛΕΙΔΑ: " + localKleida;
                kleidacontrol.prototype.thesi = localThesi;
                kleidacontrol.prototype.kleida = localKleida;
            }    
        }   
    }

    kleidacontrol.prototype.clickandmove = function() {
      this.getMap().on('pointermove', function(evt){
        var coord = ol.proj.toLonLat(evt.coordinate);
        var fl = flwgs84toed50(coord[1], coord[0]);
        var UTM = fl2EDMGRS(fl[0], fl[1]);
        var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
        if (kleidacontrol.prototype.kleida.length == 4) {
            var krypto = kleidacontrol.prototype.ektelesiergasias(ArmyCoord);
            document.querySelector("#mouse-position").textContent = UTM[1] + " " + krypto;
        }
        else{
            document.querySelector("#mouse-position").textContent = UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5];
            document.querySelector("#mouse-click").textContent = "";
        }
      });

      this.getMap().on('click', function(evt){
        var coord = ol.proj.toLonLat(evt.coordinate);
        var fl = flwgs84toed50(coord[1], coord[0]);
        var UTM = fl2EDMGRS(fl[0], fl[1]);
        var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];    
        if (kleidacontrol.prototype.kleida.length == 4) {
            var krypto = kleidacontrol.prototype.ektelesiergasias(ArmyCoord);
            document.querySelector("#mouse-click").textContent = UTM[1] + " " + UTM[2] + UTM[3] + " " + UTM[4] + " " + UTM[5] + " : " + UTM[1] + " " + krypto;
        }
      });
    };

    kleidacontrol.prototype.ektelesiergasias = function(syntetagmeni) {
        const koikloi  = kleidacontrol.prototype.koikloiKleidas;      
        const statheres  = kleidacontrol.prototype.koiklosStatheres;
        let thesi = kleidacontrol.prototype.thesi;
        let kleida = kleidacontrol.prototype.kleida;
        var kryptografisi = "";
        let check, count;
        for (var k=0; k<syntetagmeni.length; k++){
            if (k<2){
                for (var i=1; i<4; i++){
                    for (var j=1; j<10; j++){
                        if (syntetagmeni[k]==statheres[i][j]){
                            if (syntetagmeni[k] != 'N'){ 
                                if ((parseFloat(statheres[0][j])+parseFloat(kleida[0]))>9){
                                    kryptografisi = kryptografisi + ((parseFloat(statheres[0][j])+parseFloat(kleida[0])) - 10); 
                                  }                               
                                else kryptografisi = kryptografisi + (parseFloat(statheres[0][j])+parseFloat(kleida[0]));                               
                                kryptografisi = kryptografisi + i;
                            }
                            else {
                                if ((parseFloat(statheres[0][j])+parseFloat(kleida[0]))>9){
                                    kryptografisi = kryptografisi + ((parseFloat(statheres[0][j])+parseFloat(kleida[0])) - 10); 
                                  }                               
                                else kryptografisi = kryptografisi + (parseFloat(statheres[0][j])+parseFloat(kleida[0]));                               
                            }
                        }
                    }
                }
            }
            else {
                if (k==2) {
                    if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])<0) {
                        if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10 > 9) {
                            kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                        }
                        else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10];
                    }
                    else {
                        if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1]) > 9) {
                            kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])-10];
                        }
                        else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                    }
                }
                else {
                    count = 0;
                    for (i=2; i<k; i++){
                        if (syntetagmeni[i]==syntetagmeni[k]) count++ 
                    }
                    if (count == 0) {
                        if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])<0) {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10 > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                            }
                            else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10];
                        }
                        else {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1]) > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])-10];
                            }
                            else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                        }
                    }
                    else if (count == 1) {
                        if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])<0) {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[2])+10 > 9) {
                                kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[2])];
                            }
                            else kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[2])+10];
                        }
                        else {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[2]) > 9) {
                                kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[2])-10];
                            }
                            else kryptografisi = kryptografisi + koikloi[2][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[2])];
                        }
                    }
                    else if (count == 2) {
                        check = 0;
                        if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])<0) {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])+10 > 9) {
                                if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) == 1 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) == 4 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])];  
                            }
                            else {
                                if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])+10 == 1 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])+10 == 4 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])+10 == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])+10];
                            }
                        }    
                        else {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) > 9) {
                                if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])-10 == 1 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])-10 == 4 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])-10 == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])-10];
                            }
                            else {
                                if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) == 1 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) == 4 
                                || parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3]) == 8) check = 1;
                                else kryptografisi = kryptografisi + koikloi[3][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[3])];
                            }
                        }
                        if (check == 1) {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])<0) {
                                if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10 > 9) {
                                    kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                                }
                                else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10];
                            }
                            else {
                                if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1]) > 9) {
                                    kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])-10];
                                }
                                else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                            }
                        }
                    }
                    else if (count > 2) {
                        if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])<0) {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10 > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                            }
                            else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])+10];
                        }
                        else {
                            if (parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1]) > 9) {
                                kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])-10];
                            }
                            else kryptografisi = kryptografisi + koikloi[1][parseFloat(syntetagmeni[k])-parseFloat(thesi[0])+parseFloat(thesi[1])];
                        }
                    }
                }  
            }
        }
        return kryptografisi;
    }
     return kleidacontrol;
  }(ol.control.Control));