const fs = require('fs');
const util = require('util');

console.log("hello again");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const promise = readFileAsync('./mydocument.txt', 'utf8');
const promise1 = readFileAsync('./mydocument2.txt', 'utf8');

Promise.all([promise1, promise])
.then((data) => {
    return data[0].concat(data[1]);
})
.then((concat_data) => {
    return writeFileAsync('output.txt', concat_data)
})
.then((final_data) => {
    console.log("file written");
})
.catch((err) => {
    console.log("there is an error", err)
});