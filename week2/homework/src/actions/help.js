'use strict';

const fs = require('fs');

const help = () => {
  console.log(fs.readFileSync('help.txt', 'utf8'));
};

module.exports = help;