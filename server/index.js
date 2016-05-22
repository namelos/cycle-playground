const { run } = require('@cycle/core')
const makeServerDriver = require('./makeServerDriver')
const makeConsoleDriver = require('./makeConsoleDriver')

const { Observable } = require('rx')
const { of, from } = Observable

const main = ({ server }) => {
  return {
    console: server.map(req => req.url),
    server: from([{
      response: 'hello world'
    }, {
      route: '/test',
      response: 'test area'
    }])
  }
}

run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000)
})
