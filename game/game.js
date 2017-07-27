function Game(core){
	var _core = core;
	var _keyCtrls = {};
	var _particles = [];
	var _time = function() {
		var d = new Date();
		return d.getTime();
	}
	var _start = _time();
	var _score = 0;
	var _dummy = {
		pos: createVector(width/2, height/2),
		vel: createVector(0, 0),
		acc: createVector(0, 0),
		maxV: 4,
		r: 10,
		mvtFlag: 0,
		draw: function(){
			noStroke();
			fill(255, 0, 0);
			ellipse(this.pos.x, this.pos.y, this.r, this.r);
		},
		update: function(){
			this.vel.add(this.acc);
			this.vel.limit(this.maxV);
			this.pos.add(this.vel);
		},
		applyForce: function(force){
			this.acc.add(force);
		},
		edges: function(){
			if (this.pos.x < 0) this.pos.x = width;
			else if (this.pos.x > width) this.pos.x = 0;
		
			if (this.pos.y < 0) this.pos.y = height;
			else if (this.pos.y > height) this.pos.y = 0;
		},
		collision: function(particles){
			for (let i = 0; i < particles.length; i++){
				var d = dist(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);
				if (d < 10)
					return true;
			}
			return false
		}
	};
	
	_keyCtrls[UP_ARROW] = function() {
		if (!(_dummy.mvtFlag & 1)){
			_dummy.applyForce(createVector(0, -1));
			_dummy.mvtFlag += 1;
		} else {
			_dummy.vel.sub(createVector(0, _dummy.vel.y));
			_dummy.acc.sub(createVector(0, _dummy.acc.y));
			_dummy.mvtFlag -= 1;
		}
	}
	
	_keyCtrls[DOWN_ARROW] = function() {
		if (!((_dummy.mvtFlag >> 1) & 1)){
			_dummy.applyForce(createVector(0, 1));
			_dummy.mvtFlag = _dummy.mvtFlag | 2;
		} else {
			_dummy.vel.sub(createVector(0, _dummy.vel.y));
			_dummy.acc.sub(createVector(0, _dummy.acc.y));
			_dummy.mvtFlag = _dummy.mvtFlag & 13;
		}
	}
	
	_keyCtrls[LEFT_ARROW] = function() {
		if (!((_dummy.mvtFlag >> 2) & 1)){
			_dummy.applyForce(createVector(-1, 0));
			_dummy.mvtFlag = _dummy.mvtFlag | 4;
		} else {
			_dummy.vel.sub(createVector(_dummy.vel.x, 0));
			_dummy.acc.sub(createVector(_dummy.acc.x, 0));
			_dummy.mvtFlag = _dummy.mvtFlag & 11;
		}
	}
	
	_keyCtrls[RIGHT_ARROW] = function() {
		if (!((_dummy.mvtFlag >> 3) & 1)){
			_dummy.applyForce(createVector(1, 0));
			_dummy.mvtFlag = _dummy.mvtFlag | 8;
		} else {
			_dummy.vel.sub(createVector(_dummy.vel.x, 0));
			_dummy.acc.sub(createVector(_dummy.acc.x, 0));
			_dummy.mvtFlag = _dummy.mvtFlag & 7;
		}
	}
	
	_keyCtrls[ESCAPE] = function() {
		_core.pushState(new Pause(_core));
	}
	
	for (let i = 0; i < 150; i++) {
		_particles.push(new Particle(random(width), random(height)))
	}

	this.keyCtrls = function(key) {
		try {
			_keyCtrls[key]();
		} catch (e) {
		}
	}
	
	this.draw = function() {
		background(255)
		_score = _time() - _start;
		if (_dummy.collision(_particles)) {
			console.log("game over!")
			console.log("score: " + floor(_score));
			_core.replaceState(new Menu(_core));
		}
		
		_dummy.edges();
		_dummy.update();
		_dummy.draw();

		for (let i = 0; i < _particles.length; i++) {
			_particles[i].separate(_particles, 10);
			_particles[i].edges();
			_particles[i].update();
			_particles[i].draw();
		}

	}
}