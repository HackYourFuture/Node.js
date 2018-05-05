'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos:  require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  getTodo: require('./getTodo'),
  clearTodos: require('./clearTodos'),
  markAsDoneTodo: require('./markAsDoneTodo'),
  markAsNotDoneTodo: require('./markAsNotDoneTodo')
};
