'use strict';

const low = require('lowdb');
const nanoid = require('nanoid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const state = {
  todos: []
};

db.defaults(state).write();

const getTodos = () => db.get('todos');
const getTodo = id => getTodos().find({ id });

const get = () => getTodos().value();
const getOne = id => getTodo(id).value();

const add = todo => {
  return db
    .get('todos')
    .push({ id: nanoid(), todo, done: false })
    .write();
};

const update = (id, todo) => {
  return db
    .get('todos')
    .find({ id })
    .assign({ todo })
    .write();
};

const done = id => {
  return db
    .get('todos')
    .find({ id })
    .assign({ done: true })
    .write();
};

const notDone = id => {
  return db
    .get('todos')
    .find({ id })
    .assign({ done: false })
    .write();
};

const remove = id => {
  return db
    .get('todos')
    .remove({ id })
    .write();
};

const removeAll = todos => {
  return db
    .get('todos')
    .remove(todos)
    .write();
};

module.exports = {
  get,
  getOne,
  add,
  update,
  done,
  notDone,
  remove,
  removeAll
};
