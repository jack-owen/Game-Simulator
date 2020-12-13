<h1 align="center">
  Toy Robot Simulator
</h1>

A Node.js Toy Robot Simulator application of a toy robot moving on a square tabletop, of dimensions 5 x 5. Jest unit tests are provided for testing the application functions, along with illegal edge cases that check the application wouldn't allow the robot to exceed to 5x5 board dimensions, etc.

The Node app starts from the index.js file to handle the user input stream. The game functionality runs in ToyRobotSimulator.js

## 🚀 Quick start

1. **Install**

    Install Node.js

2. **Play!**

    Start application with the CLI using the node command
   
    ```shell
    node .
    ```

    **Example inputs**

    <ol type="a">
        <li>PLACE 0,0,NORTH
            <br>
            MOVE
            <br>
            REPORT
            <br>
            Output: 0,0,NORTH
        </li>
        <br>
        <li>PLACE 0,0,NORTH
            <br>
            LEFT
            <br>
            REPORT
            <br>
            Output: 0,0,WEST
        </li>
        <br>
        <li>PLACE 1,2,EAST
            <br>
            MOVE
            <br>
            MOVE
            <br>
            LEFT
            <br>
            MOVE
            <br>
            REPORT
            <br>
            Output: 3,3,NORTH
        </li>
    </ol>


3.  **Install Jest testing framework**

    Install the Jest dependency

    ```shell
    npm install
    ```

4.  **Run the tests**

    ```shell
    npm test
    ```

    Tests include all desired commands function properly and all potential edge cases print an error to the console or are correctly ignored by the game.