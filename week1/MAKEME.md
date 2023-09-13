# Assignments Node.js Week 1

## Todo List

1. Crash course
2. Practice the concepts
3. Prep exercises
4. Node.js exercises
5. PROJECT: HackYourTemperature I

> Before we proceed, let's check to see if we have the latest versions of Node.js and the Node Package Manager (NPM) installed. You can do that by going to the Command Line (CLI) and running `node -v` and `npm -v`. Node.js should be at least **v12** and NPM should be at least **v6**.

## **1. Crash course**

There is a great crash course available here: https://www.youtube.com/watch?v=2LUdnb-mls0. It introduces a lot of the concepts you will be practicing this week.

## **2. Practice the concepts**

> The problems in the _practice the concepts_ section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

In this week's interactive exercises, we'll be going back to the command line. We'll be using software from [Nodeschool](https://nodeschool.io/) to do some exercises.

Go to your favorite command line interface and run the following command

```md
npm install -g learnyounode
```

When it's all installed, execute the command:

```md
learnyounode
```

And the menu will open up. **Do exercise 1 (HELLO WORLD) until 8 (HTTP COLLECT)**!

## **3. Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `Node.js` fork, go to the folder `week1`. Inside of that folder, navigate to `/prep-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## **4. Practice exercises**

Inside of your `Node.js` fork, go to the folder `week1`. Inside of that folder, navigate to `/practice-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. Go through them to practice concepts that you have learned about!

## **5. PROJECT: HackYourTemperature I**

> In this part of the assignments you'll be setting up the basis of your project: `HackYourTemperature`. Inside the folder `assignments`, create a new folder called `hackyourtemperature`. You'll add to it every week.

In this module you'll be building the simplest of API's, starting from scratch.

Each week you'll be building a certain part of it. This week we'll get started with creating a web server, using [Express.js](https://expressjs.com/). Inside of the `hackyourtemperature` folder:

1. Create a JavaScript file called `server.js` (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a `package.json` file by running `npm init -y`
3. Install and load in the necessary modules for this project: they are `express` (our web server), `express-handlebars` (our templating engine) and `node-fetch` (a library to handle http requests in node)
4. As we want to use modernJS `import` statements, add the line `"type": "module"` to the `package.json` file
5. Set up your web server using Express (creating an Express instance, listen to **port 3000**)
6. Make a `GET` request to `/` that sends the message `hello from backend to frontend!` to the client

After writing all this code you can verify that it's working by running `node server.js` from the Command Line and checking your browser at `http://localhost:3000`. The page should display the message `hello from backend to frontend!`.

### 5.1 Adding a POST request

In this part we'll add another endpoint, with a `POST` method.

1. Create a `POST` route, that has as an endpoint: `/weather`
2. To make Express aware of what data type the incoming data is (which is JSON). We do that using the `json()` method on the Express object. Using the `use()` function from `app`, pass in the `json()` from `express`.
3. Inside the callback function of the `POST` route, get access to the `cityName` and put it inside a variable. Hint: use the `body` object from the request to find it.
4. Send the the form input back as a response to the client

Test out your work using Postman and make sure that any time you submit something in the form, it returns as a response from the server the exact words you submitted.

If you are tired of constantly restarting your server, google the `nodemon` package to see if that will be useful for you!

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Have a look at the following [guide](../hand-in-assignments-guide.md) to see how it's done.

The assignments that needs to be submitted is the following:

1. Project: HackYourTemperature I

_Deadline Tuesday 23.59 CET_
