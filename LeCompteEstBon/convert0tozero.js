//By LimaceHurlante 19/04/2020

function convert0tozero(_nombre) {
  //Cette fonction recoit du texte puis retourne un texte en français correspondant
  this.nombre = _nombre;
  if (Number.isInteger(this.nombre) == false) {
    return "Erreur - Il faut envoyer uniquement des nombres entier à cette fonction"
  }

  dispatchNombre();

  return millier() + centaine() + dixaineUnite();

  function dixaineUnite() {
    if (this.reste < 1) {
      return "";
    } else if (this.reste < 10) {
      //de zero à 10
      return unite(this.reste);
    } else if (this.reste < 17) {
      //de 10 à 16
      return petiteDizaine(this.reste % 10)

    } else if (this.reste < 70) {
      // de 18 à 69
      if ((this.reste % 10) == 1) {
        return dizaine(Math.floor(this.reste / 10)) + "et " + unite(this.reste % 10)
      } else if ((this.reste % 10) == 0) {
        return dizaine(Math.floor(this.reste / 10))
      } else {
        return dizaine(Math.floor(this.reste / 10)) + unite(this.reste % 10)
      }
    } else if (this.reste == 71) {
      // de 71
      return dizaine(Math.floor(this.reste / 10)) + "et " + petiteDizaine(this.reste % 10)
    } else if (this.reste < 80) {
      // de 70 à 79
      return dizaine(Math.floor(this.reste / 10)) + petiteDizaine(this.reste % 10)
    } else if (this.reste < 90) {
      // de 80 à 89
      if ((this.reste % 10) == 0) {
        return dizaine(Math.floor(this.reste / 10))
      } else {
        return dizaine(Math.floor(this.reste / 10)) + unite(this.reste % 10)
      }

    } else if (this.reste < 100) {
      return dizaine(Math.floor(this.reste / 10)) + petiteDizaine(this.reste % 10)
    } else {
      return "";
    }
  }

  function petiteDizaine(petitDizaine) {
    switch (petitDizaine) {
      case 0:
        return "dix"
        break;
      case 1:
        return "onze"
        break;
      case 2:
        return "douze"
        break;
      case 3:
        return "treize"
        break;
      case 4:
        return "quatorze"
        break;
      case 5:
        return "quinze"
        break;
      case 6:
        return "seize"
        break;
      case 7:
        return "dix sept"
        break;
      case 8:
        return "dix huit"
        break;
      case 9:
        return "dix neuf"
        break;
    }

  }

  function unite(unit) {
    switch (unit) {
      case 0:
        return "zéro"
        break;
      case 1:
        return "un"
        break;
      case 2:
        return "deux"
        break;
      case 3:
        return "trois"
        break;
      case 4:
        return "quatre"
        break;
      case 5:
        return "cinq"
        break;
      case 6:
        return "six"
        break;
      case 7:
        return "sept"
        break;
      case 8:
        return "huit"
        break;
      case 9:
        return "neuf"
        break;
    }

  }

  function dizaine(dizai) {
    switch (dizai) {
      case 0:
        return ""
        break;
      case 1:
        return "dix "
        break;
      case 2:
        return "vingt "
        break;
      case 3:
        return "trente "
        break;
      case 4:
        return "quarante "
        break;
      case 5:
        return "cinquante "
        break;
      case 6:
        return "soixante "
        break;
      case 7:
        return "soixante "
        break;
      case 8:
        return "quatre-vingt "
        break;
      case 9:
        return "quatre-vingt "
        break;
    }

  }

  function millier() {
    if (this.milliers > 1) {
      return (unite(this.milliers) + " mille ");
    } else if (this.milliers == 1) {
      return "mille ";
    } else {
      return "";
    }
  }

  function centaine() {
    if (this.centaines > 1) {
      if (this.reste == 0) {
        return (unite(this.centaines) + " cents");
      } else {
        return (unite(this.centaines) + " cent ");
      }
      return (unite(this.centaines) + " cent ");
    } else if (this.centaines == 1) {
      return "cent ";
    } else {
      return "";
    }
  }

  function dispatchNombre() {

    this.milliers = Math.floor(this.nombre / 1000);
    this.nombre = this.nombre % 1000;
    this.centaines = Math.floor(nombre / 100);
    this.reste = this.nombre % 100;

  }
}