const padLeft = require('./andrejs-awesome-function');

const numbers = [ "12", "846", "2", "1236" ];

numbers.forEach( (num)=>{
    padLeft(num, 4, " ");
    console.log(num);
});
    


