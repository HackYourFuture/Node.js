'use strict';
const fs = require('fs');
const program = require('commander');
const config = require('./config');
program.parse(process.argv);
const [id, ...args] = program.args;
const task = args.join(' ');
if (!task.length) {
  console.error('Task required');
  process.exit(1);
}
fs.readFile(config.DATA_FILE, config.ENCODING, (err, data) => {
  if (err) throw err;
  const todoObj = JSON.parse(data);
  if (!todoObj.map(i => i.id).includes(+id)) {
    console.log('Invalid Index');
    process.exit(1);
  }
  todoObj.find(item => item.id === +id).task = task;
  data = JSON.stringify(todoObj);
  fs.writeFile(config.DATA_FILE, data, err => {
    if (err) throw err;
  });
  console.log('Task updated');
});
