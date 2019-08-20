'use strict';

const fs = require('fs');
const config = require('./config');

try {
  const data = fs.readFileSync(config.DATA_FILE, { encoding: config.ENCODING });
  const tasks = JSON.parse(data);
  console.log('TODO list\t', new Date().toUTCString());
  console.log('-'.repeat(50));
  if (!tasks.length) {
    throw new Error('NO TASK');
  }
 else {
    console.log('INDEX\tTASK\t');
    tasks.forEach(task => {
      console.log(`[${task.id}]\t${task.description}`);
    });
  }
}
 catch (error) {
  console.log(error.message);
}
console.log('-'.repeat(50));
