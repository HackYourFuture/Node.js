'use strict';

/** ---------------------------------------
     Base
 ---------------------------------------- */
const fs = require('fs');

/** ---------------------------------------
     Function for Command
 ---------------------------------------- */
const list = {
  execute: () => {
    const content = fs.readFileSync('To-Do Database.json', 'utf8');
    if (!content) {
      console.log('There is nothing To-Do !');
    } else {
      fs.readFile('To-Do Database.json', 'utf8', (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        data.forEach((element, i) => {
          data[i] = i + 1 + ') ' + data[i];
          console.log(data[i]);
        });
      });
    }
  },
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = list;
