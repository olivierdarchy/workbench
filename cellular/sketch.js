var core;

function App(){
	var _const = {
		edge: 2,
		rules: {
			0: {
				0: {
					0: 1,
					1: 0
				},
				1: {
					0: 1,
					1: 0	
				}
			},
			1: {
				0: {
					0: 1,
					1: 0
				},
				1: {
					0: 0,
					1: 1	
				}
			}
		}
	};
	var _line = [];
	var _grid = [];
	var _maxlines;
	var _maxelems;

	this.setup = function() {
		createCanvas(400, 400);
		_maxelems = floor(width / _const.edge);
		_maxlines = floor(height / _const.edge);
		for (let i = 0; i < _maxelems; i++){
			_line[i] = 0;
		}
		//for (let i = 0; i < floor(random(_maxelems)); i++)
		_line[floor(random(_maxelems))] = 1;
		_grid.push(_line.slice());
		frameRate(10);
	};
	
	this.update = function () {
		var curline = [];
		var left, mid, right;

		for (let i = 0; i < _maxelems; i++){
			left = i == 0 ? _line[_maxelems - 1] : _line[i - 1];
			mid = _line[i];
			right = i == _maxelems - 1 ? _line[0] : _line[i + 1];
			curline[i] = _const.rules[left][mid][right];
		}
		_grid.unshift(curline);
		_line = curline.slice();

		if (_grid.length > _maxlines){
			delete _grid.pop();
		}
	};

	this.draw = function() {
		var x, y;

		background(155);

		for (let i = 0; i < _grid.length; i++){
			for(let j = 0; j < _maxelems; j++){
				y = i * _const.edge;
				x = j * _const.edge;
				if (_grid[i][j] == 1){
					noStroke();
					fill(0, 55, 155);
					rect(x, y, _const.edge, _const.edge);
				}
			}
		}
	};
}

function setup() {
	core = new App();
	core.setup();
}

function draw() {
	core.update();
	core.draw();
}
