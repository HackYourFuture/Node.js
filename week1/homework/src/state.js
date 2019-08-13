class State {
  constructor() {
    this.state = 10;
  }
  add() {
    this.state++;
  }
  subtract() {
    this.state--;
  }
  reset() {
    this.state = 10;
  }
}

module.exports = State;
