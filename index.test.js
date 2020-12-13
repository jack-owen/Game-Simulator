const game = require("./ToyRobotSimulator");

let robot;
beforeEach(() => {
  robot = { x_coordinate: null, y_coordinate: null, facing: null };
});

test("Test PLACE robot command", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,NORTH");
  game.ToyRobotSimulator(robot, "PLACE 3,2,SOUTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("3,2,SOUTH");
});

test("Test REPORT with no robot on tabletop", () => {
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
});

test("Test MOVE command", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,2,NORTH");
  game.ToyRobotSimulator(robot, "PLACE 1,1,EAST");
  game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("2,1,EAST");
  game.ToyRobotSimulator(robot, "PLACE 5,5,SOUTH");
  game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("5,4,SOUTH");
  game.ToyRobotSimulator(robot, "PLACE 5,5,WEST");
  game.ToyRobotSimulator(robot, "MOVE");

  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("4,5,WEST");
});

test("Test 10x MOVE north commands don't cause robot to exceed tabletop dimensions", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  for (let i = 0; i < 6; i++) game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,5,NORTH");
});

test("Test 10x MOVE east commands don't cause robot to exceed tabletop dimensions", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,EAST");
  for (let i = 0; i < 6; i++) game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("5,1,EAST");
});

test("Test 10x MOVE south commands don't cause robot to exceed tabletop dimensions", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,5,SOUTH");
  for (let i = 0; i < 6; i++) game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,SOUTH");
});

test("Test 10x MOVE west commands don't cause robot to exceed tabletop dimensions", () => {
  game.ToyRobotSimulator(robot, "PLACE 5,1,WEST");
  for (let i = 0; i < 6; i++) game.ToyRobotSimulator(robot, "MOVE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,WEST");
});

test("Test robot rotate RIGHT command", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "RIGHT");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,EAST");
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "RIGHT");
  game.ToyRobotSimulator(robot, "RIGHT");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,SOUTH");
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "RIGHT");
  game.ToyRobotSimulator(robot, "RIGHT");
  game.ToyRobotSimulator(robot, "RIGHT");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,WEST");
});

test("Test robot rotate LEFT command", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "LEFT");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,WEST");
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "LEFT");
  game.ToyRobotSimulator(robot, "LEFT");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,SOUTH");
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "LEFT");
  game.ToyRobotSimulator(robot, "LEFT");
  game.ToyRobotSimulator(robot, "LEFT");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,EAST");
});

test("Test multiple PLACE commands", () => {
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTH");
  game.ToyRobotSimulator(robot, "PLACE 4,3,SOUTH");
  game.ToyRobotSimulator(robot, "PLACE 3,2,EAST");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("3,2,EAST");
});

test("Test invalid coordinates for PLACE command", () => {
  const originalError = console.error; // hide expected console errors
  console.error = jest.fn();
  game.ToyRobotSimulator(robot, "PLACE 6,1,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE 0,1,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE -1,1,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE 1,6,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE 1,0,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE 1,-1,NORTH");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  console.error = originalError;
});

test("Test invalid facing direction for PLACE command", () => {
  const originalError = console.error; // hide expected console errors
  console.error = jest.fn();
  game.ToyRobotSimulator(robot, "PLACE 1,1,NORTHPOLE");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE 4,3,SOU");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  game.ToyRobotSimulator(robot, "PLACE 3,2,EASTER");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe(undefined);
  console.error = originalError;
});

test("Test lowercase command aliases", () => {
  game.ToyRobotSimulator(robot, "place 1,1,north");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,NORTH");
  game.ToyRobotSimulator(robot, "place 1,1,north");
  game.ToyRobotSimulator(robot, "move");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,2,NORTH");
  game.ToyRobotSimulator(robot, "place 1,1,north");
  game.ToyRobotSimulator(robot, "left");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,WEST");
  game.ToyRobotSimulator(robot, "place 1,1,north");
  game.ToyRobotSimulator(robot, "right");
  expect(game.ToyRobotSimulator(robot, "REPORT")).toBe("1,1,EAST");
});
