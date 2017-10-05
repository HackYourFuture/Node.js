# Refresher

## Program and modules
You run a program by typing `node index.js` (your file name) in the console.
This top level javascript file is known as the application js file or the main js file, by convention it is known as `index.js` or `app.js`

In there you could write everything, and I mean everything, that goes in to your app. But as your app gets bigger and more complicated, it is useful to break it into different parts – or modules.

You do this by using the `require` keyword. It looks like this `const Something = require('./path/to/file')`.
IMPORTANT > When you import, or require a module, any top level code that is on the file is going to execute.
For example, try putting a console log inside the imported module. You will see that it prints it for you. You often want to import only certain functionality from a module. You can do this with the exports.
Require, or import, brings in the module as an object.
and you can bring in everything or select only certain parts. like so:
```js
///helloWorld.js module
console.log("hello world");
function sayHello(){
  console.log("hello!");
}
module.exports = {sayHello: sayHello}
/// index.js
var sayHello = require('./helloWorld').sayHello
sayHello()
```
But if you just wanted to export the function directly, you can overwrite the exports module (like everything in js!) and do:
```js
///helloWorld.js module
console.log("hello world");
module.exports = function sayHello(){
  console.log("hello!");
}
/// index.js
var sayHello = require('./helloWorld')
sayHello()
```
These are two very common patterns that you will see very often. Either import everything or only specific functions.

## Built in modules
for example the `fs` file. With this you do not need to specify the path.
To learn how to use them or what methods are available go to the [Node Doc site ](https://nodejs.org/api/fs.html)
NOTE: the stability indicator. FS = VERY STABLE
```js
///helloWorld.js module
console.log("hello world");
module.exports = function sayHello(){
  return "hello you";
}
/// index.js
var sayHello = require('./helloWorld')
const fs = require('fs')
fs.writeFile('./hello.txt', sayHello() )
```

## Asynchronous
One of the main features of Node js is its asynchronous I/O. Asynchronous means doing something at a later time, and I/O input and output, IO does not only apply to reading and writing (Files) but also to TCP and HTTP.
The programs are single threaded and single process.
```js
///helloWorld.js module
console.log("hello world");
module.exports = function sayHello(){
  console.log("about to write the file");
  return "hello you";
}
/// index.js
var sayHello = require('./helloWorld')
const fs = require('fs')
console.log("About to call file write");
fs.writeFile('./hello.txt', sayHello(), function(err, result){
  console.log("uff finally done");
})
var txt = fs.readFile('./hello.txt', function(err, result){
  if(err) return console.error(err);
  console.log( result.toString() );
  return  result.toString() ;
})
console.log(txt);
console.log("waiting for the file write");
```
Notice that neither function blocks the thread.
