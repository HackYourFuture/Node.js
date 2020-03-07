const fetch = require('node-fetch')

const data = 'admin:hvgX8KlVEa'
const buff = new Buffer.from(data)
const base64data = buff.toString('base64')
console.log(base64data)

fetch('https://restapiabasicauthe-sandbox.mxapps.io/api/books', {
  headers: { Authorization: 'Basic YWRtaW46aHZnWDhLbFZFYQ==' }
})
  .then(res => res.json())
  .then(json => console.log(json))

//  Bonus hint : https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
