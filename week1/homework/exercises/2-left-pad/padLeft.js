
/**
 * Inserts a certain character until a has the desired length
 * e.g. padLeft('foo', 5, '_') -> '__foo'
 * e.g. padLeft(  '2', 2, '0')   -> '02'
 */
function padLeft(val, num, str) {
	return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}

// YOUR CODE GOES HERE