const http = require('http')
const Cycle = require('@cycle/core')
const Rx = require('rx')
const makeServerDriver = require('./makeServerDriver.js')
const makeConsoleDriver = require('./makeConsoleDriver.js')

const main = ({ console, server }) => ({
  console: server.map(({ request }) => `request for ${request.url}`),
  server: Rx.Observable.of('hello server')
})

Cycle.run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000)
})
