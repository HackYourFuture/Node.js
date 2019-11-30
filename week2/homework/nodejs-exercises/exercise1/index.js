'use strict'

const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.post('/blogs', (req, res) => {
  const {
    title,
    content
  } = req.body;
  fs.writeFileSync(title, content);
  res.end('ok');
})

app.put('/blogs', (req, res) => {
  const {
    title,
    content
  } = req.body;
  // How to get the tile and content from the request??
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok')
  } else {
    res.end('post does not exist');
  }
})

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  console.log(title);
  // How to get the title from the url parameters?
  fs.unlinkSync(title);
  res.end('ok');

})

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  // How to get the title from the url parameters?
  res.sendfile(title);
})

app.listen(3000, () => {
  console.log('server started at port ' + 3000);
});