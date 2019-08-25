'use strict';

const fs = require('fs');

const help = fs.readFileSync('./instruction.txt', `utf8`);
const list = x => console.log(x);
const reset = () => fs.writeFileSync('./tasks_list.json', JSON.stringify([]));
const add = function(x) {
  let list = [];
  if (fs.existsSync('./tasks_list.json')) {
    list = JSON.parse(fs.readFileSync('./tasks_list.json', 'utf8'));
  }
  list.push([x]);
  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};
const remove = x => console.log(x);

module.exports = { help, list, reset, add, remove };
