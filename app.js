const http = require('http')
const Cycle = require('@cycle/core')
const Rx = require('rx')

const makeServerDriver = port => {
  const req$ = new Rx.Subject()
  const res$ = new Rx.Subject()

  return sink$ => {
    http.createServer((req, res) => {
      req$.onNext(req)
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      sink$.subscribe(sink => {
        res.end(sink)
      })
    }).listen(port, '127.0.0.1', () => console.log(`listening at ${port}`))

    return req$
  }
}

const makeConsoleDriver = () =>
        msg$ =>
        msg$.subscribe(console.log)

const main = ({ console, server }) => ({
  console: Rx.Observable.of('hello console'),
  server: Rx.Observable.of('hello server')
})

Cycle.run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000)
})
