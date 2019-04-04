const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const remove = index => {
  readFile('todos.json', 'utf-8').then(data => {
    const inputData = JSON.parse(data);

    const indexInArray = index - 1;
    if (inputData.length === 0) {
      console.log('The list is empty. There is no task to be deleted.');
    }
 else if (indexInArray > -1 && indexInArray < inputData.length) {
      inputData.splice(indexInArray, 1);
      writeFile('todos.json', JSON.stringify(inputData), 'utf-8');
      console.log('to do has been deleted successfully');
    }
 else {
      console.log(
        'Wrong entry. Make sure to type the correct index of the item you want to delete. '
      );
    }
  });
};

module.exports = remove;
