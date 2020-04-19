/* A faire 
-OK - Fonction les tile résultat
-OK - Timer
-OK - si on chosi un signe directement mettre le deriner tile créée avant 
-OK - effacer les calcul (tous ou un par un)
-OK - rejouer
-OK - victoire
-OK - bouton d'action
-OK - reglage video
-OK - reglage estetique
-OK - Forcer certaines mise en place meme si la fenetre est trop petite
-OK - Implémenter la compatibilité mobile (paysage/portrait ?)
-OK - Déplacer le curseur de video dans le canvas
-OK - Fond de couleur rouge en cas d'erreur
-OK - changement de signe en cas d'erreur
-ANNULé - aide
-BUG REPARé :-) - certains tiles ne se remette pas d'equerre apres suppretion
-BUG REPARé :-) - ne pas pouvoir cocher un nombre a la place d'un signe et inversement
-BUG REPARé :-) - n'autoriser que les nombre entier et positif
-BUG REPARé :-) - probleme de zoom et de position de souris
-BUG REPARé :-) - en cas de erreur negative/decimale probleme dans la continuité

Probleme de bouton trop petit sur mobile
Detection du mode paysage et nouveau design addapté
*/
//différent mode de jeu
let nombreEnLettre = false;
//
let zoom = 1;
let tiles = []
let nbTiles = 6;
let large;
let YTilesDeBase = 205;
let eccartEntreLesLignesDeTiles = 75;
let largeurTilesDeBase = 150;
let hauteurTilesDeBase = 50;
let hauteurDeLaPremiereLigne = YTilesDeBase + eccartEntreLesLignesDeTiles + (hauteurTilesDeBase * 2);
let sacDeTile = [7, 4, 50, 2, 8, 10, 2, 1, 3, 10, 6, 8, 75, 9, 7, 4, 6, 7, 5, 3, 25, 5, 100]
let tirage = [];
let objectifRange = [100, 1000]
//gameplay
let DblClick = -1;
let SimpleClick = -1;
let titre;
let phase = -1;
let continuite = [];
let victoire = false;
let erreurResultatDecimalOuNegatif = false;
// lignes de calculs
let phaseX = [100, 200, 250, 400];
let ligne = 0
let ligneDeCalcul = [];
let nbNewTiles = 0;
// bouton
let mesBoutons = []
// Timer
var time;
// video
let reducteurVideo;
let SetupDeLaVideo = false;
let displayLaVideo = false;
let videoSlider;

// Fonctions régaliènnes
function setup() {
  createCanvas(windowWidth, windowHeight);
  setupBoutons();
  setupGame();
  rejouerEnRandom();
  windowResized();
  frameRate(10);
}

function draw() {
  if (erreurResultatDecimalOuNegatif) {
    erreurResultatDecimalOuNegatif = reparerErreur()
    background(200, 0, 0);
  } else {
    background(50);
  }


  scale(zoom);
  fill(50);
  noStroke();
  displayVideo();
  displayTile();
  displayLigne();
  displayBouton();
  displayTimes();

}
// Fonctions liées à l'affichage
function displayVideo() {
  if (displayLaVideo) {
    if (SetupDeLaVideo) {
      reducteurVideo = map(videoSlider.value(), 0, 100, 6, 1);

      image(capture, width - (width / reducteurVideo), height - (width / reducteurVideo * capture.height / capture.width), width / reducteurVideo, width / reducteurVideo * capture.height / capture.width);
    } else {
      setupVideo()
    }
  }
}

function displayLigne() {
  fill(255);
  for (var i = 0; i < ligneDeCalcul.length; i++) {
    ligneDeCalcul[i].display();
  }

}

function displayTile() {

  for (var i = 0; i < nbTiles + 1; i++) {
    tiles[i].display();
  }

}

function displayTimes() {
  var minute = floor((120 - round((millis() - time) / 1000)) / 60);
  var seconde = (120 - round((millis() - time) / 1000)) % 60;
  if (seconde < 10) {
    times.value = "0" + minute + ":0" + seconde;
  } else {
    times.value = "0" + minute + ":" + seconde;
  }
  if (seconde < 0) {
    times.value = "00:00";
    times.activate = true;
  }
  times.display();
}

