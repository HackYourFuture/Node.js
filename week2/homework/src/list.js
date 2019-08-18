'use strict';
const fs = require('fs');
const config = require('./config');
fs.readFile(config.DATA_FILE, config.ENCODING, (err, data) => {
  if (err) throw err;
  const todoObj = JSON.parse(data);
  if (todoObj.length) {
    console.log('INDEX\tTASK\t');
    todoObj.forEach(todo => {
      console.log(`[${todo.id}]\t${todo.task}`);
    });
  }
 else {
    console.log('NO TASK');
  }
  console.log('-'.repeat(50));
});
console.log('TODO list\t', new Date().toUTCString());
console.log('-'.repeat(50));
