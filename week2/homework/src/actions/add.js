// add command
'use strict';
const fs = require('fs');
let add = (todo) => {
  fs.readFileSync('todos.txt', 'utf8');
  let JSONText = {
    todo
  };
  fs.appendFileSync('todos.txt', `${JSON.stringify(JSONText)}\n`);
  console.log(`  you add the new todo : \n  ${JSON.stringify(JSONText)}`);
};

module.exports = add;