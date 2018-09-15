'use strict';

const fs = require('fs');

// const remove = (fileName, index) => {
//     const writableStream = fs.createWriteStream(fileName, { flags: 'a' })
//     const readableStream = fs.createReadStream(fileName, { encoding: 'utf8', highWaterMark: 1024 })
//     console.log(readableStream.pipe(process.stdout))
// }
const remove = (fileName, index) => {
    if (index < 0) {
        console.log(`Number must be positive`);
    } else {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) throw err;
            let arrayFromData = data.split('\n');
            arrayFromData.splice(index - 1, 1);
            let updatedData = arrayFromData.join('\n');
            fs.writeFile(fileName, updatedData, err => {
                if (err) throw err;
            });
        });
    }
};

module.exports = remove;
