# Homework Node.js Week 2

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature II

## 1. Practice the concepts

> The problems in the *practice the concepts* section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

This week you'll continue with the command line exercises. Go back to your command line and start doing **exercises 6 (MAKE IT MODULAR) until 10 (TIME SERVER)**

## 2. Node.js Exercises

> Inside of your `Node.js` fork, go to the folder `week2`. Inside of that folder, create a folder called `nodejs-exercises`.

### Make a blog API

Anyone here still remember blogs!? They were all the rage around 10 years ago. We are a bit late to the party, but I think we can still make some money with a good blog API.

In our API blogs will have `title` and `content`. Let's jump right in.

**Setup:**  
Step 0. Creata a new empty folder e.g. `exercise1`  
Step 1. In the folder you just created, initalize npm  
Step 2. Create a javascript file that will hold your code  
Step 3. Install and require express   
Step 4. Write or copy code from lecture to start an express server on port 3000. 

That was not too hard now was it. Now you are ready for the real coding. We will start off by 

**Creating new posts**

 To create a new blog posts, users need to send a json in the request, e.g. `{ "title": "My first blog", "content": "Lorem ipsum" }`. We are going to store the blog posts in separate files using the `fs` module. You can use the following starter code:

```javascript
const fs = require("fs");
app.<METHOD>('/blogs', (req, res) => {
    // How to get the tile and content from the request??
    fs.writeFileSync(title, content);
    res.end('ok')
})
```

You need to fill in the correct method and figure out how to get the title and content from the request.

Use Postman to test that your code works. You should get a response `ok` and see a new file `My first blog` in your `exercise1` folder.

Hint: Remember `express.json()`. Why did we use it during our lectures?

![Obama not bad](https://nwlc.org/wp-content/uploads/2016/09/notbad.jpg)

Up next:

**Updating existing posts**

Updating posts is very similar to creating them. You only need to change the METHOD and add a check that the blog post that the user is trying to update already exists with `fs.existsSync(title)`.

```javascript
app.<METHOD>('/blogs', (req, res) => {
    // How to get the tile and content from the request??
    if (fs.existsSync(title)) {
      fs.writeFileSync(title, content);
      res.end('ok')
    }
    else {
      res.end('post does not exist');
    }
})
```

Use Postman to test that your code works. Try updating an existing post. Does it work? Now try updating a post that does not exist. Do you get the correct response?

Next up:

**Deleting posts**

To delete a post we need to delete the corresponding file. This time we are going to use a *url parameter* in express to send the title. Since we are deleting a file there is no need to send any content in the request. To delete a file in Node you can use `fs.unlinkSync(<filename>)`:

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the tilte from the url parameters?
    fs.unlinkSync(title);
    res.end('ok');
})
```

Use Postman to test that your code works. Remember to use the correct url, for example: `http://localhost:3000/blogs/My first blog`

That was almost too easy, right? Next up, the hardest part:

**Reading posts**

To read a post the user needs to open the url `http:\\localhost:3000\blogs\My First Blog`. The server needs to send back the content of the file `My First Blog`. In express this can be done with the `res.sendfile(<filename>)` command.

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the tilte from the url parameters?
    res.sendfile(title);
})
```

Use Postman to test that your code works.

All done? Then, _Congratulations_

![Congratulations](https://media.giphy.com/media/l1AsI389lnxkvQHAc/giphy.gif)

## 3. Code along

> The *code along* section is designed to give you an idea of how different concepts fit together. You do not have to submit your code, but you have to finish the code along.

In this application you'll be building an Ebook Sales Application. You'll make it possible to add new books to a list of books. You'll even learn how to put it out online, so you can get a URL that you can use to access your application anywhere.

Enjoy!

- [Ebook Sales Application](https://www.youtube.com/watch?v=QT3_zT97_1g)

## 4. [PROJECT] Extending HackYourTemperature

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to a forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature II

_Deadline Saturday 23.59 CET_
