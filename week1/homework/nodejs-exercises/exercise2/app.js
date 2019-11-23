const leftPad = require('left-pad');

const numbers = [ "12", "846", "2", "1236" ];

numbers.forEach( (num)=>{
    leftPad(num, 8, " ");
    console.log(num);
});
    
