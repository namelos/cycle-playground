const { run } = require('@cycle/core')
const makeServerDriver = require('./makeServerDriver')
const makeConsoleDriver = require('./makeConsoleDriver')
const makeMongoDBDriver = require('./makeMongoDBDriver')

const { Observable } = require('rx')
const { from, of } = Observable

const main = ({ server, db }) => {
  return {
    console: db,
    server: from([{
      response: 'hello world'
    }, {
      route: '/test',
      response: 'test area'
    }]),
    db: of([
      { title: 'first', text: 'this is first content' },
      { title: 'second', text: 'this is second content' },
      { title: 'third', text: 'this is third content' }
    ])
  }
}

run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000),
  db: makeMongoDBDriver('mongodb://localhost:27017/test')
})
