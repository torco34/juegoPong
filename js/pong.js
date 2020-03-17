var bucle;
var velocidad = s;
var canvas = document.getElementsByTagName("canvas");
var areaW = canvas.width;
var areaH = canvas.height;
var ctx = canvas.getContext("2d");
var puntosj1 = 0;
var puntosj2 = 0;
//class
class base {
	choque(obj){
		if(this.fondo < obj.y || this.y > obj.fondo || this.derecha < obj.x || this.x > this.derecha) {
			return false;
		} else {
			return true;
		}

	}
}

class Bola  {
	constructor(){
		super();
		this.t = 25;
		this.x = Math.floor(Math.random() * (areaw - this.t));
		this.y = Math.floor(Math.random() * (areaH - this.t));
		this.xdir = velocidad;
		this.ydir =  velocidad;

	}


}






choqueV(){

	if (this.y <= 0 || this.y >= (areaH -this.t)) {
		this.ydir = -this.ydir;
	}


}
choqueH(){
	if(this.x <= 0){
		this.xdir = -this.xdir;
		puntosj2++;
	}
	if (this.x >= (areaw - this.t)) {
		this.xdir = -this.xdir;
		puntosj1++;
	}


}
mover(){
	this.x+=this.xdir;
	this.y+=this.ydir;
	this.choqueV();
	this.choqueH();
}
dibujar(){
	ctx.fillRect(this.x, this.y, this.t, this.t)
}
}



choque("dibujo"){
	if (true) {}
}

//objeto

var bola = new Bola();



//funciton global
function dibujar(){
	ctx.clearRect(0,0,areaW, areaH);
	bola.dibujar();

};
function frame(){
	bola.mover();
	dibujar();
	bucle = requestAnimationFrame("frame");

}
function iniciar (){
	var modal = document.getElementById("modal");
	modal.style.display = "none";
	frame();
	
}
document.getElementById("myBtn").onclick = displayDate;