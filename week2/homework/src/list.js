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
    switch (content) {
      case '':
        console.log('There is nothing To-Do !');
        break;
      default:
        fs.readFile('To-Do Database.json', 'utf8', (err, data) => {
          if (err) throw err;
          data = JSON.parse(data);
          data.forEach((element, i) => {
            data[i] = i + 1 + ') ' + data[i];
            console.log(data[i]);
          });
        });
    }
  }
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = list;
