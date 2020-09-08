# Reading Material Node.js Week 1

## Agenda

These are the topics for week 1:

1. What is backend?
2. What is Node.js?
3. The client-server model
   - HTTP
4. Writing a server in Node.js
   - Modularization and Node Package Manager (NPM)
   - Express.js
5. (Optional) How does the internet work?

## 0. Video Lectures

Your teacher Andrej has made video lectures for this week's material. You can find them here: [Videos 1 - 5](https://www.youtube.com/watch?v=wTsvV0I4PlA&list=PLVYDhqbgYpYXpc_l_Vlj8yz3LjgkkWXnn)

<a href="https://www.youtube.com/watch?v=wTsvV0I4PlA&list=PLVYDhqbgYpYXpc_l_Vlj8yz3LjgkkWXnn" target="_blank"><img src="../assets/andrej.png" width="600" height="350" alt="HYF Video" /></a>

## 1. What is backend?

In software development, the code that makes the display is often separated from the code that handles the data traffic. The real world contains many examples of this division: take for example an ATM:

![ATM](../assets/atm.jpg)

What you can interact with, the buttons or the place where you can insert your card, is called the `frontend` (also known as the `user interface`). However, everything that's needed to make it work the way it does, i.e. the software needed to make it do the real work (moving data from one place to another) is called the `backend`.

In web development the term backend can be boiled down to 3 components:

- A `server`: a computer that is connected to other computers, which runs an application (see below) that allows for sharing and managing services (like a calculator or word processor) and resources (like images, text files).
- A `database`: software that manages and saves sensitive data for later use.
- An `application`: software that communicates between the database, frontend and other servers. It contains code that allows it to interact with and manipulate the server, database and other types of software services.

For more information, read:

