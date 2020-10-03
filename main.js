"use strict";

let kleida = null, i, j, k, thesi;

const koikloi  = [['0','1','2','3','4','5','6','7','8','9'],
                  ['Α','Ε','Ι','Η','Γ','Ζ','Β','Θ','Δ','Κ'],
                  ['Λ','Ρ','Ν','Π','Υ','Ο','Σ','Μ','Ξ','Τ'],
                  ['Φ','','U','Ψ','','J','Χ','V','','Ω']];
              
const statheres  = [['0','1','2','3','4','5','6','7','8','9'],
                    [,'A','D','G','K','N','O','R','U','X'],
                    [,'B','E','H','L','','P','S','V','Y'],
                    [,'C','F','G','M','','Q','T','W','Z']]; 


var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }) ],
  target: 'map',
  view: new ol.View({
    center: [22.274087106194855, 42.05697726038768],
    zoom: 6, 
    projection: 'EPSG:4326',
    coordinateFormat: ol.coordinate.createStringXY(5)
  }),
});

document.querySelector("#button-insert").addEventListener("click", emfanisi);

function emfanisi(){
    document.querySelector("#eisagogi").style.visibility = "visible";
};

document.querySelector("#ektelesi").addEventListener("click", getkleida);

function getkleida(){
    thesi = ""; 
    let check;
    kleida = document.getElementById("kleida").value;
    if (kleida.length != 4){
        alert("Προσοχή, Λάθος Κλείδα!!!");
        document.querySelector("#eisagogi").style.visibility = "hidden";
        document.querySelector("#button-insert").style.background =  "#e4ece9";
        kleida = null;
    }
    else{        
        for (i=0; i<4; i++){
            check = 0;
            for (j=0; j<10; j++){
                if (koikloi[i][j]==kleida[i]){
                    check = 1;
                    thesi = thesi + j;
                    break; 
               }
            }
            if (check == 0) {
                alert("Προσοχή, Λάθος Κλείδα!!!");
                kleida = null;
                document.querySelector("#eisagogi").style.visibility = "hidden";
                document.querySelector("#button-insert").style.background =  "#e4ece9";
                break;
            }
        }
        if (check == 1) {
            alert( `Επιτυχής εισαγωγή Κλείδας. Κλείδα: ${kleida}`);
            document.querySelector("#eisagogi").style.visibility = "hidden";
            document.querySelector("#button-insert").style.background =  "#11cf86";
        }    
    }   
}


map.on('pointermove', function(evt){
  var coord = evt.coordinate;
  var fl = flwgs84toed50(coord[0], coord[1]);
  var UTM = fl2EDMGRS(fl[0], fl[1]);
  var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
  if (kleida != null) {
    var krypto = ektelesiergasias(ArmyCoord);
    document.querySelector("#mouse-position").textContent = krypto;
  }
  else{
    document.querySelector("#mouse-position").textContent = ArmyCoord;
    document.querySelector("#mouse-click").textContent = "";
  }
});

map.on('click', function(evt){
    var coord = evt.coordinate;
    console.log(coord);
    var fl = flwgs84toed50(coord[0], coord[1]);
    var UTM = fl2EDMGRS(fl[0], fl[1]);
    var ArmyCoord = UTM[2] + UTM[3] + UTM[4] + UTM[5];
    console.log(ArmyCoord);
    
    if (kleida != null) {
      var krypto = ektelesiergasias(ArmyCoord);
      console.log(krypto);
      document.querySelector("#mouse-click").textContent = ArmyCoord + " : " + krypto;
    }
});

function ektelesiergasias(syntetagmeni){ 
  var kryptografisi = "";
  let check, count;
  for (k=0; k<syntetagmeni.length; k++){
      if (k<2){
          for (i=1; i<4; i++){
              for (j=1; j<10; j++){
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
};