function displayBouton() {

  for (var i = 0; i < mesBoutons.length; i++) {
    mesBoutons[i].display();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (width > 1000) {
    this.MyW = windowWidth
    zoom = 1;
  } else {
    this.MyW = 1000;
    zoom = windowWidth / 1000
  }



  times.pos.x = (this.MyW - 190);
  if (this.MyW <= 1450) {

    tiles[6].pos.x = this.MyW / 2;
    for (var i = 0; i < 6; i++) {
      a = this.MyW / 7 * (i + 1)
      tiles[i].pos.x = a;
      if (i <= ligne) {
        if (ligneDeCalcul[i].tile != undefined)
          ligneDeCalcul[i].tile.pos.x = a;
      }
    }
    c = tiles[0].pos.x - tiles[0].largeur / 2;
    phaseX = [c, c + 100, c + 150, c + 300];
    b = this.MyW / 2 - tiles[6].largeur - 25;
    mesBoutons[2].pos.x = b - 200; //  <<<
    mesBoutons[3].pos.x = b - 100; //  +
    mesBoutons[4].pos.x = b - 100; //  -
    mesBoutons[5].pos.x = b; //  /
    mesBoutons[6].pos.x = b; //  X
  }
  if (videoSlider != undefined) {
    videoSlider.position(width - 160, height - 25);
  }

}
// Fonctions liées aux interactions Souris/Clavier
function keyPressed() {
  if ((keyPressed) && (DblClick > -1)) {
    tiles[DblClick].input(key, keyCode);
  }
  if (key === "v") {
    displayLaVideo = !displayLaVideo;
  }
  if (keyCode === ENTER) {
    phase++;
    if (phase > 2) {
      phase = 0;
      ligne++
      ligneDeCalcul.push(new LigneDeCalcul(ligne));
    }

    print("Phase : " + phase);
  }
  if (keyCode === BACKSPACE) {
    Backspace();
  }
  if (((key === "+") || (key === "-")) || (key === "/")) {
    ligneDeCalcul[ligne].addValue(key);
    continuite.push(key);
  }
  if (key === "*") {
    ligneDeCalcul[ligne].addValue("X");
  }
  if (key === "r") {
    randomPartie();
  }
  if (key === "n") {
    rejouerEnRandom();
  }
  if (key === "l") {
    nombreEnLettre = !nombreEnLettre;
    if (nombreEnLettre) {
      objectifRange = [20, 100];
      phaseX = [100, 400, 450, 700];
    } else {
      objectifRange = [100, 1000];
      phaseX = [100, 200, 250, 400];
    }
  }
}

function mouseClicked() {
  //annuler le dbl click
  DblClick = -1;
  for (var i = 0; i < nbTiles + 1; i++) {
    tiles[i].activate = false;
    tiles[i].inputBox.boxActive = true;
  }
  toucheBouton();
  if (phase > -1) {
    simpleClick = -1
    //vérifier si on a touché un tile de base pour l'ajouter au calcul
    for (var j = 0; j < nbTiles; j++) {
      if (tiles[j].touche()) {
        simpleClick = j;
        if (ligneDeCalcul[ligne].addValue(round(tiles[simpleClick].value)) != "ERROR") {
          tiles[simpleClick].used = true;
          continuite.push(simpleClick);
        }
      }
    }
    //vérifier si on a touché un nouveau tile pour l'ajouter au calcul
    if (simpleClick === -1) {
      for (var k = 0; k < nbNewTiles; k++) {
        if (ligneDeCalcul[k].tile != null) {
          if (ligneDeCalcul[k].tile.touche()) {
            simpleClick = k;
            if (ligneDeCalcul[ligne].addValue(round(ligneDeCalcul[simpleClick].tile.value)) != "ERROR") {
              ligneDeCalcul[simpleClick].tile.used = true;
              continuite.push(100 + k)
            }
          }
        }
      }
    }
  }
}

function doubleClicked() {
  DblClick = -1;
  for (var i = 0; i < nbTiles + 1; i++) {
    tiles[i].activate = false;
    if (tiles[i].touche()) {
      DblClick = i;
      tiles[i].inputBox.boxActive = true;
      tiles[i].activate = true;

    }
  }

}

function toucheBouton() {
  for (var i = 0; i < mesBoutons.length; i++) {
    if (mesBoutons[i].touche()) {
      if (mesBoutons[i].callback != null) {
        if (mesBoutons[i].touche()) {
          this[mesBoutons[i].callback]();
        }
      } else {
        ligneDeCalcul[ligne].addValue(mesBoutons[i].value);
        continuite.push(mesBoutons[i].value);
      }
    }
  }
}

function Backspace() {
  print(continuite);
  if (continuite.length === 0) {
    return;
  }
  switch (ligneDeCalcul[ligne].etat()) {
    case 0:
      ligneDeCalcul.splice(ligne, 1);
      ligne--
      ligneDeCalcul[ligne].tile = null
      ligneDeCalcul[ligne].resultat = null
      ligneDeCalcul[ligne].value[2] = null;
      if (continuite[continuite.length - 1] < 99) {
        tiles[continuite[continuite.length - 1]].used = false;
      } else {
        ligneDeCalcul[continuite[continuite.length - 1] - 100].tile.used = false;
      }
      nbNewTiles--;
      continuite.splice(continuite.length - 1, 1);
      break;
    case 1:
      ligneDeCalcul[ligne].value[0] = null;
      if (continuite[continuite.length - 1] < 99) {
        tiles[continuite[continuite.length - 1]].used = false;
      } else {
        ligneDeCalcul[continuite[continuite.length - 1] - 100].tile.used = false;
      }
      continuite.splice(continuite.length - 1, 1);
      break;
    case 2:
      ligneDeCalcul[ligne].value[1] = null;
      continuite.splice(continuite.length - 1, 1);
      break;

  }

}
// Fonctions
function randomPartie() {

  for (var i = 0; i < 6; i++) {
    tiles[i].value = tireAuSort();
  }
  tirage = [];
  tiles[6].value = floor(random(objectifRange[0], objectifRange[1]));

  function tireAuSort() {
    this.new = false
    while (this.new === false) {
      this.new = true
      x = floor(random(sacDeTile.length))
      for (var y = 0; y < tirage.length; y++) {
        if (x === tirage[y]) {
          this.new = false;
        }
      }
    }
    tirage.push(x);
    return sacDeTile[x];
  }
}

function rejouerEnRandom() {
  ligne = 0
  ligneDeCalcul = [];
  nbNewTiles = 0;
  phase = 0;
  continuite = [];
  tiles = []
  tirage = [];
  victoire = false;
  setupGame();
  randomPartie();
  windowResized();
}

function reparerErreur() {
  Backspace();
  return false

}

function RAZ() {
  ligne = 0
  ligneDeCalcul = [];
  nbNewTiles = 0;
  phase = 0;
  continuite = [];
  for (var i = 0; i < 6; i++) {
    tiles[i].used = false
  }
  ligneDeCalcul.push(new LigneDeCalcul(0));
}
// Fonction de Setup
function setupVideo() {
  videoSlider = createSlider(0, 100, 60);
  videoSlider.id = "videoSlider";
  print(videoSlider.value());
  windowResized()
  capture = createCapture(VIDEO)
  capture.hide();
  SetupDeLaVideo = true;
}

function setupGame() {
  for (var i = 0; i < nbTiles; i++) {
    tiles.push(new Tile(0, 200 + 225 * i, YTilesDeBase, largeurTilesDeBase, hauteurTilesDeBase));
    large = i * 225;
  }
  large += 400;
  tiles.push(new Tile(0, large / 2, 110, 200, 50));
  tiles[tiles.length - 1].sansCadre = true;
  ligneDeCalcul.push(new LigneDeCalcul(0));
  time = millis();
  times = new Tile("02:00", width - 190, 95, 250, 85);
}

function setupBoutons() {
  mesBoutons.push(new Tile("NEW", 60, 30, 50, 17));
  mesBoutons[0].callback = "rejouerEnRandom";
  mesBoutons.push(new Tile("RAZ", 60, 80, 50, 17));
  mesBoutons[1].callback = "RAZ";
  mesBoutons.push(new Tile("<<<", 300, 140, 70, 24));
  mesBoutons[2].callback = "Backspace";
  mesBoutons.push(new Tile("+", 400, 80, 70, 24));
  mesBoutons.push(new Tile("-", 400, 140, 70, 24));
  mesBoutons.push(new Tile("/", 500, 80, 70, 24));
  mesBoutons.push(new Tile("X", 500, 140, 70, 24));

}