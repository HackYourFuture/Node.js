'use strict';

const fs = require('fs');
const uuid = require('uuid');

function stringifyAndWrite(arr) {
  fs.writeFileSync('./data.json', JSON.stringify(arr));
}

function readAndParseData() {
  const string = fs.readFileSync('./data.json', 'utf8');
  return JSON.parse(string);
}

function readF() {
  return fs.readFileSync('./data.json', 'utf8');
}

function addToList(toDo) {
  const toDoObject = {
    task: toDo,
    id: uuid(),
    done: false,
  };
  const toDosArray = readAndParseData();
  toDosArray.push(toDoObject);
  stringifyAndWrite(toDosArray);
}

function findIndex(id, arr) {
  return arr.findIndex(obj => obj.id === id);
}

function removeFromList(toDoId) {
  const toDosArray = readAndParseData();
  const index = findIndex(toDoId, toDosArray);
  if (index === -1) {
    return 'The list has no corresponding "to-do element"';
  } else {
    toDosArray.splice(index, 1);
    stringifyAndWrite(toDosArray);
  }
}

function readSingleToDo(toDoId) {
  const toDosArray = readAndParseData();
  const index = findIndex(toDoId, toDosArray);
  if (index === -1) {
    return 'The list has no corresponding "to-do element"';
  } else {
    return JSON.stringify(toDosArray[index]);
  }
}

function markDone(toDoId) {
  const toDosArray = readAndParseData();
  const index = findIndex(toDoId, toDosArray);
  if (index === -1) {
    return 'The list has no corresponding "to-do element"';
  } else {
    if (toDosArray[index].done === 'true') {
      return 'The task is already done.';
    } else {
      toDosArray[index].done = true;
      stringifyAndWrite(toDosArray);
    }
  }
}

function markUnDone(toDoId) {
  const toDosArray = readAndParseData();
  const index = findIndex(toDoId, toDosArray);
  if (index === -1) {
    return 'The list has no corresponding "to-do element"';
  } else {
    if (toDosArray[index].done === 'false') {
      return 'The task is already not done.';
    } else {
      toDosArray[index].done = false;
      stringifyAndWrite(toDosArray);
    }
  }
}

function updateList(toDoId, updatedTask) {
  const toDosArray = readAndParseData();
  const index = findIndex(toDoId, toDosArray);
  if (index === -1) {
    return 'The list has no corresponding "to-do element"';
  } else {
    toDosArray[index].task = updatedTask;
    stringifyAndWrite(toDosArray);
  }
}

module.exports = {
  addToList,
  removeFromList,
  stringifyAndWrite,
  readF,
  markUnDone,
  markDone,
  readSingleToDo,
  updateList,
};
