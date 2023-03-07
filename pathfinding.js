


// Table size from generateTable.js
var gridSize = tableSize;
var grid = [];

const shouldPaintVisited = false;
const shouldPaintPath = true;
const shouldSlowPaint = false;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearMapArtifacts (){
    const allElements = document.querySelectorAll('*');

    allElements.forEach((element) => {
        element.classList.remove('Visited');
        element.classList.remove('path');
      });
}

function generatePathfindingTable() {
    clearMapArtifacts();
    grid = [];

    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = 'Empty';
        }
    }

    for (i in snake) {
        grid[snake[i].x][snake[i].y] = "Obstacle";
    }

    //grid[snake[0].x][snake[0].y] = "Start";
    grid[apple_obj.x][apple_obj.y] = "Goal";

}


// Start location is:
// {x:y}
var findShortestPath = async function (startCoordinates, grid) {
    var x = startCoordinates.x;
    var y = startCoordinates.y;

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
        y: y,
        x: x,
        path: [],
        status: 'Start'
    };

    // Initialize with the start location
    var queue = [location];


    while (queue.length > 0) {

        // Used for path debugging
        if (shouldSlowPaint) {
            await sleep(1);
        }



        // Remove the first location
        var currentLocation = queue.shift();

        // Explore up
        var newLocation = exploreInDirection(currentLocation, Directions.Up, grid);
        if (newLocation.status === 'Goal') {
            return newLocation;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore right
        var newLocation = exploreInDirection(currentLocation, Directions.Right, grid);
        if (newLocation.status === 'Goal') {
            return newLocation;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore down
        var newLocation = exploreInDirection(currentLocation, Directions.Down, grid);
        if (newLocation.status === 'Goal') {
            return newLocation;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore left
        var newLocation = exploreInDirection(currentLocation, Directions.Left, grid);
        if (newLocation.status === 'Goal') {
            return newLocation;
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
    var y = location.y;
    var x = location.x;

    if (x < 0 ||
        x >= gridSize ||
        y < 0 ||
        y >= gridSize) {
        // location is not on the grid
        return 'Invalid';
    } else if (grid[x][y] === 'Goal') {
        return 'Goal';
    } else if (grid[x][y] !== 'Empty') {
        // location is either a part of the snake or has been visited
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


var exploreInDirection = function (currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var y = currentLocation.y;
    var x = currentLocation.x;

    if (direction === Directions.Up) {
        y += 1;
    } else if (direction === Directions.Right) {
        x += 1;
    } else if (direction === Directions.Down) {
        y -= 1;
    } else if (direction === Directions.Left) {
        x -= 1;
    }

    var newLocation = {
        y: y,
        x: x,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);

    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
        grid[newLocation.x][newLocation.y] = 'Visited';
        // Paint the visited tiles
        if (shouldPaintVisited) {
            document.getElementById(stringFromCords({ x: x, y: y })).classList.add('Visited');
        }
    }

    return newLocation;
};



async function startPathGeneration() {
    console.log('pathfinding')
    generatePathfindingTable();

    console.log(grid.length)


    /*for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            //console.log(x + ' ' + y);
            document.getElementById(stringFromCords({x:x, y:y})).classList.add(grid[x][y]);
        }
    }*/

    var result = await findShortestPath({ x: snake[0].x, y: snake[0].y, }, grid);

    var finalpath = result.path;

    console.log(result);

    console.log('Final path ' + finalpath);

    var current = { x: snake[0].x, y: snake[0].y }
    for (i in finalpath) {
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

        current = next_obj;
        if (shouldPaintPath) {
            document.getElementById(stringFromCords(next_obj)).classList.add("path");
        }
    }
    return finalpath[0];
}


