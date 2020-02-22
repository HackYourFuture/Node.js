numbers = [ "12", "846", "2", "1236" ]
const pad = require('./andrejs-awesome-function');
numbers.forEach(number => {
    console.log(pad.padLeft(number, 4 , " ")) 
});
