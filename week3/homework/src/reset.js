const fs = require('fs');
const desc = 'RESET: clears all the list. ';
function reset() {
  fs.writeFile('todos.json', '[]', error => {
    if (error) {
      return error;
    }
  });
}
module.exports = { reset, desc };
