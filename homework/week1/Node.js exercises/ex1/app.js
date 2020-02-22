const pad = require('./ander')

const numbers = ["12", "846", "2", "1236"];

numbers.forEach(ele => {

    console.log(pad(ele, 4, "__"));
})


// console.log(pad());