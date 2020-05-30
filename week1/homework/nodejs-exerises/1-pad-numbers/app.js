const padLeft = require('./padLeft');

const numbers = [ "12", "846", "2", "1236" ];

numbers.forEach(number => {
    console.log(padLeft(number,4,' '))
})