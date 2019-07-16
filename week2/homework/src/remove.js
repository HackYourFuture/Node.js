/* eslint-disable indent */
const fs = require('fs');

function remove(index) {
  fs.readFile('./todoList.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const removeSelectedItem = data.split('\n');
    removeSelectedItem.splice(index - 1, 1);
    fs.writeFile('./todoList.txt', removeSelectedItem.join('\n'), err => {
      if (err) {
        console.log('there is an error');
      }
 else {
        console.log('Item was removed successfully');
      }
    });
  });
}

module.exports = remove;
