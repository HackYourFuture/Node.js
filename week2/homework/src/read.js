'use strict';

const fs = require('fs');

exports.reading = function() {
  let tasks = [];
  if (fs.existsSync('./tasks_list.json')) {
    tasks = JSON.parse(fs.readFileSync('./tasks_list.json', 'utf8'));
  }
  return tasks;
};
