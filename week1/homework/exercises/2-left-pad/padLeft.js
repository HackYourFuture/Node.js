
/**
 * Inserts a certain character until a has the desired length
 * e.g. padLeft('foo', 5, '_') -> '__foo'
 * e.g. padLeft(  '2', 2, '0')   -> '02'
 */
function padLeft(val, num, str) {
	return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}

// after npm installing the leftPad library we require it then we are ready to use it's methods
const leftPad = require('left-pad');

console.log(leftPad(17, 18, 0));
console.log(leftPad(17, 8, 0));
console.log(leftPad(17, 7, '-'));

// in the exercise we were asked to copy our old post from script to this page, i have no clue why and what should we do ?

// YOUR CODE GOES HERE
/*let numbers = ["12", "846", "2", "1236"];
const importedPadLeft = require("../1-pad-numbers/padLeft");

numbers.map((num) => {
    
    console.log(importedPadLeft(num, 5, " "));
});*/


