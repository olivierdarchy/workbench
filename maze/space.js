function Space(x, y, radius){
	var _x = x;
	var _y = y;
	var _r = radius;
	var _points = [
		{
			x: -_r * cos(PI/6),
			y: _r /2
		},
		{
			x: -_r * cos(PI/6),
			y: -_r /2
		},
		{
			x: 0,
			y: -_r
		},
		{
			x: _r * cos(PI/6),
			y: -_r /2
		},
		{
			x: _r * cos(PI/6),
			y: _r /2
		},
		{
			x: 0,
			y: _r
		}
	]
	var _walls = {
		west: function(){
			line(
				_points[0].x, _points[0].y,
				_points[1].x, _points[1].y
			);
		},
		northwest: function(){
			line(
				_points[1].x, _points[1].y,
				_points[2].x, _points[2].y
			);
		},
		northeast: function(){
			line(
				_points[2].x, _points[2].y,
				_points[3].x, _points[3].y
			);
		},
		east: function(){
			line(
				_points[3].x, _points[3].y,
				_points[4].x, _points[4].y
			);
		},
		southeast: function(){
			line(
				_points[4].x, _points[4].y,
				_points[5].x, _points[5].y
			);
		},
		southwest: function(){
			line(
				_points[5].x, _points[5].y,
				_points[0].x, _points[0].y
			);
		}
	};
	var _visited = false;

	this.openNorthEast = function(){
		_walls.northeast = function(){
			return null;
		};
	};
	
	this.openSouthEast = function(){
		_walls.southeast = function(){
			return null;
		};
	};
	
	this.openNorthWest = function(){
		_walls.northwest = function(){
			return null;
		};
	};
	
	this.openSouthWest = function(){
		_walls.southwest = function(){
			return null;
		};
	};
	
	this.openEast = function(){
		_walls.east = function(){
			return null;
		};
	};
	
	this.openWest = function(){
		_walls.west = function(){
			return null;
		};
	};
	
	this.render = function(){
		push();
		stroke(0);
		translate(_x, _y);
		for (var idx in _walls) {
			_walls[idx]();
		}
		if (_visited){
			noStroke();
			fill(0, 0, 200, 70);;
			beginShape();
			vertex(_points[0].x, _points[0].y);
			vertex(_points[1].x, _points[1].y);
			vertex(_points[2].x, _points[2].y);
			vertex(_points[3].x, _points[3].y);
			vertex(_points[4].x, _points[4].y);
			vertex(_points[5].x, _points[5].y);
			endShape(CLOSE);
		}
		pop();
	};
	
	this.hightlight = function(){
		push();
		noStroke();
		fill(200, 0, 200, 70);
		translate(_x, _y);
		beginShape();
		vertex(_points[0].x, _points[0].y);
		vertex(_points[1].x, _points[1].y);
		vertex(_points[2].x, _points[2].y);
		vertex(_points[3].x, _points[3].y);
		vertex(_points[4].x, _points[4].y);
		vertex(_points[5].x, _points[5].y);
		endShape(CLOSE);
		pop();
	}
	
	this.setVisited = function(){
		_visited = true;
	}
	
	this.isVisited = function(){
		return _visited;
	}
}