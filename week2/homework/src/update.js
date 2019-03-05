'use strict';

/** ---------------------------------------
     Base
 ---------------------------------------- */
const fs = require('fs');

/** ---------------------------------------
     Function for Command
 ---------------------------------------- */
const update = {
  execute: (toDoNumber, updatedToDo) => {
    const content = fs.readFileSync('To-Do Database.json', 'utf8');
    const toDoIndex = toDoNumber - 1;
    if (!content) {
      console.log('There is nothing to update !');
    } else {
      fs.readFile('To-Do Database.json', 'utf8', (err, readData) => {
        if (err) throw err;
        const parsedJSON = JSON.parse(readData);
        const arrayLength = parsedJSON.length;
        if (toDoNumber < 0 || toDoNumber > arrayLength) {
          console.log(`To-Do #${toDoNumber} is not available !`);
        } else {
          parsedJSON[toDoIndex] = updatedToDo;
          fs.writeFile('To-Do Database.json', JSON.stringify(parsedJSON), err => {
            if (err) throw err;
            console.log(`To-Do #${toDoNumber} is updated !`);
          });
        }
      });
    }
  },
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = update;
