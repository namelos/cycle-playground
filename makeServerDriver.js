const http = require('http')
const Rx = require('rx')

const makeServerDriver = port => {
  const server$ = new Rx.Subject()

  return sink$ => {
    http.createServer((request, response) => {
      server$.onNext({ request, response })
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      sink$.subscribe(sink => response.end(sink))
    }).listen(port, '127.0.0.1', () => console.log(`listening at ${port}`))

    return server$
  }
}

module.exports = makeServerDriver
