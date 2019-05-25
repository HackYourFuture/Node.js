'use strict';

const fs = require('fs');

const ENCODING = 'utf8';
const PATH = `${__dirname}/todoList.json`;

const actions = {
  list: () => {
    fs.readFile(PATH, ENCODING, (err, todoList) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      console.log(todoList);
    });
  },
  add: todoItem => {
    fs.appendFile(PATH, JSON.stringify(todoItem) + '\n', err => {
      if (err) throw err;
    });
  },
  remove: index => {
    fs.readFile(PATH, ENCODING, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      const todoList = JSON.parse(data);
      todoList.splice(index - 1, 1);
      return fs.writeFile(PATH, JSON.stringify(todoList), ENCODING, err => {
        throw err;
      });
      console.log(todoList);
    });
  },
  reset: todoItem => {
    fs.writeFile(PATH, '', err => {
      if (err) throw err;
    });
  },
  update: (index, updatedItem) => {
    fs.readFile(PATH, ENCODING, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      const todoList = JSON.parse(data);
      todoList.splice(index - 1, 1, `/n${updatedItem.join(' ')}`);
      return fs.writeFile(PATH, JSON.stringify(todoList), ENCODING, err => {
        throw err;
      });
      console.log(todoList);
    });
  },
  help: () => {
    return console.log(`
    Usage: node index.js [options]
           node . [options]

    CLI To-Do App

    Options:

      add                           add todo to the todoList
      remove [index]                remove todo from the todoList
      list                          show the todoList
      reset                         remove all the todo's from the todoList
      update [index] [updatedItem]  update the specified todo
      help                          show this help text
    `);
  },
};

const { list, add, remove, reset, update, help } = actions;

module.exports = { list, add, remove, reset, update, help };
