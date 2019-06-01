'use strict';

const low = require('lowdb');
const nanoid = require('nanoid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const state = {
  todos: [],
};

db.defaults(state).write();

const getTodos = db.get('todos');

class Actions {
  static get() {
    return getTodos.value();
  }

  static getOne(id) {
    return getTodos.find({ id }).value();
  }

  static add(task) {
    return getTodos.push({ id: nanoid(), task: task, done: false }).write();
  }

  static done(id) {
    return getTodos
      .find({ id })
      .assign({ done: true })
      .write();
  }

  static notDone(id) {
    return getTodos
      .find({ id })
      .assign({ done: false })
      .write();
  }

  static update(id, newId) {
    return getTodos
      .find({ id })
      .assign({ task: newId })
      .write();
  }

  static remove(id) {
    return getTodos.remove({ id }).write();
  }

  static removeAll(todos) {
    return getTodos.remove(todos).write();
  }
}

const { add, getOne, done, notDone, update, remove, removeAll, get } = Actions;

module.exports = {
  add,
  get,
  getOne,
  done,
  notDone,
  update,
  remove,
  removeAll,
};
