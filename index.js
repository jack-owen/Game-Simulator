#!/usr/bin/env node

const readline = require("readline");
const game = require("./ToyRobotSimulator");

function Runner() {
  var rl = readline.createInterface({
    input: process.stdin,
    prompt: ">",
  });
  let robot = { x_coordinate: null, y_coordinate: null, facing: null };
  rl.on("line", (input) => {
    res = game.ToyRobotSimulator(robot, input);
    if (res != undefined) {
      rl.close(); // close input steam and exit.
      console.log("Output:", res);
    }
  });
}

function welcome() {
  console.log("\x1b[32m" + "----------------------------------");
  console.log("Welcome to the Toy Robot Simulator");
  console.log("You're playing on a 5x5 tabletop");
  console.log("Available commands:");
  console.log("PLACE X,Y,FACING DIRECTION");
  console.log("MOVE");
  console.log("LEFT");
  console.log("RIGHT");
  console.log("REPORT");
  console.log("----------------------------------");
  console.log("\x1b[37m");
}

welcome();
Runner();
