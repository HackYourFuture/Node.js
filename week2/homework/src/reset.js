const fs = require('fs');

function reset() {
  fs.writeFile('./toDo.json', '[]', error => {
    if (error) {
      console.log(error);
    } else {
      console.log('Every thing has been deleted.');
    }
  });
}

module.exports = reset;
