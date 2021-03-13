import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathO: [[0, 0]],
      flagStart: false,
    };
  }

  renderSquare(x, y) {
    var { pathO, flagStart } = this.state;

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }

  begin() {
    console.log("begin");
  }

  render() {
    var { pathO, flagStart } = this.state;
    const elementS = [];
    const elementZ = [];
    const screenSize = 25;

    const aray = [];
    const bray = [];
    var a;
    var b;
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
        <button id="largebutton" onClick={() => this.begin()}>
          Click to Start
        </button>
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
        Hello World
        <p>More!</p>
        {entireThingz}
      </div>
    );
  }
}

export default App;
