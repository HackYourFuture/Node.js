'use strict';

const fs = require('fs');

exports.command = 'line [file]';
exports.desc = 'Read file';
exports.builder = {
    file: {
        default: './data.json'
    }
};
exports.handler = function (argv) {
    const { file } = argv;
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;
        const arrayOfObjects = JSON.parse(data);
        console.dir(arrayOfObjects);
    });
};
