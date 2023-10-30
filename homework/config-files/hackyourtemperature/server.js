const express = require('express')
const app = express()
app.use(express.json());

//get method with route '/'
app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

//post method with route '/weather'
app.post('/weather',  (req, res)=>{
  let {cityName} = req.body

if (cityName) {
  res.send(`the city name is ${cityName}`)
}else{
  res.json({error : 'the city name is required'})
}
})

const port = 3000
app.listen(port, console.log(`app is on ${port}`))