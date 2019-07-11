'use strict';

const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

module.exports = { readFilePromise, writeFilePromise };
