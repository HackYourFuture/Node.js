'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  readTodo: require('./readTodo'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  clearTodos: require('./clearTodos'),
  markAsDone: require('./markAsDone'),
  markAsNotDone: require('./markAsNotDone')
};
