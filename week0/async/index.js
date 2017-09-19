const fs = require('fs');

console.log("hello again");

fs.readFile('./mydocument.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("something went wrong")
    } else {
        console.log("data:", data);
    }
});

fs.readFile('./mydocument2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("something went wrong")
    } else {
        console.log("data:", data);
    }
});

fs.readFile('./mydocument2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("something went wrong")
    } else {
        console.log("data:", data);
    }
});

console.log("hello world");

