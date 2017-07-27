var App = function(){
	var pt;
	
	this.setup = function(){
		createCanvas(800, 600);
		pt = new Vehicle(200, 200);
		pt.setTarget(400, 300);
		pt2 = new Vehicle(700, 550);
		pt2.setTarget(400, 300);
	};
	
	this.draw = function(){
		background(42);
		pt.behaviors();
		pt2.behaviors();
		pt.update();
		pt2.update();
		pt.show();
		pt2.show();
	};

	this.setTarget = function(x, y) {
		var t = createVector(x, y);
		var a = pt.flee(t);
		var b = pt2.flee(t);
		pt.applyForce(a);
		pt2.applyForce(b);
	}
};

var a;

function setup() {
	a = new App();
	a.setup();
}

function draw() {
	a.draw();
}

function mouseMoved() {
  a.setTarget(mouseX, mouseY);
}