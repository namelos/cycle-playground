const http = require('http')
const Cycle = require('@cycle/core')
const Rx = require('rx')
const makeServerDriver = require('./makeServerDriver')
const makeConsoleDriver = require('./makeConsoleDriver')
const makeGraphQLDriver = require('./makeGraphQLDriver')

const schema = require('./schema')
const query = require('./query')

const main = ({ console, server, graphql }) => ({
  console: graphql,
  server: Rx.Observable.of('hello server'),
  graphql: Rx.Observable.of(query)
})

Cycle.run(main, {
  console: makeConsoleDriver(),
  server: makeServerDriver(3000),
  graphql: makeGraphQLDriver(schema)
})
