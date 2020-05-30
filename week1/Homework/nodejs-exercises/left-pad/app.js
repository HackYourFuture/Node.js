
const leftPad = require('left-pad')

// leftPad("foo", 5)
// console.log(leftPad("foo", 6))
const numbers = [ "12", "846", "2", "1236" ];

numbers.forEach(number => {
    console.log(leftPad(number, 8 , " "))
})