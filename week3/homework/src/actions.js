'use strict';

const fs = require('fs');

const ENCODING = 'utf8';
const PATH = `${__dirname}/todoList.json`;

const actions = {
  list: cb => {
    fs.readFile(PATH, ENCODING, (err, todoList) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        cb(err);
      }

      return cb(null, todoList);
    });
  },
  reset: cb => {
    fs.writeFile(PATH, JSON.stringify([]), err => {
      if (err) {
        cb(err);
      }
      return cb(null, JSON.stringify([]));
    });
  },
  update: (changedData, cb) => {
    fs.writeFile(PATH, JSON.stringify(changedData), (err, data) => {
      if (err) {
        cb(err);
      }
      return cb(null, data);
    });
  },
  // i will not use this function, i live it as a reference.
  add: newTodoItem => {
    fs.readFile(PATH, ENCODING, (err, todoList) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      todoList = JSON.parse(todoList);
      todoList.push(newTodoItem);
      fs.writeFile(PATH, JSON.stringify(todoList), err => {
        if (err) throw err;
      });
    });
  },
};

const { list, add, reset, update } = actions;

module.exports = { list, add, reset, update };
