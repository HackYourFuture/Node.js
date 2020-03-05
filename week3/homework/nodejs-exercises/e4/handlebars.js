'use strict'

const handlebars=require('handlebars')



const subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"]
const punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"]


const randomItems= {
  subject: subjects[Math.floor(Math.random() * subjects.length)],
  punchline: punchlines[Math.floor(Math.random() * punchlines.length)]
}

const source= "{{subject}} is great to {{punchline}}"
const temp=handlebars.compile(source)
const randomJoke=temp(randomItems)
console.log(randomJoke)


