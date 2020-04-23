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

Try out the following code and show how the middleware gets applied to the request, before it reaches the endpoint `/test`.

```js
const express = require('express');
const app = express();

app.use(function (req, res, next) {
  console.log('hello from the middleware!');
  next();
});

app.post('/test', (req, res) => res.send('Hello from test!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

Explain use cases for using middleware, like validation (`express-validator`) or parsing the request (`express.json()`)

**Exercise**

Ask students to create a simple Express server:

- with one POST endpoint `/`.
- This endpoint should receive form data (a single property, `email`) in JSON format.
- To parse the request, have them use `express.json()`, as a middleware function.
- Have them use Postman to test whether or not it works.

At the end of the exercise ask 1 or 2 students to show their approach.

**Essence**

Middleware allows the web server to modify the request gets in order to make it better interpretable within the route. For example, when sending form data in a request we want to make sure the server can understand the format it comes in properly. Therefore, we use the middleware `express.json()`.

### Consuming web APIs

**Explanation**

Web applications are built using many different services. There's no need to have your application's do everything, from authentication to payment processing. To make things easier we use external services, also known as `web APIs`. Such a service can be used through their API, which allows us to get access to certain functionality and data, to use in our own application. This server to server communication through APIs is also known as `consumation` of web APIs.

**Example**

- Social login is a way for applications to outsource authentication, via services like Facebook or Google (examples are [Udemy](https://www.udemy.com/join/login-popup/), or [Medium](https://medium.com/))
- Online payment processing is outsourced to services like Stripe or Adyen (examples are [Udemy](https://www.udemy.com/), or [bol.com](https://www.bol.com)))

**Exercise**

Ask students to create a simple Express server:

- With 1 GET endpoint `/github`
- Inside the route, make an API request using `node-fetch` to `https://api.github.com/users/:username/repos`
- Replace the `:username:` with your own GitHub user name
- Respond to the client with the first repository that comes up
- Use Postman to test your work

**Essence**

Why write everything yourself, when you can make use of other web services? By consuming web APIs we can extend the usability of our application, without the need to do all the work ourselves!

SECOND HALF (14:00 - 16:00)

### Templating engines

**Explanation**

A templating engine is a technology that makes it possible to to create `dynamic` pages. Instead of writing regular HTML, you'll create `templates`. This is similar to HTML, but with one big difference: certain values serve as placeholders. These placeholders will be filled in with actual content, when the page is rendered. The type of content that is chosen depends on the person that's viewing it.

**Example**

A simple example of a Handlebars template:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Handlebars Example</title>
  </head>
  <body>
    <!-- The Handlebars template will be injected here -->
    <div id="entry-container"></div>

    <!-- This script contains the Handlebars template. Notice the placeholders "title" and "body" -->
    <script id="entry-template" type="text/x-handlebars-template">
      <div class='entry'>
        <h1>
          {{title}}
        </h1>
        <div class='body'>
          {{body}}
        </div>
      </div>
    </script>

    <!-- We need to load in the Handlebars package -->
    <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>

    <!-- In this script we write the logic that compiles the template and injects it into the container -->
    <script>
      // Get access to DOM elements
      const container = document.getElementById('entry-container');
      // Access the HTML from inside the script
      const template = document.getElementById('entry-template').innerHTML;

      // Use Handlebars to compile the template
      const compiledTemplate = Handlebars.compile(template);

      // Content to be used in template
      const content = { title: 'I love...', body: 'HackYourFuture!!!!' };

      // Inject the template into the container
      container.innerHTML = compiledTemplate(content);
    </script>
  </body>
</html>
```

**Exercise**

Ask students to get dynamically render content to an HTML page, using [Handlebars](http://handlebarsjs.com/). The HTML page should include:

- A complete HTML document
- A CDN link to Handlebars: https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js
- A JavaScript file that contains the content and the Handlebars template
- Use the following object as the dynamic content: `{ question: "What's the best coding school in the world?" , answer: "HackYourFuture!" }`
- A `<div>` that will contain the rendered Handlebars template

Make use of the [documentation](http://handlebarsjs.com/installation/#usage) to figure out how to do it!

**Essence**

Templating engines are a way to generate HTML with dynamically changing content.

# !!!IMPORTANT!!!

Before class ends, ask the students to prepare for the next module ([Databases](http://github.com/hackyourfuture/databases)) course by installing MySQL:

- On Windows: download this [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- On Linux: download this [MySQL Community Server](https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-server_8.0.19-1ubuntu19.10_amd64.deb-bundle.tar)
- On MacOS: download this [MySQL Community Server](https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.19-macos10.15-x86_64.dmg)
