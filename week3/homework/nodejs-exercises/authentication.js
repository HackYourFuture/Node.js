const fetch = require('node-fetch');

const getBooks = async () => {
  try {
    const response = await fetch('https://restapiabasicauthe-sandbox.mxapps.io/api/books', {
      headers: { 'Authorization': 'Basic YWRtaW46aHZnWDhLbFZFYQ==' }
    });
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
getBooks();