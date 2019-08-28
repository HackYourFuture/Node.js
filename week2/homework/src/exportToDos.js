'use strict';

const { loadToDos, logScreen } = require('./Util');
const path = require('path');
const fs = require('fs').promises;

const exportToDos = async filename => {
  const file = path.join(__dirname, filename);
  try {
    const todos = await loadToDos();
    const output = todos
      .map(todo => [todo.index + '. ' + todo.body + ' ' + todo.complete].join(', '))
      .join('\n');
    fs.writeFile(file + '.txt', 'Your to-dos:\n' + output).then(() => {
      logScreen(`Your todos exported into ${file}.txt file`, 'green');
    });
  } catch (err) {
    logScreen(`Could not been exported! Please, try again...`, 'red');
  }
};

module.exports = exportToDos;
