'use strict';

const fs = require('fs');

const information = fs.readFileSync('./instruction.txt', `utf8`);
const showList = function() {
  let list = [];
  if (fs.existsSync('./tasks_list.json')) {
    list = JSON.parse(fs.readFileSync('./tasks_list.json', 'utf8'));
  }

  if (list[0] !== undefined) {
    list.forEach((task, index) => {
      console.log(`${index + 1}-${task}`);
    });
    return;
  }
  if (list[0] === undefined) {
    console.log(`The list dose't have any task yet.`);
  }
};
const reset = function() {
  fs.writeFileSync('./tasks_list.json', JSON.stringify([]));
  console.log('The tasks list is now empty.');
};
const add = function(x) {
  let list = [];
  if (fs.existsSync('./tasks_list.json')) {
    list = JSON.parse(fs.readFileSync('./tasks_list.json', 'utf8'));
  }
  list.push([x]);
  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};
const remove = function(x) {
  let list = [];
  if (fs.existsSync('./tasks_list.json')) {
    list = JSON.parse(fs.readFileSync('./tasks_list.json', 'utf8'));
  }
  if (x <= 0 || x >= list.length) {
    console.log(`You typed wrong number.
    /n The list contains no task with the number ${x}`);
    return;
  }
  if (x > 0 || x < list.length) {
    list.splice(x - 1, 1);
  }

  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};

module.exports = { information, showList, reset, add, remove };
