# Node.js Week 3 (Readings)

## Agenda

1. Making use of other APIs
2. What is a templating engine?

## 1. Making use of other APIs

The role of the web server is to serve the user what they want: profile information, a video or any other type of data. Sometimes, in order to get the user what they want the server has to talk to other servers. The way servers talk to each other is no different than how your browser talks to a server. It uses the same HTTP protocol and very often REST and JSON as well.

In a way using APIs serves a similar purpose as using a package in node. It allows us to reuse code that someone else has written. In the case of API we do not directly get the code but we use the funcionality that the code provides. For example we could use APIs to [authenticate users](https://developers.facebook.com/docs/facebook-login/), [check addresses and locations](https://locationiq.com/#demo), [sending email](https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/) and much more. As you can see from the examples it would be really difficult to build such services ourselves. Just imagine the security issues involved in building a [payment processing system](https://stripe.com/docs/api)!

Another trendy reason for using APIs is known as "microservices". In a nutshell microservices is an approach to building web sites where the application is split into many small servers which use APIs to talk to each other.

How to consume an external API:

1. RTFM - read the manual. Every decent API has some sort of online documentation. The format and location is not standard. Look for a docs link. Pay special attention to authentication, versioning and how data is passed (query string or body).
2. Try out the most basic example you can find in isolation. Remember Postman!
3. Build up a library of postman requests for the API calls that you plan to use, they will be invaluable in debugging later
4. Start implementing the API calls in your applicaiton

Further materials:
[What Is an API and Why Should I Use One?](https://medium.com/@TebbaVonMathenstien/what-is-an-api-and-why-should-i-use-one-863c3365726b)
[Microservices in a Nutshell](https://www.thoughtworks.com/insights/blog/microservices-nutshell)
[https://youtu.be/ZtLVbJk7KcM](https://youtu.be/ZtLVbJk7KcM)

## 2. What is a templating engine?

A classical website presents information, nothing more.

With a templating engine it's possible to create `dynamic` pages: the content can change depending on

## Prepare for the next module

Check out the [databases repository](https://github.com/HackYourFuture/databases)
and find out how you can prepare for the first database lecture.
