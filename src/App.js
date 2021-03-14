import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    this.state = {
      pathO: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      flagStart: false,
      screenSize: 25,
      food: [
        [randomNumber(3, 25), randomNumber(3, 25)],
        [randomNumber(3, 25), randomNumber(3, 25)],
        [randomNumber(3, 25), randomNumber(3, 25)],
      ],
      spot: [0, 0],
      trailingSpot: [[0, 0]],
      foodAmount: 0,
      speed: [400, 250, 200, 175, 150, 125, 100, 75, 50],
    };
  }

  speedCalculation() {
    var { speed, foodAmount } = this.state;
    var x;
    if (foodAmount < 2) {
      x = 0;
    } else if (foodAmount < 5) {
      x = 1;
    } else if (foodAmount < 8) {
      x = 2;
    } else if (foodAmount < 11) {
      x = 3;
    } else if (foodAmount < 14) {
      x = 4;
    } else if (foodAmount < 18) {
      x = 5;
    } else if (foodAmount < 22) {
      x = 6;
    } else if (foodAmount < 27) {
      x = 7;
    } else if (foodAmount < 33) {
      x = 8;
    }
    return speed[x];
  }

  begin() {
    console.log("begin");
    this.setState({ flagStart: true });
    this.originInterval();
  }

  originInterval() {
    var interval = setInterval(this.goFast.bind(this), this.speedCalculation());
    this.setState({ interval: interval });
  }

  downInterval() {
    var interval = setInterval(this.goDown.bind(this), this.speedCalculation());
    this.setState({ interval: interval });
  }

  leftInterval() {
    var interval = setInterval(this.goLeft.bind(this), this.speedCalculation());
    this.setState({ interval: interval });
  }

  upInterval() {
    var interval = setInterval(this.goUp.bind(this), this.speedCalculation());
    this.setState({ interval: interval });
  }

  rightInterval() {
    var interval = setInterval(
      this.goRight.bind(this),
      this.speedCalculation()
    );
    this.setState({ interval: interval });
  }

  goFast() {
    if (this.state.spot[0] < this.state.screenSize - 1) {
      this.setState({
        spot: [this.state.spot[0] + 1, this.state.spot[1]],
        pathO: [...this.state.pathO, this.state.spot],
      });
      console.log(this.state.spot);
    } else
      this.setState({
        spot: [0, this.state.spot[1]],
        pathO: [...this.state.pathO, this.state.spot],
      });
  }

  goDown() {
    if (this.state.spot[1] < this.state.screenSize - 1) {
      this.setState({
        spot: [this.state.spot[0], this.state.spot[1] + 1],
        pathO: [...this.state.pathO, this.state.spot],
      });
      //  console.log(this.state.spot);
    } else
      this.setState({
        spot: [this.state.spot[0], 0],
        pathO: [...this.state.pathO, this.state.spot],
      });
  }

  goLeft() {
    if (this.state.spot[0] > 0) {
      this.setState({
        spot: [this.state.spot[0] - 1, this.state.spot[1]],
        pathO: [...this.state.pathO, this.state.spot],
      });
      // console.log(this.state.spot);
    } else
      this.setState({
        spot: [this.state.screenSize - 1, this.state.spot[1]],
        pathO: [...this.state.pathO, this.state.spot],
      });
  }

  goUp() {
    if (this.state.spot[1] > 0) {
      this.setState({
        spot: [this.state.spot[0], this.state.spot[1] - 1],
        pathO: [...this.state.pathO, this.state.spot],
      });
      // console.log(this.state.spot);
    } else
      this.setState({
        spot: [this.state.spot[0], this.state.screenSize - 1],
        pathO: [...this.state.pathO, this.state.spot],
      });
  }

  goRight() {
    if (this.state.spot[0] < this.state.screenSize - 1) {
      this.setState({
        spot: [this.state.spot[0] + 1, this.state.spot[1]],
        pathO: [...this.state.pathO, this.state.spot],
      });
      // console.log(this.state.spot);
    } else
      this.setState({
        spot: [0, this.state.spot[1]],
        pathO: [...this.state.pathO, this.state.spot],
      });
  }

  stop() {
    clearInterval(this.state.interval);
    console.log(this.state.spot);
  }

  downMove() {
    clearInterval(this.state.interval);
    console.log(this.state.spot);
    this.downInterval();
  }

  upMove() {
    clearInterval(this.state.interval);
    console.log(this.state.spot);
    this.upInterval();
  }

  leftMove() {
    clearInterval(this.state.interval);
    console.log(this.state.spot);
    this.leftInterval();
  }

  rightMove() {
    clearInterval(this.state.interval);
    console.log(this.state.spot);
    this.rightInterval();
  }

  renderControl(x, y) {
    if (
      (x == 0 && y == 0) |
      (x == 2 && y == 0) |
      (x == 0 && y == 2) |
      (x == 2 && y == 2)
    ) {
      return <button class="bgrey" codeX={x} codeY={y}></button>;
    } else if (x == 1 && y == 0) {
      return (
        <button
          class="bdirection"
          codeX={x}
          codeY={y}
          onClick={() => this.upMove()}
        ></button>
      );
    } else if (x == 0 && y == 1) {
      return (
        <button
          class="bdirection"
          codeX={x}
          codeY={y}
          onClick={() => this.leftMove()}
        ></button>
      );
    } else if (x == 2 && y == 1) {
      return (
        <button
          class="bdirection"
          codeX={x}
          codeY={y}
          onClick={() => this.rightMove()}
        ></button>
      );
    } else if (x == 1 && y == 2) {
      return (
        <button
          class="bdirection"
          codeX={x}
          codeY={y}
          onClick={() => this.downMove()}
        ></button>
      );
    } else return <button class="bdirection" codeX={x} codeY={y}></button>;
  }

  foodFound() {
    console.log("YOUFOUNDFOODs");
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    this.setState({
      food: [
        [randomNumber(3, 25), randomNumber(3, 25)],
        [randomNumber(3, 25), randomNumber(3, 25)],
        [randomNumber(3, 25), randomNumber(3, 25)],
      ],
      foodAmount: this.state.foodAmount + 1,
    });
  }

  renderSquare(x, y) {
    var { pathO, food, spot, foodAmount } = this.state;
    var maxTail = { foodAmount };

    /* function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }*/
    // console.log(food);
    // console.log(food[0][1]);
    // console.log(food[0][0]);

    if (x == spot[0] && y == spot[1]) {
      return <button class="b2" codeX={x} codeY={y}></button>;
    }

    if (
      x == pathO[pathO.length - 1 < 0 ? 0 : pathO.length - 1][0] &&
      y == pathO[pathO.length - 1 < 0 ? 0 : pathO.length - 1][1]
    ) {
      return <button class="b2" codeX={x} codeY={y}></button>;
    }

    if (
      foodAmount == 2 &&
      x ==
        pathO[
          pathO.length - foodAmount < 0 ? 0 : pathO.length - foodAmount
        ][0] &&
      y ==
        pathO[pathO.length - foodAmount < 0 ? 0 : pathO.length - foodAmount][1]
    ) {
      return <button class="b2" codeX={x} codeY={y}></button>;
    }

    if (foodAmount > 0) {
      for (var t = 1; t < foodAmount * 3; t++) {
        if (
          x ==
            pathO[
              pathO.length - foodAmount * 3 + t < 0
                ? 0
                : pathO.length - foodAmount * 3 + t
            ][0] &&
          y ==
            pathO[
              pathO.length - foodAmount * 3 + t < 0
                ? 0
                : pathO.length - foodAmount * 3 + t
            ][1]
        ) {
          return <button class="b2" codeX={x} codeY={y}></button>;
        }
      }
    }

    if (spot[0] == food[0][0] && spot[1] == food[0][1]) {
      this.foodFound();
    }

    if (spot[0] == food[1][0] && spot[1] == food[1][1]) {
      this.foodFound();
    }

    if (spot[0] == food[2][0] && spot[1] == food[2][1]) {
      this.foodFound();
    }

    if (x == food[0][0] && y == food[0][1]) {
      return <button class="bplus" codeX={x} codeY={y}></button>;
    }
    if (x == food[1][0] && y == food[1][1]) {
      return <button class="bplus" codeX={x} codeY={y}></button>;
    }
    if (x == food[2][0] && y == food[2][1]) {
      return <button class="bplus" codeX={x} codeY={y}></button>;
    }

    return <button class="b1" codeX={x} codeY={y}></button>;
  }

  render() {
    var { pathO, flagStart, foodAmount } = this.state;
    const elementS = [];
    const elementZ = [];
    const screenSize = 25;

    const aray = [];
    const bray = [];
    var a;
    var b;
    for (a = 0; a < 3; a++) {
      for (b = 0; b < 3; b++) {
        aray.push(<span>{this.renderControl(b, a)}</span>);
      }
      bray.push(
        <div className="newLineC">
          {aray.map((value, index) => {
            return <span key={index}>{value}</span>;
          })}
        </div>
      );
      for (b = 0; b < 9; b++) {
        aray.pop();
      }
    }
    //control section

    var x;
    var y;
    for (y = 0; y < screenSize; y++) {
      for (x = 0; x < screenSize; x++) {
        elementS.push(this.renderSquare(x, y));
      }
      elementZ.push(
        <div className="newLine">
          {elementS.map((value, index) => {
            return value;
          })}
        </div>
      );
      for (x = 0; x < screenSize; x++) {
        elementS.pop();
      }
    }

    const startButton = (
      <div>
        <h1>SNAKE GAME</h1>
        <button id="largebutton" onClick={() => this.begin()}>
          Click to Start
        </button>
        <button id="largebutton" onClick={() => this.stop()}>
          Click to Stop
        </button>
        <p>Your snake has found {foodAmount} food</p>
      </div>
    );

    const entireThingz = (
      <div className="entireThing">
        {startButton}

        <div className="directionLand">
          {bray.map((value, index) => {
            return <span key={index}>{value}</span>;
          })}
        </div>
        <div id="mazeSpot">
          {elementZ.map((value, index) => {
            return <span key={index}>{value}</span>;
          })}
        </div>
      </div>
    );

    return (
      <div>
        <div></div>
        {entireThingz}
      </div>
    );
  }
}

export default App;
