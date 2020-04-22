let sizeDeBase = 720; // ratio d'écran standard du 4/3 au 20/9 => de 1.33 à 2.2
var pageDAceuil, modeAuto, modeManuel;
let phase = 0;
let chrono = [];
let entrainement;

function setup() {

	createCanvas(sizeDeBase / 1.8, sizeDeBase);
	pageDAceuil = new PageDAceuil();
	modeAuto = new ModeAuto();
	modeManuel = new ModeManuel();

}

function draw() {
	background(120);
	if (phase === 0) {
		pageDAceuil.display();

	} else if (phase === 1) {
		modeAuto.display();
	} else if (phase === 2) {
		modeManuel.display();
	}
}


function keyTyped() {
	if (key === "p") {
		if (phase < 2) {
			phase++;
		} else {
			phase = 0;
		}
	}
	if (key === "s") {
		simplifie(millis() + 3600000 + 70000 + 547000);
	}

}

function mouseClicked() {
	if (pageDAceuil) {
		pageDAceuil.hit();
	}
}


class Bouton {
	constructor(PosX, PosY, sizeX, sizeY, arrayDeValeur) {
		this.pos = createVector(PosX, PosY);
		this.size = createVector(sizeX, sizeY);
		this.value = [];
		this.value = arrayDeValeur;
		this.callback = "";
		this.level = 1;
		if (this.value.length === 1) {
			this.value.push("");
		}
		this.nbLevel = this.value.length - 1;
		this.shining = 5;
	}
	display() {
		push()
		translate(this.pos.x, this.pos.y)
		rectMode(CENTER);
		strokeWeight(5)

		fill(184, 240, 195);
		if (this.shining) {
			fill(42, 42, 255);;
		}
		rect(0, 0, this.size.x, this.size.y, this.size.y / 20)
		textAlign(CENTER, CENTER);
		textSize(20);
		fill(0);
		if (this.shining) {
			fill(255);
		}
		text(this.value[0] + this.value[this.level], 0, 0)
		pop()
		if (this.shining) {
			this.shining--;
		}
	}

	hitbox() {
		if ((mouseX > (this.pos.x - (this.size.x / 2)) && mouseX < (this.pos.x + (this.size.x / 2))) && (
				mouseY > (this.pos.y - (this.size.y / 2)) && mouseY < (this.pos.y + (this.size.y / 2)))) {
			this.shining = 5;
			return true
		}
		return false
	}
	levelUp() {

		if (this.level < this.nbLevel) {
			this.level++;
		} else {
			this.level = 1;

		}

	}
	valeurAbsolue(val) {
		this.value = []
		this.value[0] = val;
		this.value[1] = "";
		this.level = 1;
		this.nbLevel = 1;

	}
}
class PageDAceuil {
	constructor() {
		this.bouton = [];
		this.bouton.push(new Bouton(width / 2, 80, width - 40, 120, ["Mode ", "Automatique", "Manuel"]));
		this.bouton.push(new Bouton(width / 2, 220, width - 40, 120, ["Nombre de marche de l'escalier : ", 10, 3, 4, 5, 6, 7, 8, 9, ]));
		this.bouton.push(new Bouton(width / 2, 360, width - 40, 120, ["Temps de repos = Temps d'effort X ", 2, 0.5, 0.75, 1, 1.25, 1.50, 1.75]));
		this.bouton.push(new Bouton(width / 2, 500, width - 40, 120, ["Consulter le mode d'emploi"]));
		this.bouton.push(new Bouton(width / 2, 640, width - 40, 120, ["GO GO GO"]));
		this.bouton[this.bouton.length - 1].callback = "gogogo"


	}
	display() {
		for (let i = 0; i < this.bouton.length; i++) {
			this.bouton[i].display();
		}
	}

	hit() {
		for (let i = 0; i < this.bouton.length; i++) {
			if (this.bouton[i].hitbox()) {
				this.bouton[i].levelUp();
				if (this.bouton[i].callback != "") {
					this[this.bouton[i].callback]();

				}
			}
		}
	}
	gogogo() {
		entrainement = new Entrainement(pageDAceuil.bouton[0].level, pageDAceuil.bouton[1].value[pageDAceuil.bouton[1].level])
		//lvl1 = auto - lvl2 = manuel
		phase = entrainement.mode;
		this.StartChrono();
		// phase = 2;
	}
	StartChrono() {
		chrono.push(new Chronometre)
		console.log('Chrono crée');
	}
}
class ModeAuto {
	constructor() {
		this.bouton = [];
		this.bouton.push(new Bouton(width / 2, 80, width - 40, 120, ["Mode automatique"]));
		this.bouton.push(new Bouton(width / 2, 220, width - 40, 120, ["Niveau "]));
		this.bouton.push(new Bouton(width / 2, 430, width - 40, 260, [""]));
		this.bouton.push(new Bouton(width / 2, 640, width - 40, 120, ["Arreter"]));
	}
	display() {
		this.bouton[0].valeurAbsolue("-- Mode automatique --\n" + entrainement.chrono.ecoule(true, true));
		for (let i = 0; i < this.bouton.length; i++) {
			this.bouton[i].display();
		}
	}
	hit() {
		for (let i = 0; i < this.bouton.length; i++) {
			if (this.bouton[i].hitbox()) {
				this.bouton[i].levelUp();
			}
		}
	}


}
class ModeManuel {
	constructor() {
		this.bouton = [];
		this.bouton.push(new Bouton(width / 2, 80, width - 40, 120, ["Mode Manuel"]));
		this.bouton.push(new Bouton(width / 2, 220, width - 40, 120, ["Niveau "]));
		this.bouton.push(new Bouton(width / 2, 430, width - 40, 260, [""]));
		this.bouton.push(new Bouton(width / 2, 640, width - 40, 120, ["Arreter"]));



	}
	display() {
		if (chrono[0] != undefined) {
			this.bouton[0].valeurAbsolue("Mode manuel\n" + chrono[0].ecoule(true, true));
		}
		for (let i = 0; i < this.bouton.length; i++) {
			this.bouton[i].display();
		}
	}
	hit() {
		for (let i = 0; i < this.bouton.length; i++) {
			if (this.bouton[i].hitbox()) {
				this.bouton[i].levelUp();
			}
		}
	}
}
class Chronometre {
	constructor(echeance) {
		this.echeance = echeance;
		this.start = millis();

	}
	misEnPage(sequence) {
		let rendu = "";
		if (sequence[0] != 0) {
			rendu = sequence[0] + "h ";
			rendu = rendu + sequence[1] + "m ";
		} else {
			if (sequence[1] != 0) {
				rendu = sequence[1] + "m ";
			}
		}
		if (sequence[2] < 10 && sequence[1] > 0) {
			rendu = rendu + "0";
		}
		rendu = rendu + sequence[2] + "s ";
		if (sequence[3] < 10) {
			rendu = rendu + "0";
		}
		rendu = rendu + sequence[3];
		return rendu


	}
	ecoule(simplifier, miseenpage) {
		if (simplifier) {
			if (miseenpage) {
				return this.misEnPage(this.simplifie(millis() - this.start));
			} else {
				return this.simplifie(millis() - this.start);
			}
		} else {
			return millis() - this.start;
		}
	}
	restant(simplifier) {
		if (this.echeance == undefined) return false;
		if (this.echeance - this.ecoule() < 0) return 0;
		if (simplifier) {
			return simplifie(this.echeance - this.ecoule());
		} else {
			return (this.echeance - this.ecoule());
		}
	}
	simplifie(milli) {
		//recois des milliseconde et les traduit en un array contenant
		//heure puis minute puis seconde puis centieme
		let rendu = [];
		//on enleve le milliemes de seconde
		milli = (milli - milli % 10) / 10
		//rendu de centième de secondes
		rendu.unshift(milli % 100)
		//rendu des seconde
		milli -= milli % 100
		milli /= 100;
		rendu.unshift(milli % 60);
		//rendu des minutes
		milli -= milli % 60
		milli /= 60;
		rendu.unshift(milli % 60);
		//rendu des heures
		milli -= milli % 60
		milli /= 60;
		rendu.unshift(milli % 60);
		//fin
		return rendu
	}
}
class Entrainement {
	constructor(mode, NBlevel) {
		this.mode = mode;
		this.chrono = new Chronometre();
		this.level = 0;
		this.NBlevel = NBlevel;
		this.NBMoveDone = 0;
		this.chronoEffortEnCour;
		this.chronoReposEnCour;
		this.chronoCompteARebour = new Chronometre(11000)

	}
	gestionnaireManuel() {


	}
	gestionnaireAuto() {


	}
	display() {

	}
}