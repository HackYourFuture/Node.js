const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

//Main route
app.get('/', (req, res) => {
  res.end('Hello blogger!!')
})

//Read a blog post
app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    res.sendFile(path.join(__dirname, title));
  } else {
    res.status(404);
    res.end(`Blog post named "${title}" does not exist!`);
  }
})

//Create a blog post
app.post('/blogs', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.status(201);
  res.end(`Blog post named "${title}" was created`);
});

//Update a blog post
app.put('/blogs', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end(`Blog post named "${title}" was updated!`);
  } else {
    res.status(404);
    res.end(`Blog post named "${title}" does not exist!`);
  }
});

//Delete a blog post
app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end(`Blog post named "${title}" was deleted!`);
  } else {
    res.status(404);
    res.end(`Blog post named "${title}" does not exist!`);
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));