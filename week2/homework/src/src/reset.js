'use strict';

const fs = require('fs');
function reset(filename) {
    fs.writeFile(filename, '', err => {
        if (err) throw err;
    });
}

module.exports = reset;
