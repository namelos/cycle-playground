const MongoClient = require('mongodb').MongoClient
const { Subject } = require('rx')

// module.exports = port => {
//   const server$ = new Subject()
//   const app = express()
//
//   return sinks$ => {
//     sinks$.subscribe(({ method = 'get', route = '/', response = 'none' }) => {
//       app
//         [method](route, (req, res) => {
//         server$.onNext(req)
//         res.send(response)
//       })
//     })
//
//     app
//       .listen(port, () =>
//         console.log(`listening on ${port}...`))
//
//     return server$
//   }
// }
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

    return db$
  }
}

// const MongoClient = require('mongodb').MongoClient
//
// const url = 'mongodb://localhost:27017/test'
//
// MongoClient.connect(url, (err, db) => {
//
//   const insertArticles = (db, callback) => {
//     const collection = db.collection('articles')
//
//     collection.insertMany([
//       { title: 'first', text: 'this is first content' },
//       { title: 'second', text: 'this is second content' },
//       { title: 'third', text: 'this is third content' }
//     ], (err, result) => {
//       callback(result)
//     })
//   }
//
//   insertArticles(db, console.log)
// })
