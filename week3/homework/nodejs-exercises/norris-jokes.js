const fetch = require('node-fetch');

const getNorrisJoke = async () => {
  try {
    const response = await fetch('https://api.icndb.com/jokes/random');
    const data = await response.json();
    console.log(data.value.joke)
  } catch (error) {
    console.log(error)
  }
}

getNorrisJoke()