'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const addToDos = (...text) => {
  return readFile('to-dos.json', 'utf8').then(data => {
    const inputData = JSON.parse(data);
    inputData.push(`\n${text.join(' ')}`);
    return writeFile('to-dos.json', JSON.stringify(inputData), 'utf8');
  });
};

module.exports = { addToDos };
