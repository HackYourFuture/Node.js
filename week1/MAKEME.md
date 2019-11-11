# Homework Node.js Week 1

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature I

> Before we proceed, let's check to see if we have the latest versions of Node.js and the Node Package Manager (NPM) installed. You can do that by going to the Command Line (CLI) and running `node -v` and `npm -v`. Node.js should be at least **v10** and NPM should be at least **v6**.

## **1. Practice the concepts**

> The problems in the _practice the concepts_ section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

In this week's interactive exercises, we'll be going back to the command line. We'll be using software from [Nodeschool](https://nodeschool.io/) to do some exercises.

Go to your favorite command line interface and run the following command

```md
npm install -g learnyounode
```

When it's all installed, **do exercise 1 (HELLO WORLD) until 5 (FILTERED LS)**!

## **2. Node.js exercises**

> Inside of your `Node.js` fork, go to the folder `week1`. Inside of that folder, create a folder called `homework`. Inside, create a folder called `nodejs-exercises`. This will contain all the files for the following section.

### **Exercise 1: Modularization**

Lets practice how to use code from other developers in our applications. I wrote the following function this other day:

```javascript
function padLeft(val, num, str) {
  return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}
```

The function adds characters to a string so that it has at least certain number of characters. For example. `padLeft('foo', 5, '')` returns `" foo"` and `padLeft('5', 2, '0')` returns `"05"`. Pretty neat!?

You find this function brilliant and want to use it in your code.

Step 0. Create a new empty folder, e.g. `exercise1` inside your week1 homework folder

Step 1. Create a file called `andrejs-awesome-function.js` (or something else, the name is arbitrary), then copy the function `padLeft` in it.`

Step 2. Create another file for your code called `app.js`. In this file use the `padLeft` from `andrejs-awesome-function.js` to pad the `numbers = [ "12", "846", "2", "1236" ]` to exactly 4 spaces then print each padded number in the console.

Your output should be:

```javascript
  12
 846
   2
1236
```

Tips:

- use the `exports` keyword in `andrejs-awesome-function.js`
- use the `require` keyword in `app.js`
- use `forEach` to loop over the array in `app.js`
- use `padLeft(number, 4 , " ")` to pad a number to 4 characters

### **Exercise 2: npm**

Oh no! A senior developer from your team slacks you that he tried to pad some numbers to 8 characters and it was not working at all. He asks you to (politely) fix the bug as soon as possible or face the wrath of management.

When you look at the function code you realize that the function only works up to 5 characters.

```javascript
function padLeft(val, num, str) {
  return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}
```

What a stupid function! For a moment, you consider to rename the file to `andrejs-terrible-function.js`, but realize that will not help your situation in any way. You could add additional three zeroes so that it works for 8 characters

```javascript
function padLeft(val, num, str) {
  return '00000000'.replace(/0/g, str).slice(0, num - val.length) + val;
}
```

Then it would be just a matter of time before someone tries to use it for 9 characters and you get the same issue. You scour StackOverflow for related questions and discover that there is already a function that pads number available through npm https://www.npmjs.com/package/left-pad.

Perfect!. Now all you need to do is replace the function call from `padLeft` to use this new npm package called `left-pad`.


Step 0. Create a new empty folder, e.g. `exercise2`

Step 1. Initialize npm using `npm init`

Step 2. Follow the instructions on the website - from https://www.npmjs.com/package/left-pad on how to install and require the left-pad package

Step 3. Pad the numbers to 8 characters and check if it works correctly

Tips:

- be careful to be in the correct directory when running `npm install left-pad`
- use `padLeft(number, 8 , " ")` to pad a number to 8 characters

### **Exercise 3: Create an HTTP web server**

In this exercise we will build a simple web server. Simple in the sense it will only serve one html file and one javascript file. This is enough to serve a minimal web site.

Step 0. As always start with a new empty folder e.g. `exercise3`

Step 1. Initialize npm in this folder

Step 2. Create a file for the code of your application

Step 3. Copy n paste the following code. This code create a server that listens on port 3000 and replies with _Hello World!_

```javascript
var http = require('http');

