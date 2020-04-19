class Tile {

  constructor(v, x, y, largeur, hauteur) {
    this.value = v;
    this.used = false;
    this.pos = createVector(x, y);
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.inputBox = new InputBox(x, y, this.largeur, 3);
    this.activate = false;
    this.sansCadre = false;
    this.victoire = false;
    this.callback = null;
    this.callbackActif = false;
    this.rapportLargeurHauteur = 1.8;
    this.aAfficher;
    this.hauteurTexte;
  }
  display() {
    push();
    rectMode(CENTER)
    textSize(this.hauteur * 0.8);
    textAlign(CENTER, CENTER)
    stroke(255);
    strokeWeight(this.largeur / 25);
    translate(this.pos.x, this.pos.y);
    if (nombreEnLettre && Number.isInteger(this.value)) {
      this.aAfficher = convert0tozero(this.value);
      this.hauteurTexte = this.hauteur / 35;
      if (this.aAfficher.length > 5) {

        textSize((this.hauteur * 1.2 * 5) / this.aAfficher.length);
      }
    } else {
      this.aAfficher = this.value;
      this.hauteurTexte = this.hauteur / 10;
    }
    if (this.sansCadre) {
      if (this.activate) {
        stroke(255, 0, 170);
        fill(255, 0, 170);
      } else {
        noStroke();
        fill(255);
      }
      textSize(this.hauteur * 1.2);
      text(this.aAfficher, 0, this.hauteurTexte);
    } else {
      if (this.used) {
        fill(75);
        rect(0, 0, this.largeur, this.hauteur, this.hauteur / 20);
        noStroke();
        fill(0);
        text(this.aAfficher, 0, this.hauteurTexte);
      } else if ((this.activate) || (this.victoire)) {
        stroke(255, 0, 170);
        fill(255, 0, 170);
        rect(0, 0, this.largeur, this.hauteur, this.hauteur / 20);
        fill(255);
        text(this.aAfficher, 0, this.hauteurTexte);
      } else {
        fill(150);
        rect(0, 0, this.largeur, this.hauteur, this.hauteur / 20);
        noStroke();
        fill(255);
        text(this.aAfficher, 0, this.hauteurTexte);
      }
    }
    pop();

  }
  touche() {
    if (this.used) {
      return false
    } else {
      if (((mouseX / zoom > this.pos.x - this.largeur / 2) && (mouseX / zoom < this.pos.x + this.largeur / 2)) &&
        ((mouseY / zoom > this.pos.y - this.hauteur / 2) && (mouseY / zoom < this.pos.y + this.hauteur / 2))) {
        return true;
      } else {
        return false;
      }
    }
  }
  input(Key, KeyCode) {
    this.value = this.inputBox.inputString(Key, KeyCode)
  }

}