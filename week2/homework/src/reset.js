const fs = require('fs');

function reset() {
  fs.unlink('./toDo.txt', error => {
    if (error) {
      console.log(error);
    } else {
      fs.writeFile('./toDo.txt', '', error => {
        if (error) {
          console.log(error);
        } else {
          console.log('Every thing has been deleted.');
        }
      });
    }
  });
}

module.exports = reset;
