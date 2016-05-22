const { run } = require('@cycle/core')
const makeServerDriver = require('./makeServerDriver')
const makeConsoleDriver = require('./makeConsoleDriver')
const makeMongoDBDriver = require('./makeMongoDBDriver')
const makeGraphQLDriver = require('./makeGraphQLDriver')

const { Observable } = require('rx')
const { from, of } = Observable

const query = require('./query')
const schema = require('./schema')

const main = ({ server, db, graphql }) => {
  return {
    log: server.map(req => req.url).merge(db).merge(graphql),
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
    ]),
    graphql: of(query)
  }
}

run(main, {
  log: makeConsoleDriver(),
  server: makeServerDriver(3000),
  db: makeMongoDBDriver('mongodb://localhost:27017/test'),
  graphql: makeGraphQLDriver(schema)
})
