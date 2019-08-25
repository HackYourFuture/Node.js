'use strict';

// TODO: Write the homework code in this file

const userInput = process.argv;
const executor = require(`./user_input_executor`);
const warning = `You have to type a valid command!`;

if (userInput.length === 2) {
  console.log(executor.help);
}

if (userInput.length === 3) {
  switch (userInput[2]) {
    case `help`:
      console.log(executor.help);
      break;
    case `list`:
      executor.showList(userInput[2]);
      break;
    case `reset`:
      executor.reset(userInput[2]);
      break;
    default:
      console.log(warning);
  }
}

if (userInput.length === 4) {
  const task = userInput[3];
  switch (userInput[2]) {
    case `add`:
      executor.add(task);
      break;
    case `remove`:
      executor.remove(task);
      break;
    default:
      console.log(warning);
  }
}
if (userInput.length > 4) {
  console.log(warning);
}
