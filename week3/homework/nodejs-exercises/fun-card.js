const hbs = require('handlebars');

const subjects = [
  'shark',
  'popcorn',
  'poison',
  'fork',
  'cherry',
  'toothbrush',
  'cannon',
];

const punchlines = [
  'watch movie with',
  'spread some love',
  'put on cake',
  'clean toilets',
  'go to the moon',
  'achieve world piece',
  'help people learn programing',
];
const getRandomWord = () => {
  const ranNum1 = Math.floor(Math.random() * 7);
  const ranNum2 = Math.floor(Math.random() * 7);
  return [subjects[ranNum1], punchlines[ranNum2]];
}


const drawCard = () => {
  const subjectRan = getRandomWord()[0];
  const punchlineRan = getRandomWord()[1];
  const cardData = {
    subject : subjectRan,
    punchline : punchlineRan
  }
  return cardData
}

const card = "{{subject}} is greater to {{punchline}}";
const template = hbs.compile(card);
const data = drawCard();
const result = template(data);

console.log(result)