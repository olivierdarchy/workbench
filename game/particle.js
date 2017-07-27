/**
** Particle.js
** by Olivier DARCHY
*/

class Particle {
	constructor (x, y) {
		this.pos = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
	}

	update() {
		this.vel.limit(1);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0.71);
	}

	edges() {
		if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;		
		if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
	}

	applyForce(force) {
		this.acc.add(force);
	}

	separate(particles, amount) {
		var sum = new createVector(0, 0);
		var count = 0;

		for (var i = 0; i < particles.length; i++){
			var d = p5.Vector.dist(this.pos, particles[i].pos);
			if (d > 0 && d < amount) {
				var diff = p5.Vector.sub(this.pos, particles[i].pos);
				diff.normalize();
				diff.div(d);
				sum.add(diff);
				count++
			}
		}
		if (count > 0){
			sum.div(count);
			sum.normalize();
			sum.mult(0.5);
			var steer = p5.Vector.sub(sum, this.vel)
			steer.limit(1);
			this.applyForce(steer);
		}
	}

	draw() {
		noStroke();
		fill(255, 0, 255);
		ellipse(this.pos.x, this.pos.y, 10, 10);
	}
}