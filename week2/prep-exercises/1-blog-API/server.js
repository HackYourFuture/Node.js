const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Create 
app.post('/blogs', (req, res) => {
    const { title, content } = req.body;

    if (title && content) {
        fs.writeFileSync(`${title}.json`, JSON.stringify({ title, content }));
        res.status(201).json({ message: "The post created" });
    } else {
        res.status(400).json({ error: "Title and content are required" });
    }
});

// Read 
app.get('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const fileName = `${title}.json`;

    if (fs.existsSync(fileName)) {
        const post = JSON.parse(fs.readFileSync(fileName));
        res.json(post);
    } else {
        res.status(404).json({ error: "The post not exist!" });
    }
});

// Update 
app.put('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const fileName = `${title}.json`;

    if (fs.existsSync(fileName)) {
        const { content } = req.body;
        if (content) {
            fs.writeFileSync(fileName, JSON.stringify({ title, content }));
            res.json({ message: "The post updated" });
        } else {
            res.status(400).json({ error: "Content is required to update" });
        }
    } else {
        res.status(404).json({ error: "This post not exist!" });
    }
});

// Delete
app.delete('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const fileName = `${title}.json`;

    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        res.json({ message: "The post deleted" });
    } else {
        res.status(404).json({ error: "The post not exist!" });
    }
});

// Read 
app.get('/blogs', (req, res) => {
    const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.json'));
    const posts = files.map(file => {
        const data = JSON.parse(fs.readFileSync(file));
        return { title: data.title };
    });

    res.json(posts);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
