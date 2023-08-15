
/**
 * 2. Authentication
 * 
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

const fetch = require('node-fetch');
const {Base64} = require('js-base64');

const username = 'Hadeel';
const password = 'hadeel1994'
const credentials = Base64.encode(`${username}:${password}`)
const headers = {
  Authorization : `Basic ${ecredentials}`
}

async function printBooks() {
  // YOUR CODE GOES IN HERE
  try {
    const response = await fetch('https://restapiabasicauthe-sandbox.mxapps.io/api/books'),
    {
      const data = await response.json();
      console.log(data)
    }
  } catch (error) {
      console.error('An error occurred', error.message)
  }
}

printBooks();