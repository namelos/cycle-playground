const http = require('http')
const Cycle = require('@cycle/core')
const Rx = require('rx')

const makeServerDriver = port => {
  const server$ = new Rx.Subject()

  return sink$ => {
    http.createServer((request, response) => {
      server$.onNext({ request, response })
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      sink$.subscribe(sink => {
        response.end(sink)
      })
    }).listen(port, '127.0.0.1', () => console.log(`listening at ${port}`))

    return server$
  }
}

const makeConsoleDriver = () =>
        msg$ =>
        msg$.subscribe(console.log)

const main = ({ console, server }) => ({
  console: server.map(({ request }) => `request for ${request.url}`),
  server: Rx.Observable.of('hello server')
})

Cycle.run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000)
})
