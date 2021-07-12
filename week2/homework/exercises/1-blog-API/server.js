const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs'); 
const path = require('path');


// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello world!')
})
 
//Creating post
app.post('/blogs', (req, res) => {
  if(typeof req.body == 'undefined'
  || typeof req.body.title == 'undefined'
  || typeof req.body.content == 'undefined'){
    res.status(400);
    res.send('invalid request');
  }
  fs.writeFileSync(req.body.title, req.body.content);
  res.end('ok');
})

//Updating post
//The Put method is not working and I could not figure it out!
app.put('./blogs/:title', (req, res) => {
    console.log(req.params.title)
    const requestedFile = path.join(__dirname, req.params.title)
    if(fs.existsSync(requestedFile)){
      fs.writeFileSync(title, req.body.content)
      res.end(ok);
      
    } else {
      res.status(404);
      res.send('This post does not exist!');
    }
})

//Deleting post
app.delete('/blogs/:title', (req, res) => {
  const requestedFile = path.join(__dirname, req.params.title);
  if (fs.existsSync(requestedFile)) { 
    fs.unlinkSync(requestedFile);
    res.end('ok');
  } else {
    res.status(404);
    res.send('This post does not exist!')
  }
})

//Reading post
app.get('/blogs/:title', (req, res) => {
  const requestedFile = req.params.title;
  if(fs.existsSync(requestedFile)){
    const post = fs.readFileSync(req.params.title);
    res.send(post);
  }else{
    res.status(404)
    res.send('This post does not exist!')
  }
})



app.listen(3000)