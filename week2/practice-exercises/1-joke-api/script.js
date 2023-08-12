/**
 * 1. Chuck Norris programs do not accept input
 * 
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console. 
 * Make use of `async/await` and `try/catch`
 * 
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */


const fetch = require('node-fetch');
async function printChuckNorrisJoke() {
try{
  const response = await fetch('http://www.icndb.com/api/');
  const data =  await response.json();
   if (data.type === 'succes'){
     const joke =  data.value.jokes;
     console.log('chakinoreis jokes:' , joke);
     
   }else{
     console.error('there is no joke found);
   }
  catch (error) {
  console.log('error message', error)
  }
}

}

printChuckNorrisJoke();
