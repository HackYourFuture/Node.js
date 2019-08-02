const fs = require('fs');
const desc = 'REMOVE: removes list item with 1-based index';
function remove(index) {
  try {
    if (Number.isInteger(Number(index)) && index > 0) {
      const data = fs.readFileSync('todos.json', 'utf8');
      const toDosArr = JSON.parse(data);
      if (index > toDosArr.length) {
        return new Error('no such id');
      }
      const spliced = toDosArr.splice(index - 1, 1);
      const toDosStringified = JSON.stringify(toDosArr);
      fs.writeFile('todos.json', toDosStringified, error => {
        if (error) {
          return error;
        } else {
          return true;
        }
      });
    } else {
      return new Error(
        'WARN: the parameter of remove command must be an integer and greater than 0!',
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { remove, desc };
