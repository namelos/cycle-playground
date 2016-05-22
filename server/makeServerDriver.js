const express = require('express')
const { Subject } = require('rx')

module.exports = port => {
  const server$ = new Subject()

  return sinks$ => {
    sinks$.subscribe(sinks => {
      express()
        .get('/', (req, res) => {
          server$.onNext(req)
          res.send(sinks)
        })
        .listen(port, () =>
          console.log(`listening on ${port}...`))
    })

    return server$
  }
}
