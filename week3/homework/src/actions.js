'use strict';

const uuid = require('uuid/v4');

function createTodo() {
  // add a todo
  const id = uuid();
  // todo.id = id;
  todoList[id] = todo;
}

function deleteTodo() {

}

function readTodos() {

}

function updateTodo() {
  // update a todo
  todoList.find((todo) => todo.id === id);
}

module.exports = {
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo
};
