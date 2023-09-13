# Assignments Node.js Week 2

## Todo List

1. Prep exercises
2. Practice exercises
3. PROJECT: HackYourTemperature II
4. Code alongs
5. Career Training 2 (If not completed yet)
6. Optional: Side project ideas

## **1. Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `Node.js` fork, go to the folder `week2`. Inside of that folder, navigate to `/prep-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## **2. Practice exercises**

Inside of your `Node.js` fork, go to the folder `week2`. Inside of that folder, navigate to `/practice-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. Go through them to practice concepts that you have learned about!

## **3. PROJECT: HackYourTemperature II**

> This week you'll continue building on `HackYourTemperature`. Use the same folder from the previous week.

So far you've build a basic web server. We've loaded in the necessary modules. We have an `end point`, which is `/`. We have activated the server, by `listening` to a port number. And we have created a `POST` request to handle input from the user.

This week's assignments we will expand on that, in 2 parts:

1. We will connect our API to an external API to grab the data we want.
2. We are going to add tests to our API to ensure that it works as intended.

### 3.1 Add external API

Our external API that we're going to work with is the [Open Weather Map API](https://openweathermap.org/). The goal of this part is to learn how to make an API request from the backend, and then to send the result to the frontend.

#### 3.1.1 Setting up the API

1. We first have to make an account: do so via [the website](https://openweathermap.org/appid)
2. Go back to your project folder and create a new folder called `sources`. Inside create a file called `keys.js`. Go to your OpenWeatherMap account, find the API Key and copy it into a `keys.js` object with the property name `API_KEY`. Don't forget to export it

#### 3.1.2 Fetch it from our API

1. Remove the response from the `POST` route from last week, we'll rewrite it later
2. Inside of the the `POST` route, bring in `node-fetch` and pass the value of the API endpoint: `https://api.openweathermap.org/data/2.5/weather`. For it to work we first have to import the keys, like so:

```js
import keys from "./sources/keys.js";
```

Then we can use that object to fetch the information, like so:

