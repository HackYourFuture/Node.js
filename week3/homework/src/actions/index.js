'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  clearTodoList: require('./clearTodoList'),
  readSingleTodo: require('./readSingleTodo'),
  markAsDone: require('./markAsDone'),
  markAsNotDone: require('./markAsNotDone')
};
