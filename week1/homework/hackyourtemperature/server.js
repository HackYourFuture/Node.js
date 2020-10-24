/*
HackYourTemperature

Create a web server, using Express.js.
The necessary modules for this project: they are express (our web server), express-handlebars (our templating engine) and axios.
*/

//Set up your web server using Express (creating an Express instance
const express = require('express');
const app = express();

//Make a GET request to / that sends the message hello from backend to frontend! to the client
app.get('/', function(req, res){
    res.send('hello from backend to frontend!');
    console.log('running on port 3000');
});

//listen to port 3000
app.listen(3000);