const fs = require('fs');
const data = require('./data');

let d = [];
const updateData = (a, b) =>
  a > 0 && a <= data.to_dos.length ?
    d = data.to_dos.splice((a - 1), 1, b) &&
    data.writeData(data.to_dos)
    :
    console.log("there is no item to update!")

module.exports = updateData;


