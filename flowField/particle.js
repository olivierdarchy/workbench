function Particle(){
	var pos = createVector(width, random(height));
	var vel = createVector(0, 0);
	var acc = createVector(0, 0);
	var maxvel = 6.5;
	var r = 6;
	var c_inc = 0;

	this.update = function(){
		vel.add(acc);
		vel.limit(maxvel);
		pos.add(vel);
		acc.mult(0.7);
		c_inc += 0.001;
	}
	
	this.edges = function() {
		if (pos.x < 0) pos.x = width;
		else if (pos.x > width) pos.x = 0;
		
		if (pos.y < 0) pos.y = height;
		else if (pos.y > height) pos.y = 0;
	}
	
	this.applyForce = function(force) {
		acc.add(force);
	}
	
	this.getPos = function(){
		return pos;
	}
	
	this.render = function(){
		var color = 50;//map(noise(c_inc), 0, 1, 0, 100);
		push();
		stroke(color, 1);
		translate(pos.x, pos.y);
		rotate(vel.heading());
		line(0, 0, r, 0);
		pop();
	}
}