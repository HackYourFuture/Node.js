
/**
 * Inserts a certain character until a has the desired length
 * e.g. padLeft('foo', 5, '_') -> '__foo'
 * e.g. padLeft(  '2', 2, '0')   -> '02'
 */
function padLeft(val, num, str) {
	return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}

// YOUR CODE GOES HERE
console.log(padLeft('foo', 5, '_'))
console.log(padLeft('2', 2, '0'))
console.log(padLeft('42', 3, '-'))
console.log(padLeft('test', 6, '+'))
console.log(padLeft('abc', 4, '#'));


module.exports = padLeft;