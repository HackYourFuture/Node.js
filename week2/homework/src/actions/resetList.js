'use strict';

const fs = require('fs');

function resetList() {
  fs.writeFileSync('./data.txt', '');
}

module.exports = resetList;
