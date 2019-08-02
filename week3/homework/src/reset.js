const fs = require('fs');
const desc = 'RESET: clears all the list. ';
function reset() {
  try {
    fs.writeFile('todos.json', '[]', error => {
      if (error) {
        return error;
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = { reset, desc };
