
var core;

/**
function Test(core){
	var _core = core;
	var _keyCtrls = {};
	
	_keyCtrls[ENTER] = function() {
			background(255);
			_core.replaceState(new Test(_core));
			console.log("pressed!");
	}
	
	
	this.keyCtrls = function(key) {
		try {
			_keyCtrls[key]();
		} catch (e) {
			console.log("unbinded key!");
		}
	}
	
	this.draw = function() {
		noStroke();
		fill(0);
		for (var i = 0; i < 5; i++){
			ellipse(random(width), random(height), 5, 5);
		}
	}
}
*/

function App(){
	
	var _state = [];
	
	this.pushState = function(state){
		_state.push(state);
	}
	
	this.popState = function(){
		_state.pop();
	}
	
	this.replaceState = function(state){
		_state.pop();
		_state.push(state);
	}
	
	this.resetState = function(state){
		while (_state.length)
			_state.pop();
		_state.push(state);
	}
	
	this.setup = function() {
		createCanvas(800, 600);
		background(255);
	}
	
	this.draw = function() {
		if (_state.length)
			_state[_state.length - 1].draw();
		else
			noLoop();
	};
	
	this.keyCtrls = function(key) {
		if (_state.length)
			_state[_state.length - 1].keyCtrls(key);
	}
}

function setup() {
	core = new App();
	state = new Menu(core);
	core.setup();
	core.pushState(state);
}

function draw() {
	core.draw();
}

function keyPressed() {
	core.keyCtrls(keyCode);
	return false;
}

function keyReleased(){
	core.keyCtrls(keyCode);
	return false;
}