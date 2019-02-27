'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const removeToDo = index => {
  return readFile('to-dos.json', 'utf8').then(data => {
    const inputData = JSON.parse(data);
    inputData.splice(index - 1, 1);
    return writeFile('to-dos.json', JSON.stringify(inputData), 'utf8');
  });
};

module.exports = { removeToDo };
