'use strict';
const fs = require('fs');
const config = require('./config');
const program = require('commander');

program.parse(process.argv);
const id = +program.args[0];
fs.readFile(config.DATA_FILE, config.ENCODING, (err, data) => {
  if (err) throw err;
  const todoObj = JSON.parse(data);
  if (!todoObj.map(i => i.id).includes(id)) {
    console.log('Invalid Index');
    process.exit(1);
  }
  const newTodoObj = todoObj.filter(item => item.id !== id);
  newTodoObj.forEach((item, index) => {
    item.id = index + 1;
  });
  data = JSON.stringify(newTodoObj);
  fs.writeFile(config.DATA_FILE, data, err => {
    if (err) throw err;
  });
  console.log('Task removed');
});
