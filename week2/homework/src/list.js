const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const list = () => {
  readFile('todos.json', 'utf-8').then(data => {
    const inputData = JSON.parse(data);
    if (inputData.length === 0) {
      console.log('To do list is yet empty. Try to insert tasks first');
    }
 else {
      inputData.forEach(element => {
        console.log(element);
      });
    }
  });
};

module.exports = list;
