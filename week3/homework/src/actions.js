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
  if (!todo.description) throw Error('Please write a description to create a new todo!');

  let listToDos =  await readToDos();
  const id = uuid();
  todo.done = false;
  console.log(listToDos, typeof listToDos);
  listToDos[id] = todo;
  console.log(listToDos, typeof listToDos);

  return writeFileWithPromise(TODO_PATH, JSON.stringify(listToDos, null, 2));
}

async function deleteToDo(id) {
  if (!id) {
    throw Error('id is missing!');
  }
  let listToDos = await readToDos();
  delete listToDos.id;
  return listToDos;
}

async function updateToDo(id, newToDo) {
  
  if (!newToDo.description || !id) {
    throw Error('Please write a description and/or the ID of the todo you want to update!');
  }
  let listToDos = await readToDos();
  listToDos.id = newToDo;
  return listToDos;
}

async function markAsDone(id, state) {
  if (!id) {
    throw Error(`Please specify a todo you want to mark by providing it's ID`)
  } 
  else {
    let listToDos = await readToDos();
    const updateDone = (state === 'done');
    listToDos.id.done = updateDone;
  }
  return listToDos;
}

module.exports = {
  createToDo,
  readToDos,
  deleteToDo,
  updateToDo,
  markAsDone,
};
