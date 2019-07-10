const fs = require('fs');
const desc = 'RESET: clears all the list. ';
function reset() {
  fs.writeFile('toDoList.txt', '', err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`list reset. toDoList is empty now`);
    }
  });
}
module.exports = { reset, desc };
