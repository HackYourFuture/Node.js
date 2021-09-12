# Homework Node.js Week 2

## Todo List

1. Prep exercises
2. Practice exercises
3. PROJECT: HackYourTemperature II
4. Code alongs

## **1. Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `Node.js` fork, go to the folder `week2`. Inside of that folder, navigate to `/prep-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## **2. Practice exercises**

Inside of your `Node.js` fork, go to the folder `week2`. Inside of that folder, navigate to `/practice-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. Go through them to practice concepts that you have learned about!

## **3. PROJECT: HackYourTemperature II**

> This week you'll continue building on `HackYourTemperature`. Use the same folder from the previous week.

So far you've build a basic web server. We've loaded in the necessary modules. We have an `end point`, which is `/`. We have activated the server, by `listening` to a port number. And we have created a `POST` request to handle input from the user.

This week's homework we will expand on that, in 2 parts:

1. We will connect our API to an external API to grab the data we want.
2. We are going to add tests to our API to ensure that it works as intended.

### 3.1 Add external API

Our external API that we're going to work with is the [Open Weather Map API](https://openweathermap.org/). The goal of this part is to learn how to make an API request from the backend, and then to send the result to the frontend.

#### 3.1.1 Setting up the API

1. We first have to make an account: do so via [the website](https://openweathermap.org/appid)
2. Go back to your project folder and create a new folder called `sources`. Inside create a file called `keys.json`. Go to your OpenWeatherMap account, find the API Key and copy it into `keys.json`

#### 3.1.2 Fetch it from our API

1. Remove the response from last week, we'll rewrite it later
2. Inside of the the `POST` route, bring in `node-fetch` and pass the value of the API endpoint: `https://api.openweathermap.org/data/2.5/weather`. For it to work we first have to add the API Key, like so:

```js
const API_KEY = require("./sources/keys.json").API_KEY;
fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`);
```

Now, there are 2 situations that could happen: if the city name is not found, we want to send to the client a response with a message that the city isn't found. However, if the city is found and then we want to return a message that contains the city name and current temperature.

3. If the result is not found, we `render()` to the page the `index` (just like in the `/` endpoint). However, also add a second argument, an object: `{ weatherText: "City is not found!" }`
4. If the result is found, we also `render()` to the page the `index`. Also add here the object. Only, instead of just a string dynamically add in the `cityName` and temperature (gotten from the result of the API call). Hint: use template strings to add variables in your strings!

Check that this works as expected!

### 3.2 Adding test cases

TODO

## **4. Code alongs**

> Remember to upload the end code of all code alongs to your Github profile so that you can refer back to it anytime!

### 4.1 Library API

Our mentor Andrej has created his own code along to build a Library API. Way to go above and beyond! Have a look and code along to go through all the steps of an API in its simplest form.

- [Library API](https://www.youtube.com/watch?v=PVb_vIyw4HI)

### 4.2 Ebook Sales application

In this application you'll be building an Ebook Sales Application. You'll make it possible to add new books to a list of books. You'll even learn how to put it out online, so you can get a URL that you can use to access your application anywhere.

Enjoy!

- [Ebook Sales Application](https://www.youtube.com/watch?v=QT3_zT97_1g)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (same as week 1). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Project: HackYourTemperature II

_Deadline Tuesday 23.59 CET_
