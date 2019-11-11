# Node.js Week 2 (Lesson Plan)

## Agenda

* Explain what REST is (not restful API just REST)
    * focus on resources and how they are the center of REST
* What is CRUD? Explain the four operations
* explain how the CRUD operations are linked to http methods in RESTful APIs
* finally complete the full picture of restful APIs: resources and operations
* mention that RESTful is not the only way to build APIs but do not go into details

## Core concepts

* restful API
* http methods, urls, request body, query parameters, status, response body, error handling

## Build with students

* library app with the four basic operations, no saving/reading to/from file, 
  * make sure to explain how routes are defined (verb + url)
  * how request body can be get
  * how parameters can be extracted from the url (:id)
  * how to generate ids
  * how to respond with the correct status
  * how to correctly hande any errors (return 500 or 404 and a user friendly error message, while logging the error details)
* show how to test the different endpoints and methods using postman


