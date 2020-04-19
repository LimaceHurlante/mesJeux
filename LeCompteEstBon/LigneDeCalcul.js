class LigneDeCalcul {

  constructor(ligne) {
    this.ligne = ligne;
    this.value = [null, null, null]
    this.resultat = null;
    this.tile = null;
  }

  display() {

    for (var i = 0; i < 3; i++) {
      if (this.value[i] != null) {
        var aAfficher = this.value[i]
        if (nombreEnLettre && Number.isInteger(aAfficher)) {
          aAfficher = convert0tozero(aAfficher);
        }

        textSize(35);
        text(aAfficher, phaseX[i], hauteurDeLaPremiereLigne + (this.ligne * 40));
      }
    }
    if (this.resultat != null) {
      aAfficher = this.resultat
      if (nombreEnLettre && Number.isInteger(aAfficher)) {
        aAfficher = convert0tozero(aAfficher);
      }
      text("= " + aAfficher, phaseX[3], hauteurDeLaPremiereLigne + (this.ligne * 40));
      this.tile.display();
    }
  }
  addValue(v) {
    if (this.value[0] === null) {
      if (Number.isInteger(v)) { //
        this.value[0] = v;
      } else {
        if (nbNewTiles > 0) {
          this.value[0] = ligneDeCalcul[nbNewTiles - 1].tile.value;
          ligneDeCalcul[nbNewTiles - 1].tile.used = true;
          continuite.push(100 + nbNewTiles - 1)

          this.value[1] = v;
        }
      }
    } else if (this.value[1] === null) {
      if (Number.isInteger(v) === false) {
        this.value[1] = v;
      } else {
        return "ERROR"
      }
    } else if (this.value[2] === null) {
      if (Number.isInteger(v)) {
        this.value[2] = v;
        phase = 0;
        ligne++
        ligneDeCalcul.push(new LigneDeCalcul(ligne));
        this.calculResultat();

        this.TileResultat();
        if ((Number.isInteger(this.resultat) == false) || (this.resultat < 0)) {
          erreurResultatDecimalOuNegatif = true;
        }
      } else {
        this.value[1] = v;
        print(continuite);
        continuite.splice(continuite.length - 1, 1);
        print(continuite);
      }
    }
  }
  calculResultat() {
    switch (this.value[1]) {
      case 'X':
        this.resultat = this.value[0] * this.value[2]

        break;
      case '-':
        this.resultat = this.value[0] - this.value[2]
        break;
      case '+':
        this.resultat = this.value[0] + this.value[2]
        break;
      case '/':
        this.resultat = this.value[0] / this.value[2]
        break;
    }

  }

  TileResultat() {

    this.tile = new Tile(this.resultat, tiles[nbNewTiles].pos.x, YTilesDeBase + eccartEntreLesLignesDeTiles, largeurTilesDeBase, hauteurTilesDeBase);
    nbNewTiles++;

    if (this.resultat === tiles[6].value) {
      this.tile.victoire = true;
    }
  }

  etat() {
    this.a = 0
    for (var i = 0; i < this.value.length; i++) {
      if (this.value[i] != null) {
        this.a = i + 1
      }

    }
    return this.a;
  }
}