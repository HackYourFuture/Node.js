const fs = require('fs');
const writeData = require('./write');

const reset = function () {
  let cleanPage = [];
  writeData(cleanPage);
}

module.exports = reset;

