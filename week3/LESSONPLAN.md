# Node.js Week 3 (Lesson Plan)

## Agenda

1. Previous homework & recap
2. Middleware general concept (express.json)
3. Error handling using middleware
4. Consuming web APIs
5. Templating engines

## Core concepts

FIRST HALF (12:00 - 13:30)

### Middleware

**Explanation**

Middleware is a general term for software that serves to "glue together" separate, often complex and already existing, programs.

In Express, middleware are functions that execute during the lifecycle of a request to the Express server.

Each middleware has access to the HTTP request and response for each route (or path) it’s attached to.

![middleware](https://d33wubrfki0l68.cloudfront.net/a22bb45df146d43b57f2f6c90182d19e7394cd96/d6e10/assets-jekyll/blog/express-middleware-examples/middleware-30b3b30ad54e21d8281719042860f3edd9fb1f40f93150233a08165d908f4631.png)

Additionally, middleware can either terminate the HTTP request or pass it on to another middleware function using the `next()` function (more on that soon). This “chaining” of middleware allows you to compartmentalize your code and create reusable middleware.

**Example**

Try out the following code and use Postman to make the request. Show the student the importance of `express.json()` to parse the request and makes the form data available in the `req.body`.

```js
const express = require('express');
const app = express();

app.use(express.json());
app.post('/test', (req, res) => res.json(req.body));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

**Exercise**

**Essence**

Middleware allows the web server to modify the request gets in order to make it better interpretable within the route. For example,

### Consuming web APIs

**Explanation**

Traditional server architecture one client one server that does anything:
https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/27f810ea-2722-455a-9a0d-bb5b54c28393/api-based-platforms-api-diagram.png

https://cdn.darknet.org.uk/wp-content/uploads/2018/08/HTTP-Security-Considerations-An-Introduction-To-HTTP-Basics.png

In reality the server does not do everything on its own. Instead it uses services from other servers
https://www.notion.so/gajduk/Hosting-b4025782198b494ba6bd053953c8933b#f8f31bc004ab46199639d914daad79fe

Why do we need server-server communication?

- reuse - we do not want to write new code if someone has already done that in the past and we can just use it
- separation-of-concerns - especially in big organizations like netflix etc

**Example**

- Location services - https://api.postcode.nl/documentation/json-rest/v1/Address/viewByPostcode
- Process payments (Stripe) - https://stripe.com/docs/api/invoices

**Exercise**

1. Get the image from https://randomfox.ca/floof/ and redirect to it

2. Instead of redirecting show it inside HTML

This is prelude to part 2, mention how it is ugly that the HTML and javascript are all mixed up

SECOND HALF (14:00 - 16:00)

### Templating engines

**Explain**

[Templating engines](https://www.youtube.com/watch?v=oZGmHNZv7Sc)

Motivation: make a story with a link to last exercise. The js, html and styling code are all intermixed in same file, it is a mess

Solution is to use a templating engine to separate the view from the node code but still use the data from node in the view

How do templating engines work - they replace tokens/placeholders in a template string/file with actual data coming from json

How to use them in Node - https://www.npmjs.com/package/handlebars

**Example**

3. Use handlebars to refactor the page from exercise 2

**Exercise**

- Use Handlebars to build a simple UI for reading books from the Library app
  - get the books with axios/fetch
  - EXTRA: buttons to create, edit, delete book

# !!!IMPORTANT!!!

Before class ends, ask the students to prepare for the next module ([Databases](http://github.com/hackyourfuture/databases)) course by installing MySQL:

- On Windows: download this [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- On Linux: download this [MySQL Community Server](https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-server_8.0.19-1ubuntu19.10_amd64.deb-bundle.tar)
- On MacOS: download this [MySQL Community Server](https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.19-macos10.15-x86_64.dmg)
