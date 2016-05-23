const express = require('express')
const { Subject } = require('rx')

const makeEventsSelector = (app, sinks$, route) => eventName => {
  const tmp$ = new Subject()

  app[eventName](route, (req, res) => {
    tmp$.onNext(req)
    sinks$.subscribe(sink => res.send(sink))
  })

  return tmp$
}

const makeRouteSelector = (app, sinks$) =>
  route => {
    return {
      events: makeEventsSelector(app, sinks$, route)
    }
  }


module.exports = port => {

  const app = express()

  return sinks$ => {
    app
    .listen(port, () =>
      console.log(`listening on ${port}...`))

    return {
      select: makeRouteSelector(app, sinks$)
    }
  }
}
