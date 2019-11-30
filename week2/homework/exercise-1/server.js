const express = require('express');
const app = express();
const fs = require('fs');
const blogs = require('./blogs');
const PORT = 3000;

app.use(express.json());

app.get('/blogs', (req, res) => blogs.getBlogs(req, res));  // I couldn't make this one work
app.get('/blogs/:title', (req, res) => blogs.getOneBlog(req, res));
app.post('/blogs', (req, res)=> blogs.createBlog(req, res));
app.put('/blogs/:title', (req,res)=> blogs.updateBlog(req,res));
app.delete('/blogs/:title', (req,res)=> blogs.deleteBlog(req,res));

app.listen(PORT, ()=>{
    console.log('Server has started on port ' + PORT)
})


