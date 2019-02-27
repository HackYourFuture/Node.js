'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const listToDos = () => readFile('to-dos.json', 'utf8').then(data => JSON.parse(data));

module.exports = { listToDos };
