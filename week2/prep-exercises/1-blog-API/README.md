## Make a blog API

Anyone here still remember blogs!? They were all the rage around 10 years ago. We are a bit late to the party, but I think we can still make some money with a blog application.

Since you just learned about REST and APIs we are going to use them when writing this application. The resource in the application are `blogs`. Each blog will have a `title` and `content`. The `title` will also serve as an `id` uniquely identifying a blog post.

We also want our blogs to be stored `persistently`. Data persistence means keeping the data you are working with around whether or not the Node.js service is restarted. To achieve this, each blog post will be stored as a separate file on the hard drive, where the blog post title will match the file name.

Before we start coding we need to define what operations will be supported via our API. Here's what we're going to do...

| Operation | Description                                             | Method | Route |
| --------- | ------------------------------------------------------- | ------ | ----- |
| Create    | Given a title and content create a new post             |        |       |
| Read one  | Given a title, return the content of a single blog post |        |       |
| Update    | Given a title and content update an existing blog post  |        |       |
| Delete    | Given a title delete an existing blog post              |        |       |

What do you think should be filled in the `Method` and `Route` columns? Think about it and see if you can guess what it should be...

Once you're ready, let's start by setting up our environment. Follow the steps:

**Setup:**

1. Navigate to the exercise folder `1-blog-api`
2. In the folder there is already a `server.js` and `package.json` file prepared for you with some starter code and the express dependency.
3. Install the dependencies locally by running `npm install`. This command will read the dependencies from `package.json` and download them on your computer.

That was not too hard, was it? Now you are ready for the real coding. We will start off by...

**1.1 Creating new posts**

To create a new blog post, we need 2 things:

1. A user that sends data from a client (for example, a webpage that contains a `<form>`)
2. A web server that listens to a request that comes in at a certain `endpoint`.

We won't work on the first point, but we'll assume the incoming data from the client will be in JSON format. For example: `{ "title": "My first blog", "content": "Lorem ipsum" }`.

You need to create another endpoint in our web server that will receive the data and store it into a separate file. The file storage will happen with use of [fs](https://nodejs.org/api/fs.html#fs_file_system), a native Node.js module that allows us to interact with our computer's file system so we can create new files.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
const fs = require("fs");

app.<METHOD>('/blogs', (req, res) => {
    // How to get the title and content from the request??
    fs.writeFileSync(title, content);
    res.end('ok')
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Figure out how to access the `title` and `content` properties from out of the request.

Hint: Remember `express.json()`. Why did we use it during our lectures?

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. As the data you'll be sending in the request body, you can make use of the example: `{ "title": "My first blog", "content": "Lorem ipsum" }`. Make sure that you specify the`Content-Type` as JSON!

Expected output:
You should get a response `ok` and see a new file `My first blog` in your `1-blog-api` folder.

![Obama not bad](https://nwlc.org/wp-content/uploads/2016/09/notbad.jpg)

Up next:

**1.2 Updating existing posts**

Updating posts is very similar to creating them. You only need to use a different METHOD and add a conditional statement that checks to see if the blog post that the user is trying to update already exists with `fs.existsSync()`.

This time we are going to use a _url parameter_ in Express to send the `title` while the `content` will be part of the `body`.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
app.<METHOD>('/posts/:title', (req, res) => {
    // How to get the title and content from the request?
    // What if the request does not have a title and/or content?
    if () {
      fs.writeFileSync(title, content);
      res.end('ok')
    }
    else {
      // Send response with error message
    }
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Add a condition: if the file with the given title exists, rewrite it with the given content. Otherwise respond with a message, saying 'This post does not exist!'. Make use of the `fs.existsSync(title)` to check if a file exists.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. As the data you'll be sending in the request body, you can make use of the example: `{ "title": "My first blog", "content": "This content is now updated!" }`.

Does it send the correct response in the case the post exists, or if it doesn't?

Expected output:
If the request could be handled, respond with 'ok', else respond with 'This post does not exist!'.

Next up:

**1.3 Deleting posts**

For deleting posts we will again make use of `URL parameters`, this time to specify which post we want to delete.

Since we are deleting a post there is no need to send any content in the request. To delete the corresponding, you can use `fs.unlinkSync(<filename>)`.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the title from the url parameters?
    if () { // Add condition here
      fs.unlinkSync(title);
      res.end('ok');
    } else {
      // Respond with message here
    }
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Figure out how to get the `title` from the request.
4. Add a condition, only delete the file if it exists. Make use of the `fs.existsSync(title)` method.
5. Delete the file by passing the title to the `fs.unlinkSync()` method.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. No body content needed!

**1.4 Reading posts**

Wanting to read a file is the most common form of request a client can send. Type in `https://www.google.com/` into your browser and you are sending a request, wanting to read a file!

When a web server receives a request to read a file, it sends back a response including the file that needs to be read.

In our blog application, we'll be sending the correct file depending on the title of the blog post. We specify this in our request by putting the title of that blog in the URL parameters, like `http://localhost:3000/blogs/blogtitle`.

The moment the web server gets a request coming in at our new endpoint, we'll look at the URL parameters and then respond with the correct file.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {

    // How to get the title from the url parameters?
    // check if post exists
    const post = fs.readFileSync(title);
    // send response
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Figure out how to get the `title` from the request.
4. Add a condition, only send the post if it exists. Make use of the `fs.existsSync(title)` method.

After you've finished writing your code, **use Postman to test that your code works**. Send a request using the correct HTTP verb and URL.

Expected output:
If the requested post exists, the response should be the post content as plain text. Otherwise the response should be 'This post does not exist!'. Both responses should have the appropriate status.

All done? Congratulations!

![Congratulations](https://media.giphy.com/media/l1AsI389lnxkvQHAc/giphy.gif)

**Bonus: Reading all posts**
In addition to reading the content of a single post build an operation that reads all existing posts. To limit the size of response only send the title of the blog posts, e.g. `[{"title":"My First Blog"}, {"title":"Second Blog"}]`

```javascript
app.<METHOD>('/blogs', (req, res) => {
    // how to get the file names of all files in a folder??
})
```

## Things to think about

- Why do you need to put the `:` in certain URLs?
- What should you do if the file system gives an error (the `fs.readFileSync` line for example)? What is the best way of handling that?
- Why do we use the synchronous function for reading files from the system?
- Should we always only send back a JSON object?
