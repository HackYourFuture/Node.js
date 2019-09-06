/* eslint-disable block-spacing */
'use strict';
const express = require('express');
const routes = require('./routes');

class Start {
  server() {
    const PORT = process.env.PORT || 3000;
    const app = express();
    app.use(express.json({
      verify: (req, res, buf) => {
        try { JSON.parse(buf); }
        catch (e) { res.status(404).json('Invalid Json'); }
      }
    }));
    routes.configure(app);
    app.listen(PORT, () => console.log(`Server is activated on port ${PORT}.`));
  }
}

const start = new Start();

start.server();
