
/**
GRID CLASS 
**/
function Grid(radius, width, height) {
    // I'm not sure offhand how to find the optimum grid size.
    // Let's use a radius as a starting point
    this.gridX = Math.floor(width / radius);
    this.gridY = Math.floor(height / radius);
  
    // Determine cell size
    this.cellWidth = width / this.gridX;
    this.cellHeight = height / this.gridY;
  
  // Create the grid structure
    this.grid = [];
    for (var i = 0; i < this.gridY; i++) {
        // grid row
        this.grid[i] = [];
        for (var j = 0; j < this.gridX; j++) {
            // Grid cell, holds refs to all circles
            this.grid[i][j] = []; 
        }
    }
}

Grid.prototype = {
    // Return all cells the circle intersects. Each cell is an array
    getCells: function(circle) {
        var cells = [];
        var grid = this.grid;
        // For simplicity, just intersect the bounding boxes
        var gridX1Index = Math.floor(
            (circle.x - circle.radius) / this.cellWidth
        );
        var gridX2Index = Math.ceil(
            (circle.x + circle.radius) / this.cellWidth
        );
        var gridY1Index = Math.floor(
            (circle.y - circle.radius) / this.cellHeight
        );
        var gridY2Index = Math.ceil(
            (circle.y + circle.radius) / this.cellHeight
        );
        for (var i = gridY1Index; i < gridY2Index; i++) {
            for (var j = gridX1Index; j < gridX2Index; j++) {
                // Add cell to list
                cells.push(grid[i][j]);
            }
        }
        return cells;
    },
    add: function(circle) {
        this.getCells(circle).forEach(function(cell) {
            cell.push(circle);
        });
    },
    hasCollisions: function(circle) {
        return this.getCells(circle).some(function(cell) {
            return cell.some(function(other) {
                return this.collides(circle, other);
            }, this);
        }, this);
    },
    collides: function (circle, other) {
        if (circle === other) {
          return false;
        }
    	var dx = circle.x - other.x;
    	var dy = circle.y - other.y;
    	var rr = circle.radius + other.radius;
    	return (dx * dx + dy * dy < rr * rr);
    }
};

export const makeCircleGrid = (w, h, circleCount)=>{
    let g = new Grid(150, w, h);

    // stick circles into the grid
    let circles = [];
    let radii = [
        Math.round(200/2),
        Math.round(150/2),
        Math.round(130/2),
        Math.round(100/2),
        Math.round(80/2)
    ];

    for (var i=0; i<circleCount; i++) {
        let radius, circle;
        let check = 0;
        let iterations = 500;
        do {
            radius = radii[Math.floor(Math.random()*radii.length)];
            circle = {
            x: Math.random() * (w - radius * 2) + radius,
            y: Math.random() * (h - radius * 2) + radius,
            radius: radius
            };
        } while(g.hasCollisions(circle) && ++check < iterations);
        circles.push(circle);
        g.add(circle);
    }

    return circles;
}


