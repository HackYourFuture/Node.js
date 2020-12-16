const fetch = require('node-fetch');
const url = 'https://restapiabasicauthe-sandbox.mxapps.io/api/books'
async function getBook(){
  try{
const response = await fetch(url,{
  headers: { 'Authorization': 'Basic YWRtaW46aHZnWDhLbFZFYQ==' }
});
const data = await response.json();

console.log(data)
  }catch(err){
    console.log(err)
  }
};
getBook();