const uuid = require('uuid/v4');
class Todo {
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.isCompleted = false;
  }
}

module.exports = Todo;
