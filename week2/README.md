# Reading Material Node.js Week 2

## Agenda

1. What is Representational State Transfer (REST)?
2. What is Hypertext Transfer Protocol (HTTP)?
3. What is a CRUD application?
4. What is an API?
5. What is a RESTful API?
6. Postman

## 0. Video Lectures

Your teacher Andrej has made video lectures for this week's material. You can find them here: [Videos 6 - 13](https://www.youtube.com/watch?v=wTsvV0I4PlA&list=PLVYDhqbgYpYXpc_l_Vlj8yz3LjgkkWXnn)

<a href="https://www.youtube.com/watch?v=wTsvV0I4PlA&list=PLVYDhqbgYpYXpc_l_Vlj8yz3LjgkkWXnn" target="_blank"><img src="../assets/andrej.png" width="600" height="350" alt="HYF Video" /></a>

## 1. What is Representational State Transfer (REST)?

Building software is like building houses: architecture is everything. The design of each part is just as important as the utility of it. REST is a specific architectural style for web applications. It serves to organize code in **predictable** ways.

REST stands for Representational State Transfer. This means that when a client request information about a resource, the server will _transfer_ to the client a _representation_ of the _state_ of the requested resource.

If this seems very abstract to you, don't worry, REST is only a concept, an idea of how applications should be organized.

The world of `REST` consists of two things: resources and operations (Creating, Reading, Updating, Deleting).

A `resource` can be any object, real or imaginary. On Instagram for example, a resource can be a user, a photo or a hashtag. REST offers a way to expose information about its resources. For example, for Instagram, the state of a user (the resource), contains the user's name, the number of posts that user has on Instagram, how many followers they have, and more. Resources have names e.g. _users_, _photos_ and _hashtags_ and each object in resource has an identifier. For example, a _user_ has a username.

REST also enables clients to take actions on those resources. We call these actions `CRUD` operations:

- Creating new resources, such as videos/images/text files, etc.
- Retrieving those files and reading them.
- Updating the content of those files.
- Deleting those files.

The most important features of REST are:

