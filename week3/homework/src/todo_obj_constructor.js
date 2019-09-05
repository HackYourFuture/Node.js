'use strict';
const TodoItem = function(id, description, boolean) {
  this.id = id;
  this.description = description;
  this.done = boolean;
};

module.exports = TodoItem;
