import fetch from 'node-fetch';
import  express  from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());

app.get('/',  (req, res) => {
  res.send("<h1>Hello from backend to frontend!</h1>");
  res.end();
})

app.post('/weather' , (req , res) => {
  try{
    const city = req.body.cityName;
    if(!city){
      throw new Error("city is missing");
    }
  
  res.send(`Your city name is ${city}`);
  }catch(error) {
    res.status(400).json({error : error.message});
  }
})

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});