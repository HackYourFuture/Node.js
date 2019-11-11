# Node.js Week 3 (Readings)

## Agenda

1. Making use of other APIs
   - How to consume an external API?
2. What is a templating engine?

## 1. Making use of other APIs

The role of a web server is to serve the user what they want: profile information, cake, video or any other type of data. Sometimes, in order to get the user what they want the server has to talk to other servers. The way servers talk to each other is no different than how your browser talks to a server. It uses the same HTTP protocol and very often REST and JSON as well.

In a way using APIs serves a similar purpose as using a package in node. It allows us to reuse code that someone else has written. In the case of API we do not directly get the code, but we use the functionality that the code provides. For example, we could use APIs to [authenticate users](https://developers.facebook.com/docs/facebook-login/), [check addresses and locations](https://locationiq.com/#demo), [send emails](https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/) and much more. As you can see from the examples it would be really difficult to build such services ourselves. Just imagine the security and legal issues involved in building a [payment processing system](https://stripe.com/docs/api)!

Another trendy reason for using APIs is known as "microservices". In a nutshell microservices is an approach to building web sites where the application is split into many small servers which use APIs to talk to each other. This is a huge topic that we do not have time to cover, but it is really good to know about. To understand it on a high level see the [video](https://www.youtube.com/watch?v=STKCRSUsyP0).

### How to consume an external API?

How to consume an external API. First of all, let's define the terms here.

By `consume` we refer to the act of using the service an API provides, to be used in our own application. This service will be in the form of some kind of data transfer: for example, let's say we want to get data from the [RandomUser API](https://randomuser.me/api/). The process of making an API call to that URL and then using that data to display something in our application is the `consumation` of that API.

Now, how do we go about doing this? Follow this basic guide to get started quickly:

1. **Read the documentation**. It's important to first know how the API works (what are the endpoints, what kind of data does it deliver, etc.). Every decent API has some sort of online documentation. The format and location is not standard. Look for a docs link. Pay special attention to authentication, versioning and how data is passed (query string or body).
2. **Try out the most basic example** you can find in isolation. This usually means trying out the provided example, which the documentation provides. Remember to use Postman to test it out!
3. **Build up a library of Postman requests** for the API calls that you plan to use, they will be invaluable in debugging later.
4. **Start implementing the API** calls in your application.

Further materials to learn more about this:

- [What Is an API and Why Should I Use One?](https://medium.com/@TebbaVonMathenstien/what-is-an-api-and-why-should-i-use-one-863c3365726b)
- [Microservices in a Nutshell](https://www.thoughtworks.com/insights/blog/microservices-nutshell)
- [https://youtu.be/ZtLVbJk7KcM](https://youtu.be/ZtLVbJk7KcM)

## 2. What is a templating engine?

So far all the servers that we have build were serving so-called **static** HTML. This means that the contents of the HTML did not change over time or based on the user.

With a templating engine, it's possible to create `dynamic` pages where parts of the content depend on the user that is viewing the page; the content changes depending on who the user is and what they're doing. Take for example your Facebook account. Most likely the content you see will be different from the content I'll see in my account.

By using templating engines we can, for example, display the name of the user (that is logged in) on the page. Of course, one could inline the HTML inside JavaScript, but this is not a good long-term solutionh. The code quickly becomes tangled and unmaintainable, because JavaScript code is intermixed with HTML.

Templating engines work by combining some data (usually in JSON format) and a static template file stored on disc that contains _placeholders_ or _tokens_ where the data needs to be inserted. The process of combining the template and the data is often called _rendering_.

![Templating engines diagram](https://hackernoon.com/hn-images/1*XNuVdKSup2Gk9LjDNlsCYw.png)

The exact syntax and setup vary considerably, but the main components _data_, _template_ and _placeholders_ are found in every engine. In addition to replacing data, many templating engines support some form of conditional expressions and loops/forEach for dealing with arrays.

There are many implementations of templating engines available: Mustache, Pug (Jade), Handlebars, etc. In this course we will use [Handlebars](https://handlebarsjs.com/).

The syntax for placeholders in Handlebars is double curly brackets. Let's look at a very simple example

Template `Name: {{firstName}} <b>{{lastName}}</b>`  
Data `{ "firstName": "John", "lastName": "Doe" }`  
Output `Name: John <b>Doe</b>`

You can find more complicated in the documentation [here](https://handlebarsjs.com/).

To easily use handlebars in combination with express, we will use a special package called `express-handlebars`. This package lets handlebars interact directly with express request handler and render content directly to the response object. You can find a basic example [here](https://www.npmjs.com/package/express-handlebars#basic-usage).

To read more about this, study the following materials:

- [Express + Handlebars Tutorial](https://www.youtube.com/watch?v=1srD3Mdvf50)
- [Overview of JavaScript Templating Engines](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)
- [Javascript Templating Language](https://medium.com/@1sherlynn/javascript-templating-language-and-engine-mustache-js-with-node-and-express-f4c2530e73b2)
- [Express-handlebars](https://www.npmjs.com/package/express-handlebars)

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
