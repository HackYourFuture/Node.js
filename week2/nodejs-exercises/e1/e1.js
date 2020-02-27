'use strict'

const express = require('express');
const fs = require ('fs');
const app = express();
const port = 3000;


app.use(express.json());


// creating blog, checking what was req from the client (using Postman to check for now)
//fs.writeFileSync(file, data[, options])
app.post('/blogs', (req, res) => {
  fs.writeFileSync(__dirname +`/blogs/${req.body.title}.txt`, req.body.content);
  res.end('uploaded')
})

//updating a post. 
app.put('/blogs', (req, res) => {
  const fileSearched=__dirname + `/blogs/${req.body.title}.txt`
  if (fs.existsSync(fileSearched)) {
    fs.writeFileSync(fileSearched, req.body.content);
    res.end('Updated')
  }else {
    res.end('post does not exist');
  }
})

//deleting a post.
app.delete('/blogs/:title', (req, res) => {
  const fileSearched=__dirname + `/blogs/${req.params.title}.txt`
  if (fs.existsSync(fileSearched)) {
    fs.unlinkSync(fileSearched)
    res.end('Deleted')
  } else{
    res.end('post does not exist');
  }
})

//getting a post.
app.get('/blogs/:title', (req, res) => {
  const fileSearched=__dirname + `/blogs/${req.params.title}.txt`
  if (fs.existsSync(fileSearched)) {
    res.sendfile(fileSearched);
  } else{
    res.end('post does not exist');
  }
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})