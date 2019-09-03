'use strict';
const TodoItem = function(id, description, done) {
  this.id = id;
  this.description = description;
  this.done = done;
};

module.exports = TodoItem;
