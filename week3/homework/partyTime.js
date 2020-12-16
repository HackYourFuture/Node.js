const fetch = require('node-fetch');
const url ='https://reservation100-sandbox.mxapps.io/api/reservations'

const member={
  name:'A.Al-Mosto',
  numberOfPeople : 2
}

async function makeReservation(member){
  try{
    const response = await fetch(url,{
      method : 'post',
      body: JSON.stringify(member),
      headers: {'Content-Type':'application/json'}
    });
    const responseText = await response.text 
    console.log(responseText)
  }catch(err){
    console.log(err)
  }
}

makeReservation(member);