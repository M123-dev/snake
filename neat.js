// https://github.com/ahmetfaslantas/NEAT-JS

let birds = [];
let pipes = [];
let counter = 0;
let neat;

let config = {
  model: [
    { nodeCount: tableSize ^ 2, type: "input" },
    { nodeCount: 4, type: "output", activationfunc: activation.SOFTMAX },
  ],
  mutationRate: 0.1,
  crossoverMethod: crossover.RANDOM,
  mutationMethod: mutate.RANDOM,
  populationSize: 1,
};

function setup() {
  neat = new NEAT(config);
  neat.doGen();
}

function round() {
  neat.setInputs(getData(), 0);

  neat.feedForward();

  let desicion = neat.getDesicions();

  console.log("Neat desicion: " + desicion);

  if (isDead) {
    neat.setFitness(score, 0);
    neat.doGen();
  }
}

function getData() {
  let data = [];

  for (let y = tableSize - 1; y >= 0; y--) {
    let inner_data = [];
    for (let x = 0; x < tableSize; x++) {
      inner_data.push(
        stringFromCords({ x: x, y: y }) +
          " " +
          document
            .getElementById(stringFromCords({ x: x, y: y }))
            .classList.toString()
      );
    }
    data.push(inner_data);
  }

  return data;
}

setup();
round();

/*
neat.doGen(); // Does one generation with mutation and crossover.
neat.setFitness(fitness, index);  // Sets a creature's score. This will then be normalized for actual fitness value.
neat.bestCreature(); // Returns the best creature from the last generation.
neat.setInputs(array, index); // Sets the inputs of the creature indexed as "index".
neat.getDesicions(); // Returns every creature's desicion in an array.
neat.feedForward();  // Feeds forward every creatıre's neural network.
neat.export(); // Exports all creatures for later training (See import() below) You can also pass an index to this function.
neat.import(data); // Imports creature(s) previously exported.
*/
