'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),

  readTodo: require('./readTodo'),
  deleteTodos: require('./deleteTodos'),
  markAsDone: require('./markAsDone'),
  markAsNotDone: require('./markAsNotDone'),
};
