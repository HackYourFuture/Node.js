'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const nanoid = require('nanoid');
const state = { todos: [] };
db.defaults(state).write();

function getToDos() {
  return db.get('todos');
}
function getTodo(id) {
  return getToDos().find({ id });
}
function get() {
  return getToDos().value();
}
function getItem(id) {
  return getTodo(id).value();
}

function done(id) {
  return db
    .get('todos')
    .find({ id })
    .assign({ done: true })
    .write();
}

function notDone(id) {
  return db
    .get('todos')
    .find({ id })
    .assign({ done: false })
    .write();
}

function updateToDo(id, newId) {
  return db
    .get('todos')
    .find({ id })
    .assign({ todo: newId })
    .write();
}
function addToDo(todo) {
  return db
    .get('todos')
    .push({ id: nanoid(), todo: todo, done: false })
    .write();
}
function removeToDo(id) {
  return db
    .get('todos')
    .remove({ id })
    .write();
}
function removeAll(todos) {
  return db
    .get('todos')
    .remove(todos)
    .write();
}

module.exports = {
  addToDo,
  get,
  getItem,
  done,
  notDone,
  updateToDo,
  removeToDo,
  removeAll
};
