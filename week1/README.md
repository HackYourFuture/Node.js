# Node.js Week 1 (Readings)

## Agenda

1. What is backend?
2. What is Node.js?
3. The client-server model
4. Hypertext Transfer Protocol (HTTP)
5. Representational State Transfer (REST)
6. (Optional) How does the internet work?

## 1. What is backend?

In software development, we separate the user experience and utility (the `front end`) from the code that actually makes it work (the `back end`). The real world contains many examples of this division: take for example an [ATM](../images/atm.jpg). What you can interact with it (press a button or insert a card), you are dealing with the `user interface`; which is the end result of frontend code. However, everything that's needed to make it work like that is found within the device: this is the hardware and software needed to make it work the way it does.

In web development the term backend can be boiled down to 3 components:

- A `server`: a computer that is connected to other computers, which runs an application (see below) that allows for sharing and managing services (like a calculator or word processor) and resources (like images, text files).
- A `database`: software that manages and saves sensitive data for later use.
- An `application`: software that communicates between the server, database and frontend. It contains code that allows it to interact with and manipulate the server, database and other type of software services.

[Basics of backend development](https://www.upwork.com/hiring/development/a-beginners-guide-to-back-end-development/)

When people refer to backend programming, they usually refer to **writing the application** part of the backend: the software that interacts with a server and database, and moves data from one computer to the next. The application consists of code that will be read by a database and/or server, so that they know what to do with the incoming input.

Why would we need a backend? There are multiple reasons:

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

Look into the following resources to increase your understanding:

- [The Client Server Model](https://www.youtube.com/watch?v=L5BlpPU_muY)
- [Client-Server Model & Structure of a Web Application](https://medium.freecodecamp.org/how-the-web-works-part-ii-client-server-model-the-structure-of-a-web-application-735b4b6d76e3)

## 4. HTTP

When you've typed in a URL you might've seen the letters HTTP at the beginning of it, i.e. `http://www.hackyourfuture.net`. It stands for Hypertext Transfer Protocol and is the basic way of sending requests and receiving responses.

Like verbal communication, there's the _content_ (WHAT you are saying) and the _style_ (HOW you are saying it). HTTP refers to the \***\*style\*\*** of online communication. How you communicate over the web is done through specific HTTP methods (also called HTTP verbs), that describe what type of request is being made. The most important ones are:

- **GET**. This type of request is only about getting data from the server. Whenever a user enters a new webpage, this usually means a GET request gets send to the server to get the required files to display that webpage. All other data in the website stays unaffected.
- **POST**. This type of request allows the client to submit new data to the server. Generally speaking, its purpose is to store this new data into a database, or manipulate it and later return it back to the client.
- **PUT**. This type of request allows the client to update existing data, which is already present in the client. The data is edited and then send back to the server, similar to the POST request but more semantic.
- **DELETE**. This type of request tells the server to delete a particular set of data or resources.

Why do you need to know all of this? HTTP is the foundation of how client-server interactions work on the web. It's important to have a universal policy that everyone holds on to, in order to have fast and effective online communication.

Look into the following resources to increase your understanding:

- [The Http and the Web: Http explained](https://www.youtube.com/watch?v=eesqK59rhGA)
- [Basics concepts of web applications](https://www.youtube.com/watch?v=RsQ1tFLwldY)

## 5. Express

## 6. (Optional) How does the internet work?

This part is optional, but still recommended to understand the wider context of what we as web developers deal with:

- YouTube Series: [How The Internet Works](https://www.youtube.com/playlist?list=PLzdnOPI1iJNfMRZm5DDxco3UdsFegvuB7)
- [How the Internet Works for Developers I](https://www.youtube.com/watch?v=e4S8zfLdLgQ)
- [How the Internet Works for Developers II](https://www.youtube.com/watch?v=FTAPjr7vgxE)
