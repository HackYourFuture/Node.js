'use strict';

const fs = require('fs');

function add(item) {
  fs.appendFile('./to-do.txt', item + '\n', err => {
    if (err) {
      console.log(err);
    }
 else {
      console.log('New item added!');
    }
  });
}

module.exports = add;
