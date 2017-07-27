function Vehicle(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.target = null;
	this.maxspeed = 5;
	this.maxforce = 4;
}

Vehicle.prototype.behaviors = function() {
	var arrive = this.arrive(this.target);

	this.applyForce(arrive);
};

Vehicle.prototype.seek = function(target) {
	var desired;
	var steer;

	desired = p5.Vector.sub(target, this.pos);
	desired.setMag(this.maxspeed);
	steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
};

Vehicle.prototype.flee = function(target) {
	var desired;
	var steer;

	desired = p5.Vector.sub(target, this.pos);
	desired.setMag(this.maxspeed);
	desired.mult(-1);
	steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
}

Vehicle.prototype.arrive = function(target) {
	var desired;
	var steer;
	var d;

	desired = p5.Vector.sub(target, this.pos);
	d = desired.mag();
	desired.setMag(100 < d ? this.maxspeed : (d * this.maxforce) / 100);
	steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
}

Vehicle.prototype.applyForce = function(force) {
	this.acc.add(force);
};

Vehicle.prototype.update = function() {
	this.vel.add(this.acc);
	this.pos.add(this.vel);
	this.acc.mult(0);
};

Vehicle.prototype.show = function() {
	stroke(255);
	strokeWeight(8);
	point(this.pos.x, this.pos.y);
};

Vehicle.prototype.setTarget = function(x, y) {
	if (this.target)
		delete this.target
	this.target = createVector(x, y);
};

Vehicle.prototype.setMaxspeed = function(maxspeed) {
	this.maxspeed = maxspeed;
}

Vehicle.prototype.setMaxforce = function(maxforce) {
	this.maxforce = maxforce;
}