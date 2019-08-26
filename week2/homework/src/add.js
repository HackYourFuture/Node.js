'use strict';

const program = require('commander');
const todoList = require('./todoList');

program.parse(process.argv);

try {
  const task = program.args.join(' ');
  todoList.add(task);
} catch (error) {
  console.log(error.message);
}
