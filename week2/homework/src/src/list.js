const fs = require('fs')
const checkFile = require('./checkfile')

const list = (fileName) => {
    // const stream = fs.createReadStream(fileName, { encoding: 'utf8', highWaterMark: 1024 })
    // stream.pipe(process.stdout)
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
    })
}

module.exports = list