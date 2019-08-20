'use strict';

const fs = require('fs');
const program = require('commander');
const config = require('./config');
program.parse(process.argv);

try {
  const [id, ...args] = program.args;
  const task = args.join(' ');
  if (!task.length) {
    throw new Error('Task required');
  }
  const data = fs.readFileSync(config.DATA_FILE, { encoding: config.ENCODING });
  const tasks = JSON.parse(data);
  if (!tasks.map(i => i.id).includes(parseInt(id))) {
    throw new Error('Invalid Index');
  }
  tasks.find(item => item.id === +id).description = task;
  fs.writeFileSync(config.DATA_FILE, JSON.stringify(tasks, null, 2));
}
 catch (error) {
  console.log(error.message);
}
