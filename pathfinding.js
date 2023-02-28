
// Table size from generateTable.js
var gridSize = tableSize;
var grid = [];







function generatePathfindingTable() {

    grid = [];

    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = 'Empty';
        }
    }
    

    console.log('Snake: ' + snake);

    for (i in snake) {
        grid[snake[i].x][snake[i].y] = "Obstacle";
    }

    grid[snake[0].x][snake[0].y] = "Start";
    grid[apple_obj.x][apple_obj.y] = "Goal";

}


// Start location is:
// [distanceFromBottom, distanceFromLeft]
var findShortestPath = function (startCoordinates, grid) {
    var distanceFromBottom = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
        distanceFromBottom: distanceFromBottom,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
    };

    // Initialize the queue with the start location already inside
    var queue = [location];

    
    while (queue.length > 0) {
        // Remove the first location
        var currentLocation = queue.shift();

        // Explore up
        var newLocation = exploreInDirection(currentLocation, Directions.Up, grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore right
        var newLocation = exploreInDirection(currentLocation, Directions.Right, grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore down
        var newLocation = exploreInDirection(currentLocation, Directions.Down, grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore left
        var newLocation = exploreInDirection(currentLocation, Directions.Left, grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }
    }

    // No valid path found
    return false;

};

// valid if not snake body && not visited already
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function (location, grid) {
    var gridSize = tableSize;
    var dfb = location.distanceFromBottom;
    var dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromBottom < 0 ||
        location.distanceFromBottom >= gridSize) {

        // location is not on the grid
        return 'Invalid';
    } else if (grid[dfb][dfl] === 'Goal') {
        return 'Goal';
    } else if (grid[dfb][dfl] !== 'Empty') {
        // location is either a part of the snake or has been visited
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


var exploreInDirection = function (currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dfb = currentLocation.distanceFromBottom;
    var dfl = currentLocation.distanceFromLeft;

    if (direction === Directions.up) {
        dfb += 1;
    } else if (direction === Directions.Right) {
        dfl += 1;
    } else if (direction === Directions.Down) {
        dfb -= 1;
    } else if (direction === Directions.Left) {
        dfl -= 1;
    }

    var newLocation = {
        distanceFromBottom: dfb,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);

    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromBottom][newLocation.distanceFromLeft] = 'Visited';
    }

    return newLocation;
};



function startPathGeneration(){

    generatePathfindingTable();

    var finalpath = findShortestPath([snake[0].x,snake[0].y,], grid);
    
    var current = {x:snake[0].x, y:snake[0].y}
    
    console.log(finalpath);

    for(i in finalpath){
        var next_obj;
        switch (finalpath[i]) {
            case Directions.Up:
              next_obj = { x: current.x, y: current.y + 1 };
              break;
            case Directions.Right:
              next_obj = { x: current.x + 1, y: current.y };
              break;
            case Directions.Down:
              next_obj = { x: current.x, y: current.y - 1 };
              break;
            case Directions.Left:
              next_obj = { x: current.x - 1, y: current.y };
              break;
            default:
              console.log("Error unknown direction " + direction);
              next_obj = { error: "Error" };
              break;
          }


          document.getElementById(stringFromCords(next_obj)).className = "path";
    }



}


