const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
// Middleware
app.use(express.json());

// // Creating new posts

const fs = require('fs');
app.post('/blogs', (req, res) => {
	const { title, content } = req.body;
	fs.writeFileSync(title, content);
	res.end('ok');
});

// // Reading posts
app.get('/blogs/:title', (req, res) => {
	// How to get the tilte from the url parameters?
	res.sendfile(req.params.title);
});

app.listen(port, () => console.log(`The port start on ${port}..`));

// // Updating existing posts
app.put('/blogs', (req, res) => {
	// How to get the tile and content from the request??
	const { title, content } = req.body;
	if (fs.existsSync(title)) {
		fs.writeFileSync(title, content);
		res.end('ok');
	} else {
		res.end('post does not exist');
	}
});

// Deleting posts
app.delete('/blogs/:title', (req, res) => {
	// How to get the tilte from the url parameters?
	fs.unlinkSync(req.params.title);
	res.end('ok');
});
