# Prep exercise - Web Server

In this exercise, you will build a simple web server. It will only serve one HTML file and one JavaScript file. This is enough for a minimal web site.

To help you get started some code is already provided for you. Check the file `server.js` and try to understand what the code does.

Check that the code is working fine by running it and opening the web site in your browser at `http://localhost:3000`. You should see the text `Hello World!`. While working on this exercise and the project, make sure to constantly check that your changes work as expected by running your code and checking the browser.

Your job is to change the code so that it serves HTML instead of just `Hello World!`.

Using node, read the contents of the file `index.html` then send it as a response. Make sure to set the correct `Content-Type` header.

Run the code and check that it works by opening a browser at `http://localhost:3000`.

If you open the Network tab (in the developer tools of your browser) you will notice that the browser tries to load the JavaScript `index.js`, but fails. This is because our server does not **serve** this file yet.

So far the server only serves one thing, the HTML file. In order to serve different things, we somehow have to determine what is being requested. This is where the `request.url` comes in.

If you open the Network tab you can see that when the browser is requesting the HTML code it is using the url `http://localhost:3000/`. On the other hand, when the browser is requesting the javascript it is using the url `http://localhost:3000/index.js`.

Let's change our code to send a different response, depending on the request URL.

To do this you need to write 2 conditional if statements.

1. If the URL is `/` send the HTML file, same as before
2. If the URL is `/index.js` send the corresponding JavaScript file after reading it from the file system. Don't forget to set the correct `Content-Type` header.

Run the code and check that it works by opening a browser at `http://localhost:3000`. You should see the message _Welcome to Server-land!_.

Congratulations, you have created your very own working web server!

> In a nutshell this is how most web sites work. The client requests resources, server sends them, then the client processes the response based on the content type. This processing often leads to new requests and the cycle continues until everything is loaded and ready for the user to interact with.

Tips:

- To set a response header [response.setHeader(name, value)](https://nodejs.org/api/http.html#http_response_setheader_name_value)
- To read a file from the file system [fsPromises.readFile(path[, options])](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fspromises_readfile_path_options)
- Tired of restarting your server!? [nodemon](https://www.npmjs.com/package/nodemon) is here to help.

_BONUS_  
 Our website is working, but looks stale. Try adding some style to it. The style should be from an external source. Add this to your HTML file.

```html
<link rel="stylesheet" type="text/css" href="style.css" />
```

When the server gets a request at `http://localhost:3000/style.css` respond with a CSS file that contains some basic CSS rules e.g. `#content { color: blue }`. Don't forget to specify the `Content-Type` in the header of the request!

## Things to think about

- Why do we have to build a whole server just to serve a webpage?
- Is this how all webpages are sent to users?
- Are all webpages served by sending a file back on a request? And could this work for sending files as well (think of sharing an image or a video)?
- In the world of cloud computing, does that change anything to hosting these webpages?
