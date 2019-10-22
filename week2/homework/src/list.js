'use strict';

const todoList = require('./todoList');

try {
  console.log('TODO list\t');
  console.log('-'.repeat(50));
  const myList = todoList.list();
  console.log('INDEX\tTASK\t');
  myList.foreach(myList => {
    console.log(`${myList.id}\t${myList.description}`);
  });
}catch (err) {
  console.log(err.message);
}
console.log('-'.repeat(50));