- [Basics of backend development](https://www.upwork.com/hiring/development/a-beginners-guide-to-back-end-development/)
- [Getting started with backend development](https://codeburst.io/getting-started-with-backend-development-bfd8299e22e8)

When people refer to backend programming, they usually refer to **writing the application** part of the backend: the software that interacts with a server (a computer) and database, and moves data from one computer to the next.

This software is usually a `web server` that serves as an `API`, which can be used to move data to or get data from in order to satisfies client requests.

Why would we need a backend? There are multiple reasons:

- **Security**. We don't want any random user to directly access our sensitive data, without verifying who they are. For example, if you have an online bank account then you need to login to verify it's you. The whole process of login and verification is code written in a place (the backend) that can't be reached so easily.
- **Performance**. The speed of our user interfaces is greatly dependent upon the server that provides it. The backend contains code that makes sure it optimally makes use of the server's resources (hardware, memory, etc.) to provide the user with the best experience.
- **Software interactions**. A web application usually makes use of other people's software, web services. The code that communicates with these services and implements it into the frontend is also contained within the backend.

For more information, read:
[Why do we need the backend?](https://www.quora.com/Why-do-we-need-a-back-end-in-web-development-Cant-the-front-end-directly-send-requests-to-the-database)

## 2. What is Node.js?

Node.js is software that allows you to use JavaScript to write the `application` part of the backend. The application is written in different _.js_ files, and are then read and executed using the _node_ command in the Command Line. For example, `node script.js`.

Read the following article and code along: [Introduction into Node.js](https://codeburst.io/the-only-nodejs-introduction-youll-ever-need-d969a47ef219)

## 3. The client-server model

The `client-server model` is one of the most important concepts in web development. The easiest way to explain this concept is by using an analogy.

> Let's say you are hungry and feel like going to a restaurant. The moment you enter the restaurant you are a customer, or in IT terms a `client`. You take a seat and decide to order various things, each order representing a separate `request`: you are requesting an orange juice and requesting a nice, healthy salad. Your requests are heard by the waiter, or in IT terms the `server`. Their job is to listen to your requests and do whatever is necessary to provide you with what you want. The actual services, like cooking the food, making the drinks or doing the dishes are all done by others. However, to the client the end result of these services are all provided by the server. You don't want to know who performs what service, you just want to eat. When the server comes back with whatever you ordered, they provide you with a `response`. This happens whether or not they could fulfill your requests.

In a web application, the process is very similar. The browser, by way of the application user interface, is the `client`. Some computer that has the data and services you want is the `server`.

Let's say you log in to your online bank account:

As the client, you want to see the amount of money you currently have. The browser sends out a request to the server, who then activates the necessary services (in this example, some kind of database) and returns with a response containing the exact amount of money you currently have in the bank.

### 3.1. Hypertext Transfer Protocol - HTTP

If you've ever typed in a URL you might've seen the letters HTTP at the beginning of it, i.e. `http://www.hackyourfuture.net`. It stands for **Hypertext Transfer Protocol** and it is the main way of sending requests and receiving data/responses on the internet.

Let's see what happens when you type in a url in your browser. First, the browser sends an HTTP request to the server. The server sends back an HTTP response that contains html code that describes how the page needs to look like.

Next, the browser starts scans the HTML and starts rendering elements on the page. During this process the browser may encounter an image tag in the html `<img src="my-website.com/photo.jpg" />`. The image source is a URL so the browser will automatically make another HTTP request to get the image.

A similar thing happens for script and link tags that load JavasSript and CSS files respectively. After the browser loads a JavasSript file, it will start executing it. The JavasSript code can, in turn, start new HTTP requests with `XMLHttpRequest` to load more resources, for example, some JSON data. This entire process is nicely visualized in the diagram below:

![Requests](https://fullstackopen.com/static/7094858c9c7ec9149d10607e9e1d94bb/14be6/19e.png)

The following problem arises in HTTP communication: Because HTML, CSS, JavaScript, and JSON are ultimately just text files, the server can not automatically determine what to do with it. Therefore the client sends a special _header_ called `Content-Type` in the request. The most common content types are:

- `text/javascrpt`
- `text/html`
- `text/stylesheet`
- `application/json`

Look into the following resources to increase your understanding:

- [The Client Server Model](https://www.youtube.com/watch?v=L5BlpPU_muY)
- [Client-Server Model & Structure of a Web Application](https://medium.freecodecamp.org/how-the-web-works-part-ii-client-server-model-the-structure-of-a-web-application-735b4b6d76e3)
- [Fundamentals of Web apps](https://fullstackopen.com/en/part0/fundamentals_of_web_apps)

## 4. Writing a web server in Node.js

Node.js is powerful because we can use the language we already know, JavaScript, to write backend applications. Watch the following video and code along: [Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)

### Modularization and Node Package Manager - npm

Writing backend application is not the easiest thing. Imagine having to write all the logic for sending and receiving HTTP requests via the internet, making sure that the request is correctly formatted as binary 1s and 0s. The code will be very long and complex.

Luckily, we do not have to write everything in one file and we do not have to write everything from scratch. Instead, we can split our code into multiple files and also re-use code that other people (or we have) have written before.

The concept of splitting up code into reusable pieces is called **modularization** and the reusable pieces **modules** (sometimes called _packages_ or _libraries_). The whole modularization in Node.js is performed with the help of a small tool called _Node Package Manager_ (or _npm_ for short).

In the following section we'll highlight one module, called **Express.js**, with which we can easily create web servers.

Read the following article and code along: [A Beginner’s Guide to npm — the Node Package Manager](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

Look into the following resources to increase your understanding:

- [NPM official website](https://www.npmjs.com)
- [An Absolute Beginner's Guide to Using npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

### 4.2 Express.js

In Node.js it's possible to make a HTTP server, using the native `http` module, as we saw in the Node.js crash course video. However, this is rarely used in practice. Instead, we'll use [Express.js](https://expressjs.com/en/4x/api.html), a backend framework for Node.js that can do what the `http` module does and much more (in a simpler, faster and more readable way).

Practically speaking, what can we do with a web server like `http` or `Express`? All the magic that is needed so we can successfully get what we want from an application:

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
