'use strict';

const fs = require('fs');
const program = require('commander');
const config = require('./config');
program.parse(process.argv);

try {
  const task = program.args.join(' ');
  if (!task.length) {
    throw new Error('Task required');
  }
  const data = fs.readFileSync(config.DATA_FILE, { encoding: config.ENCODING });
  const tasks = JSON.parse(data);
  tasks.push({
    id: tasks.length ? Math.max(...tasks.map(i => i.id)) + 1 : 1,
    description: task
  });
  fs.writeFileSync(config.DATA_FILE, JSON.stringify(tasks, null, 2));
}
 catch (error) {
  console.log(error.message);
}
