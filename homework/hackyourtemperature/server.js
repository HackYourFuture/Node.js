import { Express } from "express";
import { json } from "express";

const app = Express();
app.use(json());
const PORT = 3000;

app.get('/', (req,res)=>{
  res.send('hello from backend to frontend');
});

app.listen(PORT, () =>{
  console.log(`serv is runiig on port ${PORT}`);
});

app.post('/weather', (req,res) => {
  const cityName = req.body.cityName;
  res.send(`${cityName} is a capital city`)
});
