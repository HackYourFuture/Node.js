'use strict';

const fs = require('fs');

const checkFile = require('./checkfile');

const add = (fileName, item) => {
    if (typeof item == 'undefined') {
        item == '';
    } else {
        const time = new Date().toUTCString();
        // const writableStream = fs.createWriteStream(fileName, { flags: 'a' })
        // writableStream.write(JSON.stringify({ timestamp: time, todo: item }) + `\n`)
        // writableStream.end(() => console.log(`Successfully written\n${time}`))
        fs.appendFile(
            fileName,
            JSON.stringify({ timestamp: time, todo: item }) + `\n`,
            (err, data) => {
                if (err) throw err;
                console.log(`Successfully written\n${time}`);
            }
        );
    }
};

module.exports = add;
