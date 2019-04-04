const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const add = input => {
  readFile('todos.json', 'utf-8').then(data => {
    const inputData = JSON.parse(data);
    if (inputData.includes(input)) {
      console.log('Task already exists. Enter a new task');
    }
 else {
      inputData.push(input);

      writeFile('todos.json', JSON.stringify(inputData), 'utf-8');
      console.log('Task has been added successfully.');
    }
  });
};

module.exports = add;
