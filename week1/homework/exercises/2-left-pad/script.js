/**
 ** Exercise 2: To the left, to the left...
 *
 * Copy and paste your code from the previous exercise.
 * Replace the function `padLeft` to use
 * this new NPM package called `left-pad` instead then
 * Pad the numbers to 8 characters to confirm that it works correctly
 *
 */

let numbers = [
  "12",
  "846",
  "2",
  "1236",
  "232",
  "23121",
  "12345678",
  "1",
  "102",
];

// YOUR CODE GOES HERE
const leftPad = require("left-pad");
numbers.forEach((number) => {
  console.log(leftPad(number, 8, " "));
});
