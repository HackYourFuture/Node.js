'use strict';

const fs = require('fs');

const information = fs.readFileSync('./instruction.txt', `utf8`);
const reading = function() {
  let tasks = [];
  if (fs.existsSync('./tasks_list.json')) {
    tasks = JSON.parse(fs.readFileSync('./tasks_list.json', 'utf8'));
  }
  return tasks;
};
const showList = function() {
  let list = reading();

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
  let list = reading();
  list.push([x]);
  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};
const remove = function(x) {
  let list = reading();
  if (x <= 0 || x > list.length) {
    console.log(`You typed a wrong number.\
    The list contains no task with the number ${x}.`);
    return;
  }
  if (x > 0 || x <= list.length) {
    list.splice(x - 1, 1);
    console.log(`The task is successfully deleted form the list`);
  }

  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};

module.exports = { information, showList, reset, add, remove };
