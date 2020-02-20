'use strict'

const andreCode=require('./andrejs-awesome-function')


const numbers = [ "12", "846", "2", "1236" ]

numbers.forEach(num => {
  console.log(andreCode(num, 5, "_"))
})
