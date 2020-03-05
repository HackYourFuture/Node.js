'use strict'

const express=require('express')
const fetch=require('node-fetch')
const app=express()
const port=3000
const url = 'https://reservation100-sandbox.mxapps.io/api/reservations'

const attendies={
  "name": "John Doe",
  "numberOfPeople": 3
}

app.get('/', (req,res) => {
  fetch(url, {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(attendies)
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
})

app.listen(port, () => {
  console.log(`running in port ${port}`)
})