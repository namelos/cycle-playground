const { MongoClient } = require('mongodb')
const { Subject } = require('rx')

const selectCollections = db =>
  collection =>
    db.collection(collection)

module.exports = url => {
  const db$ = new Subject()

  return sink$ => {
    MongoClient.connect(url, (err, db) => {

      const collection = db.collection('articles')

      sink$.subscribe(sink => {
        collection.insertMany(sink, (err, result) => {
          db$.onNext(result)
        })
      })
    })

    // return {
    //   select: selectCollections(db),
    //   articles: db$
    // }
    return db$
  }
}
