'use strict';

const fs = require('fs');

function update(fileName, index, updatedItem) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        let arrayFromData = data.split('\n');
        arrayFromData.splice(index - 1, 1, updatedItem);
        let updatedData = arrayFromData.join('\n');
        fs.writeFile(fileName, updatedData, err => {
            if (err) throw err;
        });
    });
}

module.exports = update;
