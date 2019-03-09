'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  readTodo: require('./readTodo'),
  markAsDone: require('./markAsDone'),
  markAsNotDone: require('./markAsNotDone'),
  clearTodos: require('./clearTodos'),
};
