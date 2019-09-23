# Reading Material Node.js Week 1

## Agenda

These are the topics for week 1:

1. What is backend?
2. What is Node.js?
   - Node Package Manager (NPM)
   - Express.js
3. The client-server model
4. Writing a server in Node.js
   * Modularization and npm
   * express.js  
5. (Optional) How does the internet work?

## 1. What is backend?

In software development, we separate the user experience and utility (the `frontend`) from the code that actually makes it work (the `backend`). The real world contains many examples of this division: take for example an [ATM](../assets/atm.jpg). What you can interact with it (press a button or insert a card), you are dealing with the `user interface`; which is the end result of frontend code. However, everything that's needed to make it work like that is found within the device: this is the hardware and software needed to make it work the way it does.

In web development the term backend can be boiled down to 3 components:

- A `server`: a computer that is connected to other computers, which runs an application (see below) that allows for sharing and managing services (like a calculator or word processor) and resources (like images, text files).
- A `database`: software that manages and saves sensitive data for later use.
- An `application`: software that communicates between the server, database and frontend. It contains code that allows it to interact with and manipulate the server, database and other type of software services.

For more information, read:
[Basics of backend development](https://www.upwork.com/hiring/development/a-beginners-guide-to-back-end-development/)
[Getting started with backend development](https://codeburst.io/getting-started-with-backend-development-bfd8299e22e8)

When people refer to backend programming, they usually refer to **writing the application** part of the backend: the software that interacts with a server and database, and moves data from one computer to the next. The application consists of code that will be read by a database and/or server, so that they know what to do with the incoming input.

Why would we need a backend? There are multiple reasons:

- **Security**. We don't want any random user to directly access our sensitive data, without verifying who they are. For example, if you have an online back account then you need to login to verify it's you. The whole process of login and verification is code written in a place that can't be reached so easily.
- **Performance**. The speed of our user interfaces is greatly dependent upon the server that provides it. The backend contains code that makes sure it optimally makes use of the server's resources (hardware, memory, etc.) to provide the user with the best experience.
- **Software interactions**. A web application usually makes use of other people's software, web services. The code that communicates with these services and implements it into the frontend is also contained within the backend.

For more information, read:
[Why do we need the backend?](https://www.quora.com/Why-do-we-need-a-back-end-in-web-development-Cant-the-front-end-directly-send-requests-to-the-database)

## 2. What is Node.js?

Node.js is software that allows you to use JavaScript to write the `application` part of the backend. The application is written in different _.js_ files, and are then read and executed using the _node_ command in the Command Line. For example, `node script.js`.

Read the following article and code along: [Introduction into Node.js](https://codeburst.io/the-only-nodejs-introduction-youll-ever-need-d969a47ef219)

Software builds on other software. Node.js is powerful because it allows us to use software others have written to help build our own unique applications. In Node.js these are called `modules`/`packages`/`dependencies` (can be used interchangeably). An easy way to get access to these is by using the Node Package Manager, also known as `npm`.

Read the following article and code along: [A Beginner’s Guide to npm — the Node Package Manager](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

It is also powerful because we can use the language we already know, JavaScript, to write backend applications. Watch the following video and code along: [Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)

## 3. The client-server model

The client-server model is one of the most important concepts within web development. The easiest way to explain this concept is by using an analogy.

> Let's say you are hungry and feel like going to a restaurant. The moment you enter the restaurant you are a customer, or in IT terms a `client`. You take a seat and decide to order various things, each order representing a separate `request`: you are requesting an orange juice and requesting a nice, healthy salad. Your requests are heard by the waiter, or in IT terms the `server`. Their job is to listen to your requests and do whatever is necessary to provide you with what you want. The actual services, like cooking the food, making the drinks or doing the dishes are all done by others. However, to the client the end result of these services are all provided by the server. You don't want to know who performs what service, you just want to eat. When the server comes back with whatever you ordered, they provide you with a `response`. This happens whether or not they could fulfill your requests.

In web development the same thing happens. The browser is the client, and some computer that has the data you want is the server. Let's say you login to your online bank account. As the client you want to see the amount of money you currently have. The browser sends out a request to the server, who then activates the necessary services (in this example, some kind of database) and returns with a response containing the exact amount of money you currently have in the bank.

If you've ever typed in a URL you might've seen the letters HTTP at the beginning of it, i.e. `http://www.hackyourfuture.net`. It stands for **Hypertext Transfer Protocol** and it is the main way of sending requests and receiving responses on the internet.

When you type in a url in your browser then the browser sends an HTTP request to the server. The server sends back an HTTP response that contains html code that describes how the page needs to look like. Next the browser starts scans the HTMLand starts rendering elements on the page. During this process the browser may encounter an image tag in the html `<img src="my-website.com/photo.jpg" />`. The image source is a URL so the browser will automatically make another HTTP request to get the image.

A similar thing happens for script and link tags which load javascript and css files respectively. After the browser loads a javascript file, it will start executing it. The javascript code can in turn start new http requests with `XMLHttpRequest` to load, for example, some json data.

![Requests](https://fullstackopen.com/static/7094858c9c7ec9149d10607e9e1d94bb/14be6/19e.png)

The following problem arises in HTTP communication: Because html, css, javascript and json are all just text files, the browser can not determine what to do with it. Therefore the server sends a special _header_ called content-type in the request. The most common content types are:

- `text/javascrpt`
- `text/html`
- `text/stylesheet`
- `application/json`

Look into the following resources to increase your understanding:

- [The Client Server Model](https://www.youtube.com/watch?v=L5BlpPU_muY)
- [Client-Server Model & Structure of a Web Application](https://medium.freecodecamp.org/how-the-web-works-part-ii-client-server-model-the-structure-of-a-web-application-735b4b6d76e3)
- [Fundamentals of Web apps](https://fullstackopen.com/en/part0/fundamentals_of_web_apps)

## 4. Writing a server in Node.js


### 4.1 Modularization and Node Package Manager - npm

Writing backend code is not the easiest thing. Imagine having to write all the logic for sending and receiving HTTP requests via the internet, making sure that the request is correctly formatted as binary 1s and 0s. The code will be very long and complex. Luckily, we do not have to write everything in one file and we do not have to write everything from scratch. 
Instead, we can split our code into multiple files and also re-use code that other people (or we have) have written before. 

The concept of splitting up code into reusable pieces is called **modularization** and the reusable pieces **modules** (sometimes called *packages* or *libraries*). The whole modularization in node is performed with the help of a small tool called *Node Package Manager* or *npm* for short. To give you an idea of just how easy it is to use *npm*, lets imagine that we want to reuse code for writing an http server. The code is prepared/packaged by other programmers and made available online under the name `express`.

If we want to use `express` in our code we have to do 2 things

1. download (install) the code from the internet using the following command in the command line:

```md
npm install express
```

2. Declare that we will use Express at the top of the JavaScript file:

```js
let express = require("express");`
```

You can find many other packages online at [https://www.npmjs.com/search?q=express](https://www.npmjs.com/search?q=express)

During the homework exercises you will practice how to use npm in more detail.

Look into the following resources to increase your understanding:

- [What is require?](https://nodejs.org/zh-cn/knowledge/getting-started/what-is-require/)
- [An Absolute Beginner's Guide to Using npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

### 4.2 Express.js

In Node.js it's possible to make a HTTP server, using the native `http` module. However, this is rarely used in practice. Instead, we'll use [Express.js](https://expressjs.com/en/4x/api.html), a backend framework that can do what the `http` module does and much more (in a simpler, faster and more readable way).

Practically speaking, what can we do with a web server like `http` or `Express`? All the magic that makes the frontend work:

- Get and store data that comes from the frontend
- Make API calls to other services
- Secure data that comes from both the frontend and the database
- Any other type of calculation or business logic

For more research, use the following resources:

- [Express JS Crash Course](https://www.youtube.com/watch?v=L72fhGm1tfE)
- [Going out to eat and understanding the basics of Express.js](https://medium.freecodecamp.org/going-out-to-eat-and-understanding-the-basics-of-express-js-f034a029fb66)

## 5. (Optional) How does the internet work?

This part is optional, but still recommended to understand the wider context of what we as web developers deal with, namely `the internet`:

- YouTube Series: [How The Internet Works](https://www.youtube.com/playlist?list=PLzdnOPI1iJNfMRZm5DDxco3UdsFegvuB7)
- [How the Internet Works for Developers I](https://www.youtube.com/watch?v=e4S8zfLdLgQ)
- [How the Internet Works for Developers II](https://www.youtube.com/watch?v=FTAPjr7vgxE)

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
