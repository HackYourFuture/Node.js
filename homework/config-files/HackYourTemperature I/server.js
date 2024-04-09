import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
  res.send(`
    
  <form action="/weather" method="post">
  <label for="cityName">Enter a city name:</label>
  <input type="text" id="cityName" name="cityName">
  <button type="submit">Submit</button>
</form>
  
  ` )
});


app.post('/weather', (req, res) => {

 // const { cityName } = req.body;

  const cityName = req.body.cityName;
  res.setHeader("Content-Type", "text/css");
  res.send(`City you entered is: ${cityName}.`)
})

app.listen(PORT);
