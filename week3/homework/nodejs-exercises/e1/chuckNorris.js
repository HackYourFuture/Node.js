'use strict'

const express = require('express');
const fetch=require('node-fetch')
const app = express();
const port = 3000;

app.get('/', (req,res) => {
  fetch('http://api.icndb.com/jokes/random')
  .then(res => res.json())
  .then(repo => {
    console.log(repo.value.joke)
  })
})


// app.get('/', (req,res) => {
//   fetch('http://api.icndb.com/jokes/random/1http://api.icndb.com/jokes/random/')
//   .then(res => res.json())
//   .then(repos => {
//     repos.value.forEach(item => {
//       console.log(item.joke)
//     })
//   })
// })

app.listen(port, ()=> {
  console.log(`Server listening to port ${port}`)
})