- An application has a `frontend` (client) and a `backend` (server). This is called [separation of concerns](https://medium.com/machine-words/separation-of-concerns-1d735b703a60): each section has its specific job to do. The frontend deals with presenting data in a user friendly way, the backend deals with all the logic and data manipulation
- The server is `stateless`, which means that it doesn't store any data about a client session. Simply put, when you refresh the page you won't keep the data you requested before (unless it's saved in the browser or in a file on the server). Whenever a client sends a request to the server, each request from the client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. This makes it possible to handle requests from millions of users.
- Server responses can be temporarily stored on the client (a browser) using a process called `caching`: storing files like images or webpages in the browser to load the next time you enter a website (instead of getting them from the server, which generally takes longer to do).
- Client-server communication is done through `Hypertext Transfer Protocol` (more on that later), which serves as the style (the how) of communication.

It's important to know about REST because it teaches us how web applications are designed and holds us to a standard that makes development and usage predictable. However, don't worry if you don't know what any of this means just yet. It's good to be exposed to it, and understanding will come with experience.

For more research, check the following resource:

- [What is REST: a simple explanation for beginners](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f)

## 2. HTTP methods

A big part of making applications that follow the REST architecture is the correct use of HTTP methods.

Like verbal communication, there's the _content_ (WHAT you are saying) and the _style_ (HOW you are saying it). HTTP refers to the \***\*style\*\*** of online communication. How you communicate over the web is done through specific HTTP methods (also called HTTP verbs), that describe what type of request is being made. The most important ones are:

- **GET**. This type of request is only about getting data from the server. Whenever a user enters a new webpage, a GET request is sent to the server to get the required files to display that webpage. All other data in the website stays unaffected.
- **POST**. This type of request allows the client to submit new data to the server. Generally speaking, its purpose is to store this new data into a database, or manipulate it and later return it to the client.
- **PUT**. This type of request allows the client to update existing data, which is already present in the client. The data is edited and then send back to the server, similar to the POST request, but more semantic.
- **DELETE**. This type of request tells the server to delete a particular set of data or resources.

Why do you need to know all of this? HTTP is the foundation of how client-server interactions work on the web. It's important to have a universal policy that everyone holds on to, to have fast and effective online communication.

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

The concept of CRUD is an important condition that each web application needs to fulfill. Why? **This is generally how users use applications**.

Read the following article to learn about CRUD in practice, using Facebook as an [example](https://medium.com/@Adetona77/understanding-crud-using-facebook-as-the-study-case-part-1-c4183cdf617a)

## 4. What is an API?

Application Programming Interface (API) in its simplest form is the part of an application that allows users to make use of its functionality. However, instead of a beautiful-looking user interface, it's usually some kind of URL (which in this context is often called an `endpoint`).

Whenever developers make some kind of software that they want others to use, they make sure it can be communicated with. That part is called the API. The developers usually also write instructions for how to best communicate with the API, this is called `API documentation`.

A useful analogy is that of a restaurant.

> As a _client_ when you go to the restaurant you are not allowed to go into the kitchen (server). However, you can talk to the waiter (API) who will pass on your request to the kitchen. The kitchen will use the things that it has such as ingredients, pans and pots, and the chef's talent to prepare your food. The waiter will bring you the food (response). Of course, to order anything you need to know what is available and thus you need a menu (documentation).

Look into the following resources to increase your understanding:

- [ELI5: What is an API?](https://dev.to/awwsmm/eli5-what-is-an-api-1dd2)
- [Web APIs Explained By Selling Goods From Your Farm](https://blog.codeanalogies.com/2018/02/27/web-apis-explained-by-selling-goods-from-your-farm/)

# 5. What is RESTful API?

A RESTful API is nothing more than an API that follows the REST architectural pattern.

That means that the API exposes resources and allows clients to perform operations on those resources. When a client wants to request information on a resource it needs to say which resource it wants information on. This is passed as a Universal Resource Locator (URL) in the HTTP request. The client also needs to say what operation he is trying to perform. This is specified in the method of the HTTP request.

Let's look at a concrete example. Picture a REST API for a library with a domain at `library.edu/`. The resources would be `books`, so the URL for the books resource would be `library.edu/books`. If a client, e.g the librarian, wants to get information on the books he needs to use the `GET` HTTP method. The server will respond with a list of book information such as title, author etc.

Now imagine that the librarian wants to register/create a new book. He needs to specify the resource he wants to create using the same URL as before `library.edu/books` and use the `POST` method. The information about the book to be created such as title, author etc., is part of the request body.

Next, let's think about how the librarian would update the information for a specific book. The resource is still books and the method is `PUT`, but how do they tell the server which specific book to update? This is where the resource identifiers come in.
The library needs to maintain and provide identifiers for each object. The user uses this identifier in the URL e.g. `library.edu/books/TheWhiteCastle`. The identifier can be a number or text, it does not matter. The same url is also used to delete a book, just with the `DELETE` method.

To summarize, here are the available operations and the corresponding URLs.

| Operation                                    | URL                                | HTTP Method |
| -------------------------------------------- | ---------------------------------- | ----------- |
| Get all books                                | `library.edu/books`                | `GET`       |
| Create a new book                            | `library.edu/books`                | `POST`      |
| Update the information about a specific book | `library.edu/books/TheWhiteCastle` | `PUT`       |
| Delete a specific book                       | `library.edu/books/TheWhiteCastle` | `DELETE`    |

The URL in the example consists of a domain `library.edu` and a path `/books`. When writing APIs we are mostly concerned with the _path_. You might also hear the synonymous _endpoint_ or _route_. During this weeks homework you will implement this exact API and then you will learn how all the different things fit together.

For more information check out the following resources:

- [What is an API? In English, please](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82)
- [Examples of REST APIs](https://openclassrooms.com/en/courses/3432056-build-your-web-projects-with-rest-apis/3496011-identify-examples-of-rest-apis)

# 6. Postman

When creating APIs it is important to test if they work as intended. The easiest way to do this is to send a request and check the API's response.

Normally, you would send a request using the browser or the command line. But there's a tool we can use that's made especially for these testing purposes: [Postman](https://www.youtube.com/watch?v=i1jU-kivApg)

Postman offers an intuitive graphical user interface that will help us visualize API requests and the responses we get.

You can install Postman by following [these steps](https://learning.getpostman.com/docs/postman/launching_postman/installation_and_updates).

As you can see in the image below, when you enter a request in Postman and click the Send button, the server receives your request and returns a response that Postman then displays in the interface.

![postman illustration](https://s3.amazonaws.com/postman-static-getpostman-com/postman-docs/anatomy-of-a-request.png)

Watch this [video guide](https://www.youtube.com/embed/YKalL1rVDOE?list=PLM-7VG-sgbtBsenu0CM-UF3NZj3hQFs7E) to learn about how to start sending your first requests with Postman!

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
