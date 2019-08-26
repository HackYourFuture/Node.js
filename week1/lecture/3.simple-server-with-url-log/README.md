# Logging the URL

This example is almost exactly the same, except that we are logging the url that's being accessed.

## Composition of a Url

- [Url Struture](https://www.youtube.com/watch?v=OvF_pnJ6zrY) It has a lot of information on url structure. It breaks it down into **paths**, **queries**, **fragements**. But we don't need to worry about that yet. We're just logging the entire url.

Try it out yourselves. Run this project (similar to the last one) and try going to your browsers and typing in various URLs, such as:
- https://localhost:8080/hello
- https://localhost:8080/im-from-mars
- https://localhost:8080/contact?country=belgium
- https://localhost:8080/contact?country=belgium#brussels

We're printing everything after the domain(locahost) and port(8080).
