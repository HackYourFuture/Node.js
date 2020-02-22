const leftPad = require('left-pad');
numbers = [ "12", "846", "2", "1236", "123456789" ];
numbers.forEach(number => {
    console.log(leftPad(number, 4 , " "))
});
