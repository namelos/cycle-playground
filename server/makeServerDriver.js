const express = require('express')
const { Subject } = require('rx')

module.exports = port => {
  const server$ = new Subject()

  const app = express()

  return sinks$ => {
    sinks$.subscribe(({ method = 'get', route = '/', response = 'none' }) => {
      app
        [method](route, (req, res) => {
          server$.onNext(req)
          res.send(response)
        })
    })

      app
      .listen(port, () =>
        console.log(`listening on ${port}...`))

    return server$
  }
}
