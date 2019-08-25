'use strict';

// TODO: Write the homework code in this file

const userInput = process.argv;
if (userInput.length === 3) {
  switch (userInput[2]) {
    case `help`:
      console.log(userInput[2]);
      break;
    case `list`:
      console.log(userInput[2]);
      break;
    case `rest`:
      console.log(userInput[2]);
      break;
    default:
      console.log(`You have to type a valid command!`);
  }
}
if (userInput.length === 4) {
  switch (userInput[2]) {
    case `add`:
      console.log(userInput[2]);
      break;
    case `remove`:
      console.log(userInput[2]);
      break;
    default:
      console.log(`You have to type a valid command!`);
  }
}
