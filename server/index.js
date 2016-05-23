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
  const request$ = server.select('/').events('get')

  return {
    log: request$.map(req => `this would send to console: ${req.url}`),
    server: request$.map(req => `this would sent to client dom: ${req.url}`),
  }
}

run(main, {
  log: makeConsoleDriver(),
  server: makeServerDriver(3000),
})

/*
  server.select('/').events('get').map(req => req.url)
 */
