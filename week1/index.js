var state = 10
import HTTP from 'http'
import Path from 'path'

import sendIndexHTML from './responses/sendIndexHTML'
import sendPage2HTML from './responses/sendPage2HTML'
import sendStylesCSS from './responses/sendStylesCSS'
import sendText from './responses/sendText'
import sendState from './responses/sendState'
import addToState from './responses/addToState'

const server = HTTP.createServer((request, response) => {
  console.log(request.method, request.url)

  switch (request.url) {
    case '/':
      sendIndexHTML(response)
      break
    case '/page2':
      sendPage2HTML(response)
      break
    case '/styles.css':
      sendStylesCSS(response)
      break
    case '/state':
      sendState(response, state)
      break
    case '/add':
      state += 1
      addToState(response)
      break
    case '/remove':
      state -= 1
      renderState(response)
      break
    case '/reset':
      state = 10
      renderState(response)
      break
    default:
      const extension = request.url
      if (extension === '') {
        response.statusCode = 302
        response.setHeader('Location', '/')
      } else {
        response.statusCode = 404
        sendText(response, "Sorry... we couldn't find the link you are looking for.")
      }
  }

  response.end()
})

server.listen(8080)

console.log('Server started')