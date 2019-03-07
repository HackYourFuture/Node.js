const low = require('lowdb');
const nanoid = require('nanoid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('todos.json');
const todos = low(adapter);
const state = {
  todos: [],
};

todos.defaults(state).write();

const getTodos = () => todos.get('todos');
const getTodo = id => getTodos().find({ id });
const get = () => getTodos().value();
const getOne = id => getTodo(id).value();

const add = todo => {
  return todos
    .get('todos')
    .push({ id: nanoid(), todo, done: false })
    .write();
};

const update = (id, todo) => {
  return todos
    .get('todos')
    .find({ id })
    .assign({ todo })
    .write();
};
const done = (id, done) => {
  return todos
    .get('todos')
    .find({ id })
    .assign({ done: true })
    .write();
};
const notDone = (id, done) => {
  return todos
    .get('todos')
    .find({ id })
    .assign({ done: false })
    .write();
};
const remove = id => {
  return todos
    .get('todos')
    .remove({ id })
    .write();
};
const clear = todo => {
  return todos
    .get('todos')
    .remove(todo)
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
  clear,
};
