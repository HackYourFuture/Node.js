const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const update = (index, input) => {
  readFile('todos.json', 'utf8').then(data => {
    const inputData = JSON.parse(data);
    const indexInArray = index - 1;
    if (index > -1 && indexInArray < inputData.length) {
      inputData.splice(indexInArray, 1, input);

      writeFile('todos.json', JSON.stringify(inputData), 'utf-8');

      console.log('Task has been updated successfully ');
    }
 else {
      console.log(
        'Wrong entry. Make sure to type the correct index of the item you want to update.'
      );
    }
  });
};

module.exports = update;
