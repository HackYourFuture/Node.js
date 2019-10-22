'use strict';

const program = require('commander');
const todoList = require('./todoList');

program.parse(process.argv);

try {
  todoList.reset();
  console.log('All items are deleted!');
} catch (err) {
  console.log(err.message);
}