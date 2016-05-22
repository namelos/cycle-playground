const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, (err, db) => {

  const insertArticles = (db, callback) => {
    const collection = db.collection('articles')

    collection.insertMany([
      { title: 'first', text: 'this is first content' },
      { title: 'second', text: 'this is second content' },
      { title: 'third', text: 'this is third content' }
    ], (err, result) => {
      callback(result)
    })
  }

  insertArticles(db, console.log)
})