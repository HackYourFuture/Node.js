'use strict';

// CRUD actions
module.exports = {
  createTodo: require('./createTodo'),
  readTodos: require('./readTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  clearTodoList: require('./clearTodoList'),
  readSingalTodo: require('./readSingalTodo'),
  markAsDone: require('./markAsDone'),
  markAsNotDone: require('./markAsNotDone')
};
