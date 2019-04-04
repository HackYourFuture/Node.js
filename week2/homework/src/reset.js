const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const reset = () => {
  readFile('todos.json', 'utf-8').then(data => {
    let inputData = JSON.parse(data);
    if (inputData.length > 0) {
      inputData = [];
      writeFile('to-dos.json', JSON.stringify(inputData), 'utf8');
      console.log('Application has been reset successfully.');
    }
 else {
      console.log('The list is already empty');
    }
  });
};

module.exports = reset;
