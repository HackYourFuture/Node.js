'use strict'

const fs = require('fs');

exports.command = 'reset [file]'
exports.desc = 'Reset file'
exports.builder = {
    file: {
        default: './data.json'
    }
}
exports.handler = function (argv) {
    const { file } = argv
    const defaultContent = { "todos": [] }

    fs.writeFile(file, JSON.stringify(defaultContent, null, 2), 'utf-8', err => {
        if (err) throw err
        console.log('Done!')
    })

}
