'use strict';
const fs = require('fs');
const program = require('commander');
const config = require('./config');
program.parse(process.argv);
const task = program.args.join(' ');
if (!task.length) {
  console.error('Task required');
  process.exit(1);
}
fs.readFile(config.DATA_FILE, config.ENCODING, (err, data) => {
  if (err) throw err;
  const todoObj = JSON.parse(data);
  const id = todoObj.length ? Math.max.apply(null, todoObj.map(i => i.id)) + 1 : 1;
  const newTask = { id, task };
  todoObj.push(newTask);
  data = JSON.stringify(todoObj);
  fs.writeFile(config.DATA_FILE, data, err => {
    if (err) throw err;
  });
  console.log('Task added');
});
