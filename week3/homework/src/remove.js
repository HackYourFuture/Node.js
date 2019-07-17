const fs = require('fs');
const desc = 'REMOVE: removes list item with 1-based index';
function remove(index) {
  if (Number.isInteger(Number(index)) && index > 0) {
    const data = fs.readFileSync('todos.json', 'utf8');
    const toDosArr = JSON.parse(data);
    const spliced = toDosArr.splice(index - 1, 1);
    const toDosStringified = JSON.stringify(toDosArr);
    fs.writeFile('todos.json', toDosStringified, error => {
      if (error) {
        return error;
      }
    });
  } else {
    console.log('WARN: the parameter of remove command must be an integer and greater than 0!');
  }
}
module.exports = { remove, desc };
