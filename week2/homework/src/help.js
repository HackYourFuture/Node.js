'use strict';

const fs = require('fs');

const help = () => {
  fs.readFile('./help.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
 else {
      console.log(data);
    }
  });
  console.log(`You can use these commands to make a to-do list: \n`);
};

module.exports = help;
