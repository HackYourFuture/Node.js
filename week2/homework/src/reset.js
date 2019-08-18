'use strict';
const fs = require('fs');
const config = require('./config');
const data = JSON.stringify([]);
fs.writeFile(config.DATA_FILE, data, err => {
  if (err) throw err;
});