```js
fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${keys.API_KEY}`);
```

Now we have to send the city name provided by the user, have a look at the documentation on how to do that. There are 2 situations that could happen: if the city name is not found, we want to send to the client a response with a message that the city isn't found. However, if the city is found and then we want to return a message that contains the city name and current temperature.

3. If the result is not found, we send back an object: `{ weatherText: "City is not found!" }`
4. If the result is found, we also send back the object. Only, instead of just a string `City is not found!` dynamically add in the `cityName` and temperature (gotten from the result of the API call). Hint: use template strings to add variables in your strings!

Check that this works as expected!

### 3.2 Adding test cases

Now that we have the basics of our API working it is time to write the test cases that will ensure that any changes we make will not break the app. To do that we will be adding a library called `supertest` to test http requests as well as the test framework of choice for this curriculum `jest`.

1. Install both libraries as a developer dependency. We don't need our tests in production so we make sure to only have them as dev dependencies!
2. Create a new folder called `__tests__`, this is the default folder where `jest` looks for our test files. Then add a `app.test.js` file to write our tests in.
3. Have a look at your JavaScript code to remind yourself what `describe`, `it` and `expect` did again and set up a simple test:

```js
describe("POST /", () => {
  it("Quick test", () => {
    expect(1).toBe(1);
  });
});
```

Setup a test script in your `package.json` to check that it works! You should get no errors and 1 passing test.

#### 3.2.1. Configuring jest with supertest

Jest is a JavaScript testing framework, but `express`, `node-fetch` and `supertest` are a little more than just JavaScript. So we need to do some extra configuration.

The first problem is that we use `modules` and `modernJS`. Jest in of itself does not understand this and we need to set up `babel` to convert our code into plain JavaScript. `Babel` is something you will probably have set up in all of your applications, but it is done under the hood a lot of times. This time we are going to get our hands dirty!

1. Install `babel-jest` and `@babel/preset-env` as developer dependencies. These are babel packages that are made to help `jest` compile
2. Copy over the `babel.config.cjs` and `jest.config.js` files in the `config-files` folder to the `hackyourtemperature` folder. There are some comments in there explaining what we are configuring, but it will be hard to know how it all fits together. That is out of scope for now, but if you are interested you can do some research!
3. Restart `jest` so that it can pick up the new `config` files

The second problem is that tests in jest run asynchronously and whenever we will run multiple tests at the same time our server's code will start our application using the same port.

1. So figure out a way to split up your `server.js` code into a `app.js` and `server.js` file so that our tests can grab the Express app without it starting the server. Your `server.js` should be as small as possible, just grabbing the app and starting it on a port
2. Check that this all works by adding the following imports to your `app.test.js` file:

```js
import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);
```

Run your tests again and you should get a green passing test again without any errors.

If you get a `cannot use import outside a module` error, that means that the `babel` setup has gone wrong. Make sure you have the latest version of Node and that the config files are being used. You can check if the files are being used by adding a syntax error to the file. If you get the same error then the config files are not being compiled.

#### 3.2.2 Writing the tests

Now comes the fun part, it is time to write your tests. Think about what needs to be tested! Remember that the happy path is just a small part of your api. What if the user does not give a cityName? What if the cityName is gibberish?

Per test, create a new `it` with a nice descriptive title. That is the title you will see in the console so it should be clear what is going wrong from there.

Some hints:

- The `request` variable we created by calling `supertest(app)` has functions on it called `get`, `post`, etc. So to send a `POST` request you would write `request.post('/your-endpoint')`.
- To send a body with your request, you can chain a `.send({ your: 'object' })` to the promise given by the `post` function
- One of your tests will not give a fixed result but a dynamic one (namely the temperature that will change). Usually you will want to mock the API code, but that is out of the scope of this exercise. For now think about checking that the string 'contains' parts that you need. (If you ever find some time and want to look into how to do this, have a look at the jest documentation on mocking modules)
- Don't forget to check the status code!

Once all your tests are green you can be sure that everything works as expected! Have a look at your code and clean it up, if you wrote your tests well, then all you need to do at the end is run your test script to see if you did not break anything.

## **4. Code alongs**

> Remember to upload the end code of all code alongs to your Github profile so that you can refer back to it anytime!

### 4.1 Library API

Our mentor Andrej has created his own code along to build a Library API. Way to go above and beyond! Have a look and code along to go through all the steps of an API in its simplest form.

- [Library API](https://www.youtube.com/watch?v=PVb_vIyw4HI)

### 4.2 Ebook Sales application

In this application you'll be building an Ebook Sales Application. You'll make it possible to add new books to a list of books. You'll even learn how to put it out online, so you can get a URL that you can use to access your application anywhere.

Enjoy!

- [Ebook Sales Application](https://www.youtube.com/watch?v=QT3_zT97_1g)

## **5. Career Training 2 (If not completed yet)**

Remember that the Career Training 2 session is coming up (check your class channel on slack for the exact date). Before the session make sure you have:

- Read the whole [‘Interview Preparation’ Repo](https://github.com/HackYourFuture/interviewpreparation).
- Done the assignments: make a copy of [this file](https://docs.google.com/document/u/2/d/114rTGS4eG6tpkrMAyVIdvgTrnpmkRL6ax_smkw1B0HI/copy) and submit your answers to the team [here](https://hackyourfuture.typeform.com/to/s6zYAugm).

## **6. Optional: Side project ideas**

> A part of the HackYourFuture curriculum is to work on as many side projects as you can throughout the time you have. This is a nice way to add extra knowledge to your arsenal and show in your CV that you are motivated to learn new technologies. There are plenty of people available to help you out in the `#get-help` channel on Slack so definitely make use of that! Have a look at the [hyf_projects repo](https://github.com/HackYourFuture/hyf_projects/blob/main/README.md#project-2-a-try-out-application) for more details.

### 6.1 Document your API!

When using API's in the `Using API's` module you will have noticed that those API's all have extensive documentation on how to use it. As developers like to build tools for everything there are quite a few good tools to semi-automatically document your API from your code! Saves a lot of work and makes sure that you don't forget to update the documentation if the code changes!

Add automatic documentation to your API by using one of these tools (Swagger, apiDoc or docbox)!

### 6.2 Web Sockets

It is becoming normal that all webpages automatically refresh whenever there is new data available. Think about the live news feeds that tell you when there is a new item, or that there is a new message on twitter. This is all implemented using Web Sockets, where you as a programmer can set up a link between your page and the server.

Have a go by building a simple full stack chat application with an express websocket server!

### 6.3 GraphQL

We focused solely on the REST way of building an API, but there is a different way called `GraphQL`. This allows the frontend to define in their query the data that they want to get back. Very cool, but also quite complex. If you are up for a challenge, try to recreate your project using GraphQL (`express-graphql` package is probably the easiest way)!

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (same as week 1). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-assignments-guide.md) to see how it's done.

The assignments that needs to be submitted is the following:

1. Project: HackYourTemperature II

_Deadline Tuesday 23.59 CET_
