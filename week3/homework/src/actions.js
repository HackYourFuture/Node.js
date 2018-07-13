/*
'use strict';

const uuid = require('uuid/v4');
const list = {};

const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const { promisify } = require('util');
const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);
// app.use(Express.json());
const TODO_PATH = 'todo.json';
function readTodos() {
  return readFile(TODO_PATH, 'utf8').then(
    JSON.parse, () => []
  );
}

async function createTodo(todo) {
  if (!todo.description) throw new Error('needs description');

  const id = uuid();
  list[id] = todo;
  console.log(id);
  // todoList[id] = todo;
  return list;
}

function deleteTodo() {

}

function readTodos() {

}

function updateTodo() {
  // update a todo
  // todoList.find((todo) => todo.id === id);
}

module.exports = {
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo
};
*/
