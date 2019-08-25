'use strict';

// TODO: Write the homework code in this file

const userInput = process.argv;
if (userInput[2] === `help` && userInput.length === 3) {
  console.log(process.argv[2]);
}
 else if (userInput[2] === `list` && userInput.length === 3) {
  console.log(process.argv[2]);
}
 else if (userInput[2] === `rest` && userInput.length === 3) {
  console.log(process.argv[2]);
}
 else if (userInput[2] === `add` && userInput.length === 4) {
  console.log(process.argv[3]);
}
 else if (userInput[2] === `remove` && userInput.length === 4) {
  console.log(process.argv[3]);
}
 else {
  console.log(`Pleas type valid command!`);
}
