'use strict';

const fs = require('fs');
const help = fs.readFileSync('./instruction.txt', `utf8`);
const list = x => console.log(x);
const reset = x => console.log(x);
const add = x => console.log(x);
const remove = x => console.log(x);

module.exports = { help, list, reset, add, remove };
