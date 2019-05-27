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
      console.log(`\nTodo list:\n${todoList}`);
    });
  },
  add: todoItem => {
    fs.readFile(PATH, ENCODING, (err, todoList) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      todoList = JSON.parse(todoList);
      todoList.push(todoItem);
      fs.writeFile(PATH, JSON.stringify(todoList), err => {
        if (err) throw err;
      });
      console.log(`'${todoItem}' has been added to the Todo list.`);
    });
  },
  remove: index => {
    fs.readFile(PATH, ENCODING, (err, todoList) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      todoList = JSON.parse(todoList);
      if (index > 0 && index <= todoList.length) {
        todoList.splice(index - 1, 1);
        console.log('Todo item has been removed');
        fs.writeFile(PATH, JSON.stringify(todoList), err => {
          if (err) throw err;
        });
      } else {
        console.log('Please insert a valid number.');
      }
    });
  },
  reset: () => {
    fs.writeFile(PATH, JSON.stringify([]), err => {
      if (err) throw err;
    });
  },
  update: (index, updatedItem) => {
    fs.readFile(PATH, ENCODING, (err, todoList) => {
      if (err) {
        if (err.code === 'ENOENT') console.log('no data found');
        throw err;
      }
      todoList = JSON.parse(todoList);
      if (index > 0 && index <= todoList.length) {
        todoList.splice(index - 1, 1, updatedItem);
        console.log('Todo item has been modified');
        fs.writeFile(PATH, JSON.stringify(todoList), ENCODING, err => {
          if (err) throw err;
        });
      } else {
        console.log('Please insert a valid number.');
      }
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
