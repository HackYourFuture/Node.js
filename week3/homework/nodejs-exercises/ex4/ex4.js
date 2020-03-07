const subjects = [
  'shark',
  'popcorn',
  'poison',
  'fork',
  'cherry',
  'toothbrush',
  'cannon'
]

const punchlines = [
  'watch movie with',
  'spread some love',
  'put on cake',
  'clean toilets',
  'go to the moon',
  'achieve world piece',
  'help people learn programing'
]

const expres = require('express')
const app = expres()
const hbs = require('handlebars')

const source = '<p>{{subject}} is great to {{punchline}}.</p>'
const template = hbs.compile(source)

const data = {
  subject: subjects[Math.floor(Math.random() * 7)],
  punchline: punchlines[Math.floor(Math.random() * 7)]
}
const result = template(data)

app.get('/', (req, res) => {
  res.send(result)
})

app.listen(3000, () => {
  console.log('server is startingat port', 3000)
})
