const fs = require('fs');

function reset() {
  fs.writeFile('./todos.json', '[]', error => {
    if (error) throw error;
  });
}

module.exports = reset;
