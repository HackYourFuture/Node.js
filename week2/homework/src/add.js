const fs = require('fs');
const desc = 'adds the text you type after command word to toDoList';
function add(todoText) {
  fs.appendFile('toDoList.txt', todoText + '\n', err => {
    console.log('i start');
    if (err) {
      console.log(err);
    } else {
      console.log(`${todoText} added to toDoList`);
    }
  });
}
module.exports = { add, desc };
