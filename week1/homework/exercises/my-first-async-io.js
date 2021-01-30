const fs = require('fs')

function callback(error, data) {
  if (error) return console.error(error)
  const lines = data.toString().split('\n').length - 1
  console.log(lines)
}


fs.readFile(process.argv[2], callback)