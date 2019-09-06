# Node.js Week 1 (Homework)

## Learning goals

By doing this homework you will learn:

- How to use `Node.js in the Command Line`
- How to create a custom `web server` using Express
- How to use the `network tab` in the browser developer tools

> Before we proceed, let's check to see if we have the latest versions of Node.js and the Node Package Manager (NPM) installed. You can do that by going to the Command Line (CLI) and running `node -v` and `npm -v`. Node.js should be at least **v10** and NPM should be at least **v6**.

## 1. Create an HTTP web server

Create an HTTP web server using the native Node.js `http` module.

1. The server will be a functioning web server that can serve a very simple web site. When opening the server url in the browser e.g. `http:\\localhost:3000` the server needs to serve the following html:

```html
<html>
  <head>
    <title>My First Web Server</title>
  </head>
  <body>
    <div id="content"></div>
    <script src="script.js"></script>
  </body>
</html>
```

Do not forget to set the content-type to `text/html` so that the browser knows how to deal with the response.

2. Once the browser receives the html it will process it and detect the `script` tag. The browser will then try to load this script from the server at the endpoint `http:\\localhost:3000\script.js`. Your server needs to return a javascript that inserts some text under `content`.

```javascript
document.getElementById("content").appendChild(document.createTextNode("Hello and Welcome to Server-land!"));
```
Do not forget to set the correct content-type.

Congratulations, you have created your very own working web server. In a nutshell this is how most web sites work. The client requests resources, then processes them based on the content type. This processing often leads to new requests and the cycle continues until everything is loaded and ready for the user to interact with.

3. *BONUS*: Our website is working, but looks really stale. Try adding some style to it. The style should be from an external source. Add this to your html (from step 1)

```html
<link rel="stylesheet" type="text/css" href="style.css"/>
```

When the server gets a request at `http:\\localhost:3000\style.css` respond with some css e.g. `#content { color: blue }`. Don't forget the content-type and be creative.

## 2. [PROJECT] Setting up HackYourTemperature

In this part of the homework you'll be setting up the basis of your project. To start you first have to make a project folder. In the same folder that holds your other homework, create a new folder called `hackyourtemperature`. Then follow the following instructions:

1. Create a JavaScript file called `server.js` (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a `package.json` file by running `npm init`
3. Install and load in the necessary modules for this project
4. Set up your web server using Express (creating an Express instance, listen to **port 3000**)
5. Make a `GET` request to `/` that sends the message `hello from backend to frontend!` to the client

After writing all this code you can verify that it's working by running `node server.js` from the Command Line and checking your browser at `http://localhost:3000`. The page should display the message `hello from backend to frontend!`.

## Extra materials to practice

Have time left over? Try out the following resources to learn more about servers and how to use Node.js:

- [Node JS Tutorial for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp)
