
/**
 ** Exercise 1: Pad numbers 
 * 
 * In this file use the padLeft function from padLeft.js to
 * pad the numbers to exactly 5 spaces and log them to the console
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
 const {padLeft} = require('./padLeft.js');
 numbers = [ "12", "846", "2", "1236" ];
 numbers.forEach(number => {
	number = padLeft(number, 5, '_');

	console.log(number);
});
// YOUR CODE GOES HERE
