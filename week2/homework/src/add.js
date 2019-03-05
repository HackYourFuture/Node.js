'use strict';

/** ---------------------------------------
     Base
 ---------------------------------------- */
const fs = require('fs');

/** ---------------------------------------
     Functions for Command
 ---------------------------------------- */
function fillEmptyDatabase() {
  const content = fs.readFileSync('To-Do Database.json', 'utf8');
  if (!content) {
    fs.appendFile('To-Do Database.json', JSON.stringify([]), err => {
      if (err) throw err;
    });
  }
}

const add = {
  execute: data => {
    fillEmptyDatabase();
    fs.readFile('To-Do Database.json', 'utf8', (err, readData) => {
      if (err) throw err;
      const parsedJSON = JSON.parse(readData);
      parsedJSON.unshift(data);
      fs.writeFile('To-Do Database.json', JSON.stringify(parsedJSON), err => {
        if (err) throw err;
        console.log('New To-Do Created !');
      });
    });
  },
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = add;
