> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture Node.js - Reading material week 2

### HTTP Module
This should give you a real quick overview of what we'll be doing in the bnext class.
> Read:https://www.w3schools.com/nodejs/nodejs_http.asp

This should mostly make sense to you as well, except the body parsing part. So have a read and ignore the things you think you've never seen before.
> Read: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

### Asynchronous callbacks
Although most of this was already covered by the JavaScript class, let's refresh our memories on Callbacks.
> Watch: https://www.youtube.com/watch?v=pTbSfCT42_M

-> Read: [Understanding Asynchronous JavaScript Callbacks Through Household Chores
 -](https://medium.freecodecamp.com/understanding-asynchronous-javascript-callbacks-through-household-chores-e3de9a1dbd04#.8ilr4a7aj) _estimated time: ~1 hour_

## Code in class

### promises (not there yet)

This folder contains two examples. the file `index.js` is the same exercise we did in the class in the week0 but with Promises. It's interesting to see that we did not use any external libraries. Try to rewrite the same exercise using [Bluebird Promise library](http://bluebirdjs.com/docs/getting-started.html), remember to `npm install` the library.

(NOT THERE YET)The file `wait.js` shows how to write a callback style function, and transforming it in a promise. It' s easy in this example to see that the functions are running simultaneously.

### http_server

The HTTP server is a slightly improved version that we did in the class includes:
 - Code split in modules
 - Promises
 - `http` `fs` and `util` code modules
 - it serves the public folder
 - *this is very far from a complete implementation of an HTTP server* therefore take it as exercise to understand and use the code modules of node

 Try to run the server and make some request with your browser
