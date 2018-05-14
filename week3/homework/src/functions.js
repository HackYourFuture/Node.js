'use strict';
const express = require('express');

const uuid = require('uuid/v4');

const app = express();

const {
  readFile: _readFile,
  writeFile: _writeFile
} = require('fs');

const {
  promisify
} = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);



//USE BUILT-IN JSON middleware to automatically parse JSON
app.use(express.json());

const TODO_FILE = 'todo.json';

function readTodos() {
  return readFile(TODO_FILE, 'utf-8').then(JSON.parse, () => []);
}

function writeTodos(todos) {
  return writeFile(TODO_FILE, JSON.stringify(todos));
}

//Find Todo
async function findTodo(req) {

  const id = req.params.id;
  const todos = await readTodos();
  const todo = todos.find(todos => todos.id === id);
  const done = req.body.done;
  if (todo === 'undefined' || !todo || todo === null) {
    throw new Error('No ID or Null ID');
  } else {
    return [
      todo,
      todos
    ];
  }

}

//MarkTodo Function
async function markTodo(req, res, doneFlag) {
  const [
    todo,
    todos
  ] = await findTodo(req).catch(err => {
    return res.json({
      'error': err
    });
  });

  todo.done = doneFlag;
  await writeTodos(todos);
  res.json(todos);
}

module.exports = {

  findTodo,
  markTodo,
  readTodos,
  writeTodos,
  app,
  uuid

};