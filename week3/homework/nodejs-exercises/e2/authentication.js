'use strict'

const express=require('express')
const fetch=require('node-fetch')
const app=express()
const port=3000
const url='https://restapiabasicauthe-sandbox.mxapps.io/api/books'
const authentication='admin:hvgX8KlVEa'
const encodedPass=Buffer.from(authentication).toString('base64');


app.get('/', (req,res) =>{
  fetch(url, {
    headers : {'authorization' : `Basic ${encodedPass}`}
  })
  .then(res => res.json())
  .then(repo => {
    res.send(repo)
  })
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})