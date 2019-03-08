const low = require('lowdb');
const nanoid = require('nanoid');
const FileSync = require('lowdb/adapters/FileSync');

// https://github.com/typicode/lowdb
const adapter = new FileSync('db.json');
const db = low(adapter);
const state = {
  todos: [], // { id: nanoid, todo: String, done: Bool }
};

db.defaults(state).write();

const getTodos = () => db.get('todos');
const getTodo = id => getTodos().find({ id });

// read
// get all or one todo by id and return its value
const get = () => getTodos().value();
// const get = () => {
//   return db
//     .get('todos')
//     .size()
//     .value();
// };
const getOne = id => getTodo(id).value();

// write
// get todos array, manipulate it, write to db
const add = todo => {
  return db
    .get('todos')
    .push({ id: nanoid(), todo, done: false })
    .write();
};
const update = (id, todo) => {
  return db
    .get('todos')
    .find({ id: id })
    .assign({ todo })
    .write();
};
const done = (id, done) => {
  return db
    .get('todos')
    .find({ id: id })
    .assign({ done: true })
    .write();
};

const notDone = (id, done) => {
  return db
    .get('todos')
    .find({ id: id })
    .assign({ done: false })
    .write();
};

const remove = id => {
  return db
    .get('todos')
    .remove({ id: id })
    .write();
};
const removeAll = () => {
  db.get('todos')
    .remove()
    .write();
};

const markAsDone = (id, done) => {};

module.exports = {
  get,
  getOne,
  add,
  update,
  done,
  notDone,
  remove,
  removeAll,
};
