# Node.js Week 2 (Readings)

## Agenda

1. What is Representational State Transfer (REST)?
2. What is Hypertext Transfer Protocol (HTTP)?
3. What is a CRUD application?
4. What is a RESTful API?

## 1. What is Representational State Transfer (REST)?

Building software is like building houses: architecture is everything. The design of each part is just as important as the utility of it. REST is a specific architectural style for web applications. It serves to organise code in **predictable** ways.

The most important features of REST are:

- An application has a `frontend` (client) and a `backend` (server). This is called [separation of concerns](https://medium.com/machine-words/separation-of-concerns-1d735b703a60): each section has its specific job to do. The frontend deals with presenting data in a user friendly way, the backend deals with all the logic and data manipulation
- The server is `stateless`, which means that it doesn't story any data about a client session. Whenever a client sends a request to the server, each request from the client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. This makes it possible to handle requests from millions of users.
- Server responses can be temporarily stored on the client (a browser) using a process called `caching`: storing files like images or webpages in the browser to load the next time you enter a website (instead of getting them from the server, which generally takes longer to do)
- Client-server communication is done through `Hypertext Transfer Protocol` (more on that later), which serves as the style (the how) of communication.

It's important to know about REST because it teaches us how web applications are designed and holds us to a standard that makes development and usage predictable. However, don't worry if you don't know what any of this means just yet. It's good to be exposed to it, and understanding will come with experience.

For more research, check the following resource:

- [What is REST: a simple explanation for beginners](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f)

## 2. What is Hypertext Transfer Protocol (HTTP)?

A big part of making applications that follow the REST architecture is by use of HTTP methods.

If you've every typed in a URL you might've seen the letters HTTP at the beginning of it, i.e. `http://www.hackyourfuture.net`. It stands for **Hypertext Transfer Protocol** and it is the basic way of sending requests and receiving responses.

Like verbal communication, there's the _content_ (WHAT you are saying) and the _style_ (HOW you are saying it). HTTP refers to the \***\*style\*\*** of online communication. How you communicate over the web is done through specific HTTP methods (also called HTTP verbs), that describe what type of request is being made. The most important ones are:

- **GET**. This type of request is only about getting data from the server. Whenever a user enters a new webpage, this usually means a GET request gets send to the server to get the required files to display that webpage. All other data in the website stays unaffected.
- **POST**. This type of request allows the client to submit new data to the server. Generally speaking, its purpose is to store this new data into a database, or manipulate it and later return it back to the client.
- **PUT**. This type of request allows the client to update existing data, which is already present in the client. The data is edited and then send back to the server, similar to the POST request but more semantic.
- **DELETE**. This type of request tells the server to delete a particular set of data or resources.

Why do you need to know all of this? HTTP is the foundation of how client-server interactions work on the web. It's important to have a universal policy that everyone holds on to, in order to have fast and effective online communication.

Look into the following resources to increase your understanding:

- [The Http and the Web: Http explained](https://www.youtube.com/watch?v=eesqK59rhGA)
- [Basics concepts of web applications](https://www.youtube.com/watch?v=RsQ1tFLwldY)

## 3. What is a CRUD application?

CRUD is short for _Create_, _Read_, _Update_ and _Delete_: the four actions that any backend application should be able to handle, no matter what language the code is written in. The CRUD structure responds to the user's need to create new data, to be able to read (display in the user interface) it, to update old data and finally to delete it.

You might have noticed that these four actions nicely align with the HTTP methods we just learned about:

1. Create -> POST
2. Read -> GET
3. Update -> PUT
4. Delete -> DELETE

The concept of CRUD is is an important criterium each web application should be able to fulfill. Why? This is generally how users make use applications.

Read the following article to learn about CRUD in practice, using Facebook as an [example](https://medium.com/@Adetona77/understanding-crud-using-facebook-as-the-study-case-part-1-c4183cdf617a)

## 4. What is a RESTful API?

To answer this question we must first understand what an API is. The abbreviation stands for Application Programming Interface and in its simplest form it is that part of an application that allows us to make use of its functionality. However, instead of a beautiful-looking user interface it's usually some kind of URL (which in this context is called an `endpoint`)

Whenever developers make some kind of software that they want others to use, they make sure it can be communicated with. That part is called the API. The developers usually also write instructions for how to best communicate with the API, this is called `documentation`.

A RESTful API is nothing more than an API that follows the REST architectural pattern. Check the following [link](https://openclassrooms.com/en/courses/3432056-build-your-web-projects-with-rest-apis/3496011-identify-examples-of-rest-apis) to see some examples of popular RESTful APIs.

For more information check out the following resource:

- [What is an API? In English, please](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82)
