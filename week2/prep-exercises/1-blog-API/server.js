const express = require('express')
const fs = require('fs')
const path = require('path');

const app = express();

app.use(express.json())
 
// GET
// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})


// POST
app.post('/blogs', (req, res) => {
  // How to get the title and content from the request??
  const title = req.body.title;
  const content = req.body.content;
  // if(title && content){
  //   fs.writeFileSync(`1-blog-api/${title}.txt`, content);
  //   res.send('Ok')
  // }else{
  //   res.status(400).send('Both Title and content are requierd!')
  // }
  if (title && content) {
    const directory = path.join(__dirname, '1-blog-api');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    fs.writeFileSync(path.join(directory, `${title}.txt`), content);
    res.send('ok');
  } else {
    res.status(400).send('Both title and content are required.');
  }
})


// PUT
app.put('/blogs/:title', (req, res) => {
  // How to get the title and content from the request?
  // What if the request does not have a title and/or content?
  const title = req.params.title;
  const content = req.body.content;

  if(title && content){
    const filePath = path.join(__dirname, '1-blog-api', `${title}.txt`);
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      res.end('ok')
    }
    else {
      // Send response with error message
      res.status(404).send('This file does not exist!');
    }
  }else{
    res.status(400).send('Title and content are required.');
  }
  
})


// DELETE
app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  const filePath =  path.join(__dirname, '1-blog-api', `${title}.txt`)

  if (fs.existsSync(filePath)) { // Add condition here
    fs.unlinkSync(filePath);
    res.end('ok');
  } else {
    // Respond with message here
    res.status(400).send('This post does not exist!')
  }
})
 

// READ
app.get('/blogs/:title', (req, res) => {

  // How to get the title from the url parameters?
  const title = req.params.title;
  
  // check if post exists
  const post = fs.readFileSync(title);
  if(post){
    fs.fs.readFileSync(title);
    req.status(200).req.send(content)
  }
  // send response
  res.status(400).send('This post does not exist!')
})


// Reading all posts
app.get('/blogs', (req, res) => {
  // how to get the file names of all files in a folder??
  const blogFiles = fs.readdirSync('1-blog-api');
  const blogTitles = blogFiles.map(file =>{
    const title = file.slice(0, -4);
    return {title}
  })
  res.json(blogTitles)
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})