'use strict';

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const uuid = require('uuid/v4');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const TODO_PATH = 'todo.json';
const listToDos = readToDos();

function readToDos() {
  return readFileWithPromise(TODO_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => ([]));
}

function createToDo(todo) {
  if (!todo.description) throw Error('Please write a description to create a new todo!');
  
  const id = uuid();
  todo.id = id;
  todo.done = false;

  return writeFileWithPromise(TODO_PATH, JSON.stringify(todo, null, 2));
}

function deleteToDo(id) {
  if(!id) {
    throw Error(`Please specify a todo you want to delete by providing it's ID`)
  } 
  else {
    const remainingToDos = listToDos.map(todo => {
      todo.id != id;
    });
    if (remainingToDos === listToDos){
      throw Error(`Please check the ID provided no such todo is listed`)
    }
  }
  return remainingToDos;
}

function updateToDo(id, newToDo) {
  if (!newToDo.description && !id) {
    throw Error('Please write a description and/or the ID of the todo you want to update!');
  }
  const updatedList = listToDos.map(todo => todo.id != id);
  if (updatedList === listToDos) {
    throw Error(`Please check the ID provided no such todo is listed`)
  }
  return updatedList;
}

function markAsDone(id, state) {
  if (!id) {
    throw Error(`Please specify a todo you want to mark by providing it's ID`)
  } 
  else {
    const updateDone = (state === 'done');

    listToDos.forEach(todo => {
      if (todo.id === id) 
      todo.done = updateDone;
    });
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
