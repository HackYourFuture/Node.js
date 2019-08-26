"use strict";

// version 4.1

const http = require("http");

http
  .createServer(function(req, res) {
    const url = req.url;

    console.log(url);

    if (url === "" || url === "/") {
      
      /*
      Note that we're sending back 200 because it is a successful response. But now we're also sending back this extra
      thing called `Content-Type`. This is to tell the browser what kind of data we're sending. We're not sending html, we're
      sending JSON.
      */
      res.writeHead(
        200,
        {
          'Content-Type': 'application/json'
        }
      );

      /*
      The full form of JSON is JavaScript Object Notation. As you can see, JSON is very similar to Javascript objects. And we
      can create JSON by starting with a Javscript object.
      */
      const response = {
        message: "You have reached the root!"
      }

      /*
        We call a built-in function `JSON.stringify` to convert the Javascript object into JSON and then we write it out like
        before.
      */
      res.write(JSON.stringify(response));

      // Let's not forget to end the response!
      res.end();

    } else if (url === "/contacts") {

      const response = {
        message: "HYF Brussels"
      }

      res.writeHead(
        200,
        {
          'Content-Type': 'application/json'
        }
      );

      res.write(JSON.stringify(response));
      res.end();

    } else {

      const response = { 
        message: "You tried ${url}. Please try something else!" 
      };

      res.writeHead(
        404,
        {
          'Content-Type': 'application/json'
        }
      );
      res.write(JSON.stringify(response));
      res.end();
    }
  })
  .listen(8080);
