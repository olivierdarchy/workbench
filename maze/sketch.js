
var core;

function App(){
	
	var CONST = {
		scl: 5,
		depth: 45,
		genRate: 100,
		W: 0,
		NW: 1,
		NE: 2,
		E: 3,
		SE: 4,
		SW: 5
	};
	
	var grid = [];
	var rows_len = [];
	var saved_pos = []; 
	var grid_len;
	var current_pos;
	
	function evalGridLength(d, res = 1) {
		if (d == 0)
			return res;
		else
			return evalGridLength(d - 1, res + 6 * d);
	}
	
	function evalRowsLength(d) {
		var n = d + 1;
		var toggle = true;
		for (var i = 0; i < 2 * d + 1; i++){
			rows_len[i] = n;
			if (toggle && n < 2 * d + 1){
				n++;
			} else {
				n--;
				toggle = false;
			}
		}
	}
	
	function initGrid() {
		var x, y;
		var h;
		var xoff = cos(PI / 6) * CONST.scl;
		var yoff = CONST.scl * 3 / 2;
				
		grid_len = evalGridLength(CONST.depth);
		evalRowsLength(CONST.depth);
		h = floor(rows_len.length / 2);
		
		for (var row = 0; row < rows_len.length; row++){
			var cols = rows_len[row];
			
			for (var col = 0; col < cols; col++){
				x = floor((width / 2) + xoff * (col * 2 + 1 - cols));
				y = floor((height / 2) + yoff * (row - h));
				grid.push(new Space(x, y, CONST.scl));
			}
			}
	}
	
	function drawGrid(){
		for (var i = 0; i < grid_len; i++){
			grid[i].render();
		}
		grid[current_pos].hightlight();
	}
	
	function getRowFromPos(p){
		for (var i = 0; i < rows_len.length; i++){
			if (p < rows_len[i])
				return i;
			else
				p -= rows_len[i];
		}
	}
	
	function getNeighbour(p){
		var n = [];
		var i_cur_row = getRowFromPos(p);
		var cur_row = rows_len[i_cur_row];
		var top_row = (i_cur_row - 1 >= 0) ? rows_len[i_cur_row - 1] : undefined;
		var bottom_row = (i_cur_row + 1 < rows_len.length) ? rows_len[i_cur_row + 1] : undefined;
		var tcmin = top_row ? min(cur_row, top_row) : undefined;
		var tcmax = top_row ? max(cur_row, top_row) : undefined;
		var bcmin = bottom_row ? min(cur_row, bottom_row) : undefined;
		var bcmax = bottom_row ? max(cur_row, bottom_row) : undefined;
		if (p - 1 >= 0 && getRowFromPos(p - 1) == i_cur_row && !grid[p - 1].isVisited())
			n.push({pos: p - 1, dir: CONST.W});
		if (tcmin && p - tcmin >= 0 && getRowFromPos(p - tcmin) == i_cur_row - 1 && !grid[p - tcmin].isVisited())
			n.push({pos: p - tcmin, dir: CONST.NW});
		if (tcmax && p - tcmax >= 0 && getRowFromPos(p - tcmax) == i_cur_row - 1 && !grid[p - tcmax].isVisited())
			n.push({pos: p - tcmax, dir: CONST.NE});
		if (p + 1 < grid_len && getRowFromPos(p + 1) == i_cur_row && !grid[p + 1].isVisited())
			n.push({pos: p + 1, dir: CONST.E});
		if (bcmin && p + bcmin < grid_len && getRowFromPos(p + bcmin) == i_cur_row + 1 && !grid[p + bcmin].isVisited())
			n.push({pos: p + bcmin, dir: CONST.SE});
		if (bcmax && p + bcmax < grid_len && getRowFromPos(p + bcmax) == i_cur_row + 1 && !grid[p + bcmax].isVisited())
			n.push({pos: p + bcmax, dir: CONST.SW});
		return n;
	}
	
	this.setup = function() {
		createCanvas(800, 800);
		background(255);
		
		initGrid();
		current_pos = floor(random(grid_len))
		grid[current_pos].setVisited();
	}
	
	this.draw = function() {
		background(255);
		for (var i = 0; i < CONST.genRate; i++){
			var near = getNeighbour(current_pos);
			
			if (near.length){
				var next = random(near);
				saved_pos.push(current_pos);

				switch (next.dir) {
					case CONST.W :
						grid[current_pos].openWest();
						grid[next.pos].openEast();
						break;
					case CONST.NW :
						grid[current_pos].openNorthEast();
						grid[next.pos].openSouthWest();
						break;
					case CONST.NE :
						grid[current_pos].openNorthWest();
						grid[next.pos].openSouthEast();
						break;
					case CONST.E :
						grid[current_pos].openEast();
						grid[next.pos].openWest();
						break;
					case CONST.SE :
						grid[current_pos].openSouthWest();
						grid[next.pos].openNorthEast();
						break;
					case CONST.SW :
						grid[current_pos].openSouthEast();
						grid[next.pos].openNorthWest();
						break;
					default:
						break;
				};

				current_pos = next.pos;
				grid[current_pos].setVisited();
			} else if (saved_pos.length){
				current_pos = saved_pos.pop();
			}
		}
		drawGrid();
	};
}

function setup() {
	core = new App();
	core.setup();
}

function draw() {
	core.draw();
}