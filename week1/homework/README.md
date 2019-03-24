# Node.js Week 1 (Homework)

## Learning goals

By doing this homework you will learn:

- How to use `Node.js in the Command Line`
- How to create a custom `web server` using Express
- How to use the `network tab` in the browser developer tools

## Prerequisites

Before we proceed, let's check to see if we have the latest versions of Node.js and the Node Package Manager (NPM) installed. You can do that by going to the Command Line (CLI) and running `node -v` and `npm -v`. Node.js should be at least **v10** and NPM should be at least **v6**.

## 1. Create an HTTP web server

Create an HTTP web server using the native Node.js `http` module.

## 2. [PROJECT] Setting up HackYourTemperature

In this part of the homework you'll be setting up the basis of your project. To start you first have to make a project folder. In the same folder that holds your other homework, create a new folder called `hackyourtemperature`. Then follow the following instructions:

1. Create a JavaScript file called `server.js` (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a `package.json` file by running `npm init`
3. Install and load in the necessary modules for this project
4. Set up your web server using Express (creating an Express instace, listen to a port)
5. Make a basic `GET` request to `/` that sends the message `hello from backend to frontend!` to the client

After writing all this code you can verify that it's working by running `node server.js` from the Command Line and checking your browser at `http://localhost:3000`. The page should display the message `hello from backend to frontend!`.

## Extra materials to practice

Have time left over? Try out the following resources to learn more about servers and how to use Node.js:

- [Node JS Tutorial for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp)
-
