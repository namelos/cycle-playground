const http = require('http')
const Rx = require('@reactivex/rxjs')

const makeHttpEffect = () => {
  const requests = new Rx.Subject()
  return {
    writeEffect: model =>
      model.subscribe(({ req, res }) => {
        console.log('sending hello')
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Hello world')
        return requests
      }),
    serverCallback: (req, res) =>
      requests.next({ req, res }),
    readEffect: requests
  }
}

const run = (main, drivers) => {
  const sources = {
    HTTP: drivers.HTTP.readEffect
  }
  const sinks = main(sources)
  Object.keys(drivers).forEach(key =>
                               drivers[key].writeEffect(sinks[key]))
}

const httpEffect = makeHttpEffect()

const drivers = {
  HTTP: httpEffect
}

const main = ({ HTTP }) => ({
  HTTP: HTTP.do(({ req }) => console.log(`request to ${req.url}`))
})

run(main, drivers)

http.createServer(httpEffect.serverCallback)
  .listen(3000, '127.0.0.1', () => console.log(`running at localhost:3000`))
