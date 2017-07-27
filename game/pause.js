function Pause(core){
	var _core = core;
	var _keyCtrls = {};
	var _buttons = [];
	var _selected = 0;
	var _lock = false;
	
	// resume button
	_buttons.push({
		x: 50,
		y: 50,
		w: 200,
		h: 75,
		draw: function(){
			stroke(0);
			noFill();
			rect(50, 50, 200, 75);
		},
		action: function(){
			_core.popState();
		}
	});
	
	// quit button
	_buttons.push({
		x: 50,
		y: 150,
		w: 200,
		h: 75,
		draw: function(){
			stroke(0);
			noFill();
			rect(50, 150, 200, 75);
		},
		action: function(){
			_core.resetState(new Menu(_core));
		}
	});
	
	_keyCtrls[UP_ARROW] = function() {
		if (_selected == 0)
			_selected = _buttons.length - 1;
		else
			_selected--;
	}
	
	_keyCtrls[DOWN_ARROW] = function() {
		if (_selected == _buttons.length - 1)
			_selected = 0;
		else
			_selected++;
	}
	
	_keyCtrls[ENTER] = function() {
		if (_selected < _buttons.length){
			_buttons[_selected].action();
		}
	}
	
	this.keyCtrls = function(key) {
		try {
			if (_lock){
				_keyCtrls[key]();
				_lock = !_lock;
			} else {
				_lock = !_lock;
			}
		} catch (e) {
		}
	}
	
	this.draw = function() {
		background(255);
		for (var i in _buttons){
			_buttons[i].draw();
		}
		if (_selected < _buttons.length){
			var m = _buttons[_selected];
			stroke(255, 0, 0);
			noFill();
			rect(m.x, m.y, m.w, m.h);
		}
	}
}
