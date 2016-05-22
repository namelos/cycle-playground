const http = require('http')
const { run } = require('@cycle/core')
const makeServerDriver = require('./makeServerDriver')
const makeConsoleDriver = require('./makeConsoleDriver')
const makeGraphQLDriver = require('./makeGraphQLDriver')

const { Observable } = require('rx')
const { of, merge } = Observable

const schema = require('./schema')
const query = require('./query')

const main = ({ server, graphql }) => {
  return {
    console: server
      .map(({ request }) => request.url)
      .merge(graphql),
    server: of('hello'),
    graphql: of(query)
  }
}

module.exports = () => run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000),
  graphql: makeGraphQLDriver(schema)
})
