const hdbs = require('handlebars')

function getRandomWord(){
  return Math.floor(Math.random()*7)
}
function drawCard(){
  const subjects = [
  'shark',
  'popcorn',
  'poison',
  'fork',
  'cherry',
  'toothbrush',
  'cannon',
]
const punchlines = [
  'watch movie with',
  'spread some love',
  'put on cake',
  'clean toilets',
  'go to the moon',
  'achieve world piece',
  'help people learn programing',
]
const cardData ={
  subjects: subjects[getRandomWord()],
  punshlines:punchlines[getRandomWord()]
}
const card = '{{subjects}} is great to {{punshlines}}'
const temp = hdbs.compile(card)
const result = temp(cardData)
return result;
};
console.log(drawCard())
