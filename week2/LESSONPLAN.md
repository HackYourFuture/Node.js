# Node.js Week 2 (Lesson Plan)

## Agenda

* Explain what REST is (not restful API just REST)
    * focus on resources and how they are the center of REST
* What is CRUD? Explain the four operations
* explain how the CRUD operations are linked to http methods in RESTful APIs
* finally complete the full picture of restful APIs: resources and operations
  * make sure to also cover an example of nested resources. this will be in the homework, e.g. todos/123/reminders/543
* explain that RESTful is not the only way to build APIs:
* mention SOAP as an old standard and how REST tries to solve some of the issues of SOAP
* mention gRPC and graphQL as emerging standards that are attempting to solve some of the issues of REST

## Core concepts

* restful API
* http methods, urls, request body, query parameters, status, response body, error handling

## Build with students

* Todo app with the four basic operations, no saving/reading to/from file, 
  * make sure to explain how routes are defined (verb + url)
  * how request body can be get
  * how parameters can be extracted from the url (:id)
  * how to generate ids
  * how to respond with the correct status
  * how to correctly hande any errors (return 500 or 404 and a user friendly error message, while logging the error details)
* show how to test the different endpoints and methods using postman


