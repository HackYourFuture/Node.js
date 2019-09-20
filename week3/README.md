# Node.js Week 3 (Readings)

## Agenda

1. Making use of other APIs
2. What is a templating engine?

## 1. Making use of other APIs

The role of the web server is to serve the user what they want: profile information, a video or any other type of data. Sometimes, in order to get the user what they want the server has to do

That's when we use external APIs: other people's code that we can use to build upon. Let's say we want to create a web application that has a user login system. We could build our own custom software just for that: we'd need a database, data models, possibly some authentication, validation, etc. In short: a lot of work.

Why don't we just use our Facebook account to login? We'll, it's possible! By making use of the Facebook API.

How to implement an API:

1. We make use of other APIs by first reading documentation.
2. Then we try out the basic example in isolation
3.

## 2. What is a templating engine?

So far all the servers that we have build were serving so-called **static** HTML. This means that the contants of the html did not change over time or based on the user. 

With a templating engine, it's possible to create `dynamic` pages where parts of the content depend on the user that is viewing the page. By using templating engines we can, for example, display the name of the user on the page. Of course, one could inline the HTML inside javascript, but this is not a viable approach. The code quickly becomes tangled and unmaintainable, because it is impossible to separate HTML from javascript code.

Templating engines work by combining some data (usually in JSON format) and a static template file stored on disc that contains *placeholders* or *tokens* where the data needs to be inserted. The process of combining the template and the data is often called *rendering*.

![Templating engines diagram](https://hackernoon.com/hn-images/1*XNuVdKSup2Gk9LjDNlsCYw.png)

The exact syntax and setup vary considerably, but the main components *data*, *template* and *placeholders* are found in every implementation. In addition to replacing data, many templating engines support some form of conditional expressions and loops/forEach for dealing with arrays. 

There are many implementations of templating engines available: Mustache, Pug (Jade), Handlebars, etc. In this course we will use [Mustache](https://mustache.github.io/#demo).

The syntax for placeholders is double curly brackets (thus the name mustache). Lets look at a very simple example

Template `Name: {{firstName}} <b>{{lastName}}</b>`
Data `{ "firstName": "John", "lastName": "Doe" }`
Output `Name: John <b>Doe</b>`

You can find more complicated examples [here](https://mustache.github.io/mustache.5.html).

*Fun fact*: Templating engines are not a new idea and have been around since almost the beginning of the internet. In fact, php the most ubiquitous language today started out as a simple templating engine.

To easily use mustache in combination with express, we will use a special package called `mustache-express`. This package lets mustache interact directly with express request handler and render content directly to the response object. You can find a basic example [here](https://github.com/bryanburgers/node-mustache-express).

### Further materials

[mustache js template for node express](https://www.youtube.com/watch?v=mbHz11t84kI)
[Overview of JavaScript Templating Engines](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)
[Javascript Templating Language](https://medium.com/@1sherlynn/javascript-templating-language-and-engine-mustache-js-with-node-and-express-f4c2530e73b2)
[mustache + javascript](https://github.com/janl/mustache.js/)
[Java Template Engines](https://hackernoon.com/java-template-engines-ef84cb1025a4)



## Prepare for the next module

Check out the [databases repository](https://github.com/HackYourFuture/databases)
and find out how you can prepare for the first database lecture.
