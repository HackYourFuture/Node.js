'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  readTodo: require('./readTodo'),
  clearTodos: require('./clearTodos'),
  markTodo: require('./markDoneStatus'),
};
