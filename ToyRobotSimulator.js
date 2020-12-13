#!/usr/bin/env node

const ToyRobotSimulator = function (robot, input) {
  // split input string by command and parameters
  input = input.toUpperCase();
  parameters = input.split(/[ ,]+/);
  command = parameters[0];
  switch (command) {
    case "PLACE":
      const x = parameters[1];
      const y = parameters[2];
      const f = parameters[3];
      if (isValidParameters(x, y, f)) {
        placeRobot(x, y, f);
      }
      break;
    case "MOVE":
      move();
      break;
    case "LEFT":
      rotate("left");
      break;
    case "RIGHT":
      rotate("right");
      break;
    case "REPORT":
      if (isRobotOnTable()) return report();
      break;
    case "":
      break;
    default:
      console.error("command not recognised");
  }

  function placeRobot(x, y, f) {
    robot.x_coordinate = parseInt(x);
    robot.y_coordinate = parseInt(y);
    robot.facing = f;
  }

  function move() {
    // Check if robot move would fall off tabletop
    if (!isRobotOnTable) return;
    if (robot.facing == "NORTH" && robot.y_coordinate < 5) robot.y_coordinate++;
    else if (robot.facing == "EAST" && robot.x_coordinate < 5)
      robot.x_coordinate++;
    else if (robot.facing == "SOUTH" && robot.y_coordinate > 1)
      robot.y_coordinate--;
    else if (robot.facing == "WEST" && robot.x_coordinate > 1)
      robot.x_coordinate--;
  }

  function rotate(direction) {
    if (!isRobotOnTable) return;
    if (direction == "left") {
      switch (robot.facing) {
        case "NORTH":
          robot.facing = "WEST";
          break;
        case "EAST":
          robot.facing = "NORTH";
          break;
        case "SOUTH":
          robot.facing = "EAST";
          break;
        case "WEST":
          robot.facing = "SOUTH";
      }
    } else if (direction == "right") {
      switch (robot.facing) {
        case "NORTH":
          robot.facing = "EAST";
          break;
        case "EAST":
          robot.facing = "SOUTH";
          break;
        case "SOUTH":
          robot.facing = "WEST";
          break;
        case "WEST":
          robot.facing = "NORTH";
      }
    }
  }

  function report() {
    return (
      "Output:",
      robot.x_coordinate + "," + robot.y_coordinate + "," + robot.facing
    );
  }

  function isValidParameters(x, y, f) {
    // check for illegal sequence of parameters (too little, too many, and data types, illegal direction) for PLACE command
    let valid = true;
    if (f) f = f.toUpperCase();
    if (f != "NORTH" && f != "EAST" && f != "SOUTH" && f != "WEST") {
      console.error("invalid facing direction");
      valid = false;
    }
    if (isNaN(x) || x < 1 || x > 5) {
      console.error("invalid x coordinate");
      valid = false;
    }
    if (isNaN(y) || y < 1 || y > 5) {
      console.error("invalid y coordinate");
      valid = false;
    }
    return valid;
  }

  function isRobotOnTable() {
    return robot.x_coordinate == null ||
      robot.x_coordinate == null ||
      robot.facing == null
      ? false
      : true;
  }
};

module.exports.ToyRobotSimulator = ToyRobotSimulator;
