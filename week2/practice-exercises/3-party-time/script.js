
/**
 * 3: Party time
 * 
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const fetch = require('node-fetch')

async function makeReservation() {
  // YOUR CODE GOES IN HERE
  const api = 'https://reservation100-sandbox.mxapps.io/rest-doc/api';
  const headers = {
    'Content-type': 'application.json'
  }
  const body = {
    Details: {
      name : 'Hadeel',
      numberOfPeople : 2
    }
  }
  try {
    const response = await fetch(api,{
      method : 'POST',
      headers,
      body
    })
    const responseData = response.json()
    console.log(responseData)
  } catch (error) {
    console.error(error)
  }
}
makeReservation();