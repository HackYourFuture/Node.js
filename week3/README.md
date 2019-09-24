# Node.js Week 3 (Readings)

## Agenda

1. Making use of other APIs
   - How to consume an external API
2. What is a templating engine?

## 1. Making use of other APIs

The role of the web server is to serve the user what they want: profile information, a video or any other type of data. Sometimes, in order to get the user what they want the server has to talk to other servers. The way servers talk to each other is no different than how your browser talks to a server. It uses the same HTTP protocol and very often REST and JSON as well.

In a way using APIs serves a similar purpose as using a package in node. It allows us to reuse code that someone else has written. In the case of API we do not directly get the code but we use the functionality that the code provides. For example we could use APIs to [authenticate users](https://developers.facebook.com/docs/facebook-login/), [check addresses and locations](https://locationiq.com/#demo), [sending email](https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/) and much more. As you can see from the examples it would be really difficult to build such services ourselves. Just imagine the security issues involved in building a [payment processing system](https://stripe.com/docs/api)!

Another trendy reason for using APIs is known as "microservices". In a nutshell microservices is an approach to building web sites where the application is split into many small servers which use APIs to talk to each other.

### How to consume an external API

How to consume an external API:

1. RTFM - read the manual. Every decent API has some sort of online documentation. The format and location is not standard. Look for a docs link. Pay special attention to authentication, versioning and how data is passed (query string or body).
2. Try out the most basic example you can find in isolation. Remember Postman!
3. Build up a library of postman requests for the API calls that you plan to use, they will be invaluable in debugging later
4. Start implementing the API calls in your applicaiton

Further materials:
[What Is an API and Why Should I Use One?](https://medium.com/@TebbaVonMathenstien/what-is-an-api-and-why-should-i-use-one-863c3365726b)
[Microservices in a Nutshell](https://www.thoughtworks.com/insights/blog/microservices-nutshell)
[https://youtu.be/ZtLVbJk7KcM](https://youtu.be/ZtLVbJk7KcM)

## 2. What is a templating engine?

So far all the servers that we have build were serving so-called **static** HTML. This means that the contants of the html did not change over time or based on the user.

With a templating engine, it's possible to create `dynamic` pages where parts of the content depend on the user that is viewing the page. By using templating engines we can, for example, display the name of the user on the page. Of course, one could inline the HTML inside javascript, but this is not a viable approach. The code quickly becomes tangled and unmaintainable, because it is impossible to separate HTML from javascript code.

Templating engines work by combining some data (usually in JSON format) and a static template file stored on disc that contains _placeholders_ or _tokens_ where the data needs to be inserted. The process of combining the template and the data is often called _rendering_.

![Templating engines diagram](https://hackernoon.com/hn-images/1*XNuVdKSup2Gk9LjDNlsCYw.png)

The exact syntax and setup vary considerably, but the main components _data_, _template_ and _placeholders_ are found in every implementation. In addition to replacing data, many templating engines support some form of conditional expressions and loops/forEach for dealing with arrays.

There are many implementations of templating engines available: Mustache, Pug (Jade), Handlebars, etc. In this course we will use [Mustache](https://mustache.github.io/#demo).

The syntax for placeholders is double curly brackets (thus the name mustache).Lets look at a very simple example

Template `Name: {{firstName}} <b>{{lastName}}</b>`
Data `{ "firstName": "John", "lastName": "Doe" }`
Output `Name: John <b>Doe</b>`

You can find more complicated examples [here](https://mustache.github.io/mustache.5.html).

![Mustache](https://media3.giphy.com/media/ehA575gOh0RIQ/giphy.gif?cid=790b761146a36446416541ec3708f8406232e40e052ee6d8&rid=giphy.gif)

_Fun fact_: Templating engines are not a new idea and have been around since almost the beginning of the internet. In fact, php the most ubiquitous language today, started out as a simple templating engine.

To easily use mustache in combination with express, we will use a special package called `mustache-express`. This package lets mustache interact directly with express request handler and render content directly to the response object. You can find a basic example [here](https://github.com/bryanburgers/node-mustache-express).

### Further materials

[mustache js template for node express](https://www.youtube.com/watch?v=mbHz11t84kI)
[Overview of JavaScript Templating Engines](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)
[Javascript Templating Language](https://medium.com/@1sherlynn/javascript-templating-language-and-engine-mustache-js-with-node-and-express-f4c2530e73b2)
[mustache + javascript](https://github.com/janl/mustache.js/)

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
