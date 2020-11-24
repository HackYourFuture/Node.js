/**
 ** Exercise 1: Pad numbers
 *
 * In this file use the padLeft function from padLeft.js to
 * pad the numbers to exactly 4 spaces and log them to the console
 *
 * Expected output (replace the underscore with spaces):
 *
 *  ___12;
 *  __846;
 *  ____2;
 *  _1236;
 *
 * Tips:
 *   where to use `exports` and where `require`?
 */

let numbers = ["12", "846", "2", "1236"];

// YOUR CODE GOES HERE

const importedPadLeft = require("./padLeft");

numbers.map((num) => {
    // we were asked only to log the result so no need to return anything only logging the new value of the array will be enough
    console.log(importedPadLeft(num, 5, " "));
});
