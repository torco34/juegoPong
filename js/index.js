//varriables globales
var bucles;
var velocidad = 5;
var canvas  = document.getElementById('canvas');
var areaW = canvas.width;
var areaH = canvas.height;
var ctx = canvas.getContext("2d");
var puntosj1 = 0;
var puntosj2 = 0;
var tamanoPaleta = 75;
var superficie = areaH-tamanoPaleta;



//class



class 	Base {
	choque(obj){
		if (this.fondo < obj.y || this.y > obj.fondo || this.derecha < obj.x || this.x > this.derecha ) {
			return false;
		}else {
			return true;
		}
	}
}

class Puntos {
	constructor(x){
     this.x = x;
     this.y = 25;
     this.puntos = 0;
	}
	dibujar(){
		ctx.font = "25px Arial";
		ctx.fillText(this.puntos.toString(), this.x, this.y,);
	}
}

class Bola extends  Base{
	constructor(){
		super();
		this.t = 25;
		this.x = Math.floor(Math.random() * (areaW -this.t));
		this.y =  Math.floor(Math.random() * (areaH -this.t));
		this.xdir = velocidad;
		this.ydir = velocidad;
		this.p1 = new Puntos(25);
		this.p2 = new Puntos(575);
	}
	choqueV(){
		if (this.y <= 0 || this.y >= (areaH -this.t)) {
			this.ydir = -this.ydir;    
		}
	}
	choqueH(){
		if (this.x <= 0) {
			this.xdir = -this.xdir;
			puntosj2++;
			this.p2.puntos = puntosj2;

		}
		if(this.x >= (areaW - this.t)){
			this.xdir = -this.xdir;
			puntosj1++;
			this.p1.puntos = puntosj1;
		}
	}


	mover(){
		this.x+=this.xdir;
		this.y+=this.ydir;
		this.fondo = this.y+this.t;
		this.derecha = this.x+this.t;
		this.choqueV();
		this.choqueH();

	}
	dibujar(){
		ctx.fillRect(this.x, this.y, this.t, this.t);
		this.p1.dibujar();
		this.p2.dibujar();

	}
}

class Paleta extends  Base {
	constructor(x) {
		super();
		this.x  = x;
		this.w  = 25;
		this.h  = tamanoPaleta;
		this.y =  Math.floor(Math.random() * superficie);
		this.dir  = 0;
	}
	dibujar(){
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
	mover(){
		this.y+=this.dir;
		this.derecha = this.w+this.x;
		this.fondo = this.h+this.y;
		if (this.y <= 0) {
			this.y = 0;
			this.dir = 0;

		}
		if(this.y >= superficie){
			this.y = superficie;
			this.dir = 0;
		}
	}
}


 //objetos
 var bola = new Bola();
 var jugador1 = new Paleta(30);
 var jugador2 = new Paleta(545);


 //funcion de control

 function moverPaleta(event){
 	var tecla = event.keyCode;

 	if ( tecla == 38 ) {
 		jugador2.dir = -velocidad;

 	}
 	if ( tecla == 40 ) {
 		jugador2.dir = velocidad;
 	}
 	if (tecla == 87) {
 		jugador1.dir = -velocidad;
 	}
 	if (tecla == 83) {
 		jugador1.dir = velocidad;
 	}

 }
 function pararPaleta(event){
 	var tecla = event.keyCode;
 	if (tecla == 38 || tecla == 40 ) {
 		jugador2.dir = 0;
 	}
 	if (tecla == 87 || tecla == 83 ) {
 		jugador1.dir = 0;
 	}
 }
//funciones glovales
function choque(){
	if(bola.choque(jugador1) || bola.choque(jugador2)){
		bola.xdir = -bola.xdir;
	}
}


function dibujar() {

	ctx.clearRect(0,0,areaW, areaH);
	bola.dibujar();
	jugador1.dibujar();
	jugador2.dibujar();

}



function frame(){
	bola.mover();
	jugador1.mover();
	jugador2.mover();
	dibujar();
	choque();
	bucle = requestAnimationFrame(frame);


}

function iniciar(){
	var modal = document.getElementById('modal')
	modal.style.display = "none";
	frame()

}