//create a server
let server = http.createServer(function(req, res) {
  res.write('Hello World!'); //send a response back to the client
  res.end(); //end the response
});

server.listen(3000); //the server listens on port 3000
```

Run the code and check that it works by opening a browser at `http:\\localhost:3000`

Step 4. Instead of returning `Hello World!` the server needs to return the following HTML.

```html
<html>
  <head>
    <title>My First Web Server</title>
  </head>
  <body>
    <h1>Hello, anyone there?</h1>
    <div id="content"></div>
    <script src="script.js"></script>
  </body>
</html>
```

Run the code and check that it works by opening a browser at `http:\\localhost:3000`

Tips:

- don't be afraid to copy-paste this directly in the javascript file using as a multiline string. You shouldn't use a separate html file for now.
- Do not forget to set the content-type to `text/html` so that the browser knows how to deal with the response. Use the function `response.setHeader(name, value)` - https://nodejs.org/api/http.html#http_response_setheader_name_value

If you open the network tab you will notice that the browser tries to load the javascript `script.js`, but fails. This is because our server does not serve this file yet. So far the server only serves one thing, the html file. In order to serve different things, we somehow have to determine what is being requested. This is where the `request.url` comes in.  
If you open the network tab you can see that when the browser is requesting the html code it is using the url `http:\\localhost:3000\`. On the other hand, when the browser is requesting the javascript it is using the url `http:\\localhost:3000\script.js`.

Step 5. Make the server listen to requests at `http:\\localhost:3000\script.js` and send back the following javascript code.

```javascript
document
  .getElementById('content')
  .appendChild(document.createTextNode('Welcome to Server-land!'));
```

Tips:

- `if ( request.url === '\script.js' ) { /* send javascript */ } else { /* send HTML */ }`
- the `content-type` for javascript is `text\javascript`

Run the code and check that it works by opening a browser at `http:\\localhost:3000`. You should see the message _Welcome to Server-land!_.

Congratulations, you have created your very own working web server. In a nutshell this is how most web sites work. The client requests resources, server sends them, then the client processes the response based on the content type. This processing often leads to new requests and the cycle continues until everything is loaded and ready for the user to interact with.

_BONUS_  
 Our website is working, but looks stale. Try adding some style to it. The style should be from an external source. Add this to your html.

```html
<link rel="stylesheet" type="text/css" href="style.css" />
```

When the server gets a request at `http:\\localhost:3000\style.css` respond with some css e.g. `#content { color: blue }`. Don't forget the content-type!

## **3. Code along**

> The _code along_ section is designed to give you an idea of how different concepts fit together. You do not have to submit your code, but you have to finish the code along.

In this application you'll be building an Ebook Sales Application. You'll make it possible to add new books to a list of books. You'll even learn how to put it out online, so you can get a URL that you can use to access your application anywhere.

Enjoy!

- [Ebook Sales Application](https://www.youtube.com/watch?v=QT3_zT97_1g)

## **4. PROJECT: HackYourTemperature I**

> In this part of the homework you'll be setting up the basis of your project: `HackYourTemperature`. Inside the folder `homework`, create a new folder called `hackyourtemperature`.

In this module you'll be rebuilding an existing application, starting from scratch. The application is called `HackYourTemperature` and you can find it here: [HackYourTemperature](https://hackyourtemperature.herokuapp.com/).

Each week you'll be building a certain part of it. This week we'll get started with creating a web server, using [Express.js]](https://expressjs.com/).

1. Create a JavaScript file called `server.js` (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a `package.json` file by running `npm init -y`
3. Install and load in the necessary modules for this project: they are `express` (our web server), `express-handlebars` (our templating engine) and `axios`
4. Set up your web server using Express (creating an Express instance, listen to **port 3000**)
5. Make a `GET` request to `/` that sends the message `hello from backend to frontend!` to the client

After writing all this code you can verify that it's working by running `node server.js` from the Command Line and checking your browser at `http://localhost:3000`. The page should display the message `hello from backend to frontend!`.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature I

_Deadline Saturday 23.59 CET_
