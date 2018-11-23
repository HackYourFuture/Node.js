const fs = require('fs');
const stringTo_dos = fs.readFileSync("./to-dos.json", "utf-8");
const to_dos = JSON.parse(stringTo_dos);
const writeData = require('./data');

let r = [];
const removeData = a =>
  a == 1 || a == to_dos.length ?
    r = to_dos.splice((a - 1), 1) &&
    writeData.writeData(to_dos)
    :
    console.log("there is no item has this index to remove!")

module.exports = {
  removeData,
  stringTo_dos,
  to_dos
}

