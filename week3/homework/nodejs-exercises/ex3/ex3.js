const fetch = require('node-fetch')
fetch(
  'https://reservation100-sandbox.mxapps.io/rest-doc/api/swagger.json',
  {
    method: 'POST',
    body: 'a=1'
  },
  { headers: { 'Content-Type': 'application/json' } }
)
  .then(res => res.json()) // expecting a json response
  .then(json => console.log(json))
