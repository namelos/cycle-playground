const { Subject } = require('rx')
const { graphql } = require('graphql')

module.exports = schema => {
  const res$ = new Subject()

  return query$ => {
    query$.subscribe(query => {
      graphql(schema, query).then(
        res => res$.onNext(res)
      )
    })

    return res$
  }
}
