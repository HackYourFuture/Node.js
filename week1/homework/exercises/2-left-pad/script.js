/**
 ** Exercise 2: To the left, to the left...
 * 
 * Copy and paste your code from the previous exercise.
 * Replace the function `padLeft` to use
 * this new NPM package called `left-pad` instead then
 * Pad the numbers to 8 characters to confirm that it works correctly
 *
 */

let numbers = ["12", "846", "2", "1236"];

// YOUR CODE GOES HERE

const fn = require("./padLeft.js")
const leftPad = require('left-pad')

numbers.forEach(number => {
  console.log(fn.padLeft(number, 5, '_'))
})

console.log(leftPad('foo', 5))
// => "  foo"

console.log(leftPad('foobar', 6))
// => "foobar"

console.log(leftPad(1, 2, '0'))
// => "01"

console.log(leftPad(17, 5, 0))
// => "00017"