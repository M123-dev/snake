console.log("Init");

const intervalTime = 100;

const startPos = Math.round(tableSize / 2);

const snakeHead = "snakeHead";
const snakeBody = "snakeBody";
const apple = "apple";

let mainThreat;

// x : y
let snake = [
  { x: startPos, y: startPos + 2 },
  { x: startPos, y: startPos + 1 },
  { x: startPos, y: startPos },
];

// Enums aren't supported in vanilla js
const Directions = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
};

let direction = Directions.Up;
let apple_obj;
let isDead = false;
let score = 0;
let running = false;

function start() {
  if (mainThreat === undefined) {
    mainThreat = setInterval(tick, intervalTime);
  }
}

function stop() {
  if (mainThreat !== undefined) {
    clearInterval(mainThreat);
    mainThreat = undefined;
  }
}

function stringFromCords(cords) {
  return `${cords.x}:${cords.y}`;
}

function createApple() {
  const x = Math.floor(Math.random() * tableSize);
  const y = Math.floor(Math.random() * tableSize);

  apple_obj = { x: x, y: y };
  let string = stringFromCords(apple_obj);

  let accept = true;
  for (let obj in snake) {
    let compare_string = stringFromCords(obj);
    // if snake is above apple don't accept
    if (compare_string == string) {
      accept = false;
      break;
    }
  }

  if (!accept) {
    // Recursive, if snake is on current apple try another apple cord
    createApple();
    return;
  }
  console.log(
    `New apple pos: ${apple_obj.x}:${apple_obj.y}, with score: ${score}`
  );
  apple_element = document.getElementById(stringFromCords(apple_obj));

  if (apple_element == null) {
    createApple();
  } else {
    apple_element.className = apple;
  }
}



function isCordObjEqual(one, two) {
  return one.x == two.x && one.y == two.y;
}

createApple();

// Color initial snake
for (let i = 0; i < snake.length; i++) {
  document.getElementById(stringFromCords(snake[i])).className = snakeBody;
}
document.getElementById(stringFromCords(snake[0])).className = snakeHead;

// Change direction
window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    
    /*if(event.key !== " " && event.key !== "f"){
      start();
    }*/
    

    switch (event.key) {
      case "ArrowDown":
        if (direction != Directions.Up) {
          direction = Directions.Down;
        }
        start();
        break;
      case "ArrowUp":
        if (direction != Directions.Down) {
          direction = Directions.Up;
        }
        start();
        break;
      case "ArrowLeft":
        if (direction != Directions.Right) {
          direction = Directions.Left;
        }
        start();
        break;
      case "ArrowRight":
        if (direction != Directions.Left) {
          direction = Directions.Right;
        }
        start();
        break;
      case "f":
        startPathGeneration();
        break;
      case "p":
        if (mainThreat !== undefined) {
          stop();
        } else {
          start();
        }
        break;
      default:
        return;
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);


function tick() {
  if (isDead) {
    stop();
    document.getElementById(
      "body"
    ).innerHTML = `<p>Dead with score ${score}</p>`;
  }

  let current = snake[0];
  let next_obj;

  switch (direction) {
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

  // Outside of boundary
  if (
    next_obj.x >= tableSize ||
    next_obj.y >= tableSize ||
    next_obj.x < 0 ||
    next_obj.y < 0
  ) {
    console.log("Death by running out of boundary");
    isDead = true;
    return;
  }

  // If running inside yourself
  snake.forEach((e) => {
    if (isCordObjEqual(e, next_obj)) {
      console.log("Death by running inside yourself");
      isDead = true;
      return;
    }
  });

  // Add the next part at index 0
  //           index, 0 (for insert), value
  snake.splice(0, 0, next_obj);

  document.getElementById(stringFromCords(snake[0])).className = snakeHead;
  document.getElementById(stringFromCords(snake[1])).className = snakeBody;
  document.getElementById("score").innerHTML = score;

  if (isCordObjEqual(next_obj, apple_obj)) {
    score++;
    createApple();
  } else {
    // Remove last part of snake
    document
      .getElementById(stringFromCords(snake[snake.length - 1]))
      .classList.remove(snakeBody);
    snake.pop();
  }
}
