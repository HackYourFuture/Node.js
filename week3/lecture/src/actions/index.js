'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  readTodo: require('../../../homework/src/actions/readTodo'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  clearTodos: require('../../../homework/src/actions/clearTodos'),
  markAsDone: require('../../../homework/src/actions/markAsDone'),
  markAsNotDone: require('../../../homework/src/actions/markAsNotDone'),
};
