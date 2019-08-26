'use strict';

const todoList = require('./todoList');

try {
  console.log('TODO list\t', new Date().toUTCString());
  console.log('-'.repeat(50));
  const tasks = todoList.list();
  console.log('INDEX\tTASK\t');
  tasks.forEach(task => {
    console.log(`[${task.id}]\t${task.description}`);
  });
}
 catch (error) {
  console.log(error.message);
}
console.log('-'.repeat(50));
