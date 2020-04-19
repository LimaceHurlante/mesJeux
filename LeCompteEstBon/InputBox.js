class InputBox{

  
  constructor(x,y,taille,nbDeCaractere){
  this.pos = createVector(x,y);
  this.size = taille ;
  this.nbcar = nbDeCaractere ;
  this.value = 0;
  this.s = "";
  this.n = 0;
  this.boxActive = false;
  this.valeurVide = true;
 
  }

  display(){
    if(this.boxActive){fill(250);}else{fill(75);}
    rect(this.pos.x, this.pos.y,this.size * this.nbcar *0.75, 1.15 *this.size);
    if(this.boxActive){fill(75);}else{fill(250);}
    textAlign(CENTER,TOP);
    textSize(this.size);
    //text(value,pos.x + 5, pos.y);
    text(this.value,this.pos.x +((this.size * this.nbcar *0.75)/2), this.pos.y);
  
  }
  inputString(a,b){
    
    if(this.boxActive){
      if((int(a)>= 0) && (int(a)< 10)){
        this.s = str(a);
        print(a)
        this.n = int(this.s);
        this.addNum();
      }
      if(b === BACKSPACE){
        this.value = (this.value - (this.value % 10))/10;
      }
    }
    return this.value
  }
  
  addNum(){
    if(this.nbcar == 1){
      this.value = this.n;
    }else{
      if (this.value <pow(10,this.nbcar-1)){
        if(this.value == 0){this.value = this.n;}else{this.value = this.value*10 + this.n;}
      }
    }
  }
  activation(booleenne){
      this.boxActive = booleenne; 
  }
}