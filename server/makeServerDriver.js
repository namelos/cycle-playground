const http = require('http')
const { Subject } = require('rx')

module.exports = port => {
  const server$ = new Subject()

  return sink$ => {
    http.createServer((request, response) => {
      server$.onNext({ request, response })
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      sink$.subscribe(sink => response.end(sink))
    }).listen(port, '127.0.0.1', () => console.log(`listening at ${port}`))

    return server$
  }
}
