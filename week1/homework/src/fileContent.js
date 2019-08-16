function State(num) {
  this.state = num;
  this.add = function() {
    this.state++;
  };
  this.subtract = function() {
    this.state--;
  };
  this.reset = function() {
    this.state = 10;
  };
}
module.exports = State;
