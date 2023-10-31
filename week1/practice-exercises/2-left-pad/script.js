/**
 ** Exercise 2: To the left, to the left...
 *
 * Copy and paste your code from the previous exercise.
 * Replace the function `padLeft` to use
 * this new NPM package called `left-pad` instead then
 * Pad the numbers to 8 characters to confirm that it works correctly
 *
 */

const leftPad = require("left-pad");

let numbers = ["12", "846", "2", "1236"];

numbers.forEach((num) => {
  let paddedNumber = leftPad(num, 8, " ");
  console.log(paddedNumber);
});
