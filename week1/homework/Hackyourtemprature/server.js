const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");

    res.send("<h1>hello from backend to frontend!</h1>");
});

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
});
