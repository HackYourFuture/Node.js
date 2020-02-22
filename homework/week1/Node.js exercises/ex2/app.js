const leftPad = require('left-pad')

const numbers = ["12", "846", "2", "1236"];

numbers.forEach(ele => {
    console.log(leftPad(ele, 8, "_"));

});