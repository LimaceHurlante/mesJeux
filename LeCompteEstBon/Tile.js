class Tile {

  constructor(v,x, y, size) {
    this.value = v;
    this.used = false;
    this.pos = createVector(x, y);
    this.size = size;
    this.inputBox = new InputBox(x, y, this.size, 3);
    this.activate = false;
    this.sansCadre = false;
    this.victoire = false;
    this.callback = null;
    this.callbackActif = false;
    this.rapportLargeurHauteur = 1.8;
  }
  display() {
    push();
    rectMode(CENTER)
    textSize(this.size / 3);
    textAlign(CENTER, CENTER)
    stroke(255);
    strokeWeight(this.size / 25);
    translate(this.pos.x, this.pos.y);
    if (this.sansCadre) {

      if (this.activate) {
        stroke(255, 0, 170);
        fill(255, 0, 170);

      } else {
        noStroke();
        fill(255);

      }
      textSize(this.size);
      text(this.value, 0, 0);
    } else {
      if (this.used) {
        fill(75);
        rect(0, 0, this.size, this.size / this.rapportLargeurHauteur, this.size / 40);
        noStroke();
        fill(0);
        text(this.value, 0, 0);
      } else if ((this.activate) ||(this.victoire)){
        stroke(255, 0, 170);
        fill(255, 0, 170);
        rect(0, 0, this.size, this.size / this.rapportLargeurHauteur, this.size / 40);
        fill(255);
        text(this.value, 0, 0);
      } else {
        fill(150);
        rect(0, 0, this.size, this.size / this.rapportLargeurHauteur, this.size / 40);
        noStroke();
        fill(255);
        text(this.value, 0, 0);
      }
    }
    pop();

  }
  touche() {
    if (this.used) {
      return false
    } else {
      if (((mouseX/zoom > this.pos.x - this.size / 2) && (mouseX/zoom < this.pos.x + this.size / 2)) &&
        ((mouseY/zoom > this.pos.y - this.size / 2) && (mouseY /zoom< this.pos.y + this.size / 2))) {
        return true;
      }else{return false;}
    }
  }
  input(Key, KeyCode) {
    this.value = this.inputBox.inputString(Key, KeyCode)
  }

}