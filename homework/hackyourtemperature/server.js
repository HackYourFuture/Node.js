import express from "express"
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello from backend to frontend')
})


app.post('/weather', (req, res) => {
  const { cityName } = req.body
  if (!cityName) {
    return res.status(400).json("City not existed!")
  }
  res.status(200).json(cityName)

})
app.listen(3000, () => { console.log('listening to port 3000') })
