'use strict'

const leftPad=require('left-pad')


const numbers = [ "12", "846", "2", "1236" ]

numbers.forEach(num => {
  console.log(leftPad(num, 8, "_"))
})
