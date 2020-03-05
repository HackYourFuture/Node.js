const express = require('express')
const app = express()
const fs = require("fs");
app.use(express.json());



app.post('/blogs', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    fs.writeFileSync(title, content);
    res.end('ok')
})

app.put('/blogs', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    if (fs.existsSync(title)) {
        fs.writeFileSync(title, content);
        res.end('it is updated')
    } else {
        res.end('post does not exist');
    }
})

app.delete('/blogs/:title', (req, res) => {
    const title = req.params.title;
    fs.unlinkSync(title);
    res.end('it is deleted');
})

app.get('/blogs/:title', (req, res) => {
    const title = req.params.title;
    // res.sendfile(title);
    res.sendFile(title, { root: __dirname, headers: { 'Content-Type': 'text/plain' } });
})

app.listen(3000, () => console.log('listen to port'));