const fs = require('fs');
function remove(toRemoveNumber) {
  fs.readFile('./toDoList.txt', 'utf8', (error, contents) => {
    if (error) {
      console.log('There is no toDoList file.');
    } else {
      const contentPart = contents.split('\n');
      contentPart.splice(toRemoveNumber - 1, 1);
      const updatedContent = contentPart.join('\n');
      fs.writeFile('./toDoList.txt', updatedContent, err => {
        if (err) throw err;
        console.log(toRemoveNumber, 'is removed from your toDoList');
      });
    }
  });
}
module.exports = remove;
