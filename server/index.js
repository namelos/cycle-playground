const http = require('http')
const { run } = require('@cycle/core')
const makeServerDriver = require('./makeServerDriver')
const makeConsoleDriver = require('./makeConsoleDriver')

const { Observable } = require('rx')
const { of } = Observable

const main = ({ server }) => {
  return {
    console: server.map(req => req.url),
    server: of('hello'),
  }
}

module.exports = () => run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000),
})
