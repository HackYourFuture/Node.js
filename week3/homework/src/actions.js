'use strict';

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const uuid = require('uuid/v4');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const TODO_PATH = 'todo.json';

function readToDos() {
  return readFileWithPromise(TODO_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => ({}));
}

async function createToDo(todo) {
  if (!todo.description) {
    throw Error('Please write a description to create a new todo!');
  }

  let listToDos = await readToDos();
  const id = uuid();
  todo.done = false;
  listToDos[id] = todo;

  return writeFileWithPromise(TODO_PATH, JSON.stringify(listToDos, null, 2));
}

async function deleteToDo(id) {
  if (!id) {
    throw Error('id is missing!');
  }
  let listToDos = await readToDos();
  delete listToDos[id];
  return writeFileWithPromise(TODO_PATH, JSON.stringify(listToDos, null, 2));
}

async function resetToDos() {
  let listToDos = await readToDos();
  return writeFileWithPromise(TODO_PATH, JSON.stringify({}, null, 2));
}

async function updateToDo(id, newToDo) {
  if (!newToDo) {
    throw Error('update is missing!');
  }
  newToDo.done = false;
  let listToDos = await readToDos();
  listToDos[id] = newToDo.todo;
  return writeFileWithPromise(TODO_PATH, JSON.stringify(listToDos, null, 2));
}

async function markAsDoneNotDone(id, state) {
  if (!id) {
    throw Error(`Please specify a todo you want to mark by providing it's ID`);
  }

  let listToDos = await readToDos();
  const updateDone = (state === 'done');
  listToDos[id].done = updateDone;
  return writeFileWithPromise(TODO_PATH, JSON.stringify(listToDos, null, 2));
}

module.exports = {
  createToDo,
  readToDos,
  deleteToDo,
  resetToDos,
  updateToDo,
  markAsDoneNotDone
};