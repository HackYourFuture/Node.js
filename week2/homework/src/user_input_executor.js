'use strict';

const fs = require('fs');
const read = require(`./read`);
const reading = read.reading();
const writing = function(updatedList) {
  fs.writeFileSync('./tasks_list.json', JSON.stringify(updatedList));
};

const information = fs.readFileSync('./instruction.txt', `utf8`);

const showList = function() {
  let list = reading;

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
  writing([]);
  console.log('The tasks list is now empty.');
};

const add = function(task) {
  let list = reading;
  list.push([task]);
  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};

const remove = function(taskNumber) {
  let list = reading;
  if (taskNumber <= 0 || taskNumber > list.length) {
    console.log(`You typed a wrong number.\
    The list contains no task with the number ${taskNumber}.`);
    return;
  }
  if (taskNumber > 0 || taskNumber <= list.length) {
    list.splice(taskNumber - 1, 1);
    console.log(`The task is successfully deleted form the list`);
  }

  fs.writeFileSync('./tasks_list.json', JSON.stringify(list));
};

module.exports = { information, showList, reset, add, remove };
