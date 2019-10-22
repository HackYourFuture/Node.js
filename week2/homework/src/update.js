'use strict';

const program = require('commander');
const todoList = require('./todoList');

program.parse(process.argv);

try{
  const [id, ...args] = program.args;
  const task = args.join(' ');
  todoList.update(id, task);
} catch (err) {
  console.log(err.message);
}