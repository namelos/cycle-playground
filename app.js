const http = require('http')
const Rx = require('@reactivex/rxjs')

const makeServerDriver = (port = 3000, callback) => {
  const requests = new Rx.Subject()

  const serverCallback = (req, res) =>
          requests.next({ req, res })

  http.createServer(serverCallback)
    .listen(port, '127.0.0.1', callback)

  return {
    writeEffect: model =>
      model.subscribe(({ req, res }) => {
        console.log('sending hello')
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Hello world')
        return requests
      }),
    serverCallback,
    readEffect: requests
  }
}

const run = (main, drivers) => {
  const sources = {
    server: drivers.server.readEffect
  }
  const sinks = main(sources)
  Object.keys(drivers).forEach(key =>
                               drivers[key].writeEffect(sinks[key]))
}

const drivers = {
  server: makeServerDriver(3000, () => console.log('listening on 3000'))
}

const main = ({ server }) => ({
  server: server.do(({ req }) => console.log(`request to ${req.url}`))
})

run(main, drivers)
