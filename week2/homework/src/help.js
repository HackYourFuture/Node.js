const fs = require('fs');

function help() {
  fs.readFile('./help.txt', 'utf8', (error, help) => {
    if (error) {
      console.log(error);
    } else {
      console.log(help);
    }
  });
}

module.exports = help;
