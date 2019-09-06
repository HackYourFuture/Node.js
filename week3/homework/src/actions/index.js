'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),

  // under this line: homework assignment 4 more actions
  clearTodos: require('./clearTodos'),
  readTodo: require('./readTodo'),
  markAsDone: require('./markAsDone'),
  markAsNotDone: require('./markAsNotDone'),
};
