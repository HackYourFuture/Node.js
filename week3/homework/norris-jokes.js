const fetch = require('node-fetch');
const url = 'https://api.icndb.com/jokes/random';

async function getNorrisJoke(){
  try{
    const response = await fetch(url);
    const  data = await response.json();
    console.log(data);
    console.log(data.value.joke)
  }catch(err){
    console.log(err)
  }
  
}
getNorrisJoke();