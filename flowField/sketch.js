var App = function(){
	var flowfield = [];
	var particles = [];
	var scl = 10;
	var inc = 0.02;
	var mag = 5;
	var end = 10000; 
	var particle_amount = 700;
	var rows, cols;
	var xoff, yoff, zoff;
	var cur;
	
	this.setup = function(){
		createCanvas(800, 600);
		background(255);
		rows = floor(width / scl);
		cols = floor(height / scl);
		zoff = 0;
		cur = 0;
		generateParticles();
	};
	
	this.draw = function(){
		if (cur == end) {
			background(255);
			cur = 0;
			generateParticles();
		}
		else {
			background(255, 255, 255, 4);
		}
		
		yoff = 0;
		for (var y = 0; y < cols; y++) {
			xoff = 0;	
			for (var x = 0; x < rows; x++) {
				var angle = noise(xoff, yoff, zoff) * TWO_PI;
				var v = p5.Vector.fromAngle(angle);
				v.setMag(mag);
				var idx = y * cols + x;
				//drawVectorFromAngle(v, x, y);
				flowfield[idx] = v;
				xoff += inc;			
			}
			yoff += inc;
		}
		
		for (var i = 0; i < particle_amount; i++){
			var pos = particles[i].getPos();
			var posx = floor(pos.x / scl),
				posy = floor(pos.y / scl);
			var index = posy * cols + posx;
			var f = flowfield[index];
			particles[i].applyForce(f);
			particles[i].update();
			particles[i].edges();
			particles[i].render();
		}
		
		zoff += 0.009;
		cur++;
	};
	
	function drawVectorFromAngle(vec, x, y){
		push();
		translate(x * scl, y * scl);
		rotate(vec.heading());
		stroke(0);
		line(0, 0, scl, 0);
		pop();
	}
	
	function generateParticles() {
		particles = [];
		for (var i = 0; i < particle_amount; i++){
			particles.push(new Particle());
		}
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