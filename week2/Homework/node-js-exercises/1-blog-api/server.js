const express = require('express');
const path = require('path');
const fs = require("fs");

// init the app
const app = express();

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// the root route
app.get('/', (req, res) => {
    res.end("hello blogs");
});

// reading blogs
app.get('/blogs/:title', (req, res) => {
    const title = req.params.title;
    if (fs.existsSync(title)) { 
        res.sendFile(path.join(__dirname, title));
        res.end('ok');
    } else {
      res.status(400).end('This blog does not exit. ');
    }
})

// create blogs
app.post('/blogs', (req, res) => {
    // How to get the title and content from the request??
    const title = req.body.title;
    const content = req.body.content;
    fs.writeFileSync(title, content);
    // res.json({"title": title, "content": content});
    res.end('A new blog was created')
})

// undating blogs
app.put('/blogs', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    if(fs.existsSync(title)) { 
      fs.writeFileSync(title, content);
      res.end('ok')
    } else {
        res.status(400).end('This blog does not exit. ');
    }
})

// deleting blogs
app.delete('/blogs/:title', (req, res) => {
    const title = req.params.title;
    if (fs.existsSync(title)) { 
        fs.unlinkSync(title);
        res.end('ok');
    } else {
      res.status(400).end('This blog does not exit. ');
    }
})

// listening to a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`The server is running on Port ${PORT}`));
