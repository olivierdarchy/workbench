
var angle = 2.4;
var c = 3;
var nmax = 4000;
var n;

function setup() {
	createCanvas(400, 400);
	background(0);
	r = 0;
	n = 0;
}

function draw() {
	var x, y;
	var r, phi;
	translate(width/2, height/2);
	noStroke();
	colorMode(HSB);
	
	if (n < nmax) {
		r = rEval(n);
		phi = phiEval(n);
		x = r * cos(phi);
		y = r * sin(phi);
		fill(r % 256, 255, 255);
		ellipse(x, y, 5, 5);
	}
	
	n += 1;
}

function phiEval(n) {
	return n * angle
}

function rEval(n) {
	return c * sqrt(n)
}