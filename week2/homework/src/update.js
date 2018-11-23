const fs = require('fs');
const stringTo_dos = fs.readFileSync("./to-dos.json", "utf-8");
const to_dos = JSON.parse(stringTo_dos);
const writeData = require('./data');

let d = [];
const updateData = (a, b) =>
  a == 1 || a == to_dos.length ?
    d = to_dos.splice((a - 1), 1, b) &&
    writeData.writeData(to_dos)
    :
    console.log("there is no item to update!")

module.exports = {
  updateData,
  stringTo_dos,
  to_dos
}

