'use strict';

const program = require('commander');
const todoList = require('./todoList');

program.parse(process.argv);

try {
  const id = parseInt(program.args[0]);
  todoList.remove(id);
} catch (error) {
  console.log(error.message);
}