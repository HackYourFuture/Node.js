'use strict';

// TODO: Write the homework code in this file
const executor = require(`./executor`);
const userInput = process.argv;
if (userInput.length === 3) {
  switch (userInput[2]) {
    case `help`:
      executor.help(userInput[2]);
      break;
    case `list`:
      executor.list(userInput[2]);
      break;
    case `reset`:
      executor.reset(userInput[2]);
      break;
    default:
      console.log(`You have to type a valid command!`);
  }
}
if (userInput.length === 4) {
  switch (userInput[2]) {
    case `add`:
      executor.add(userInput[2]);
      break;
    case `remove`:
      executor.remove(userInput[2]);
      break;
    default:
      console.log(`You have to type a valid command!`);
  }
}
if (userInput.length > 4) {
  console.log(`You have to type a valid command!`);
}
