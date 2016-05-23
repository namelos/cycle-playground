const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, (err, db) => {
  console.log(db.getCollectionNames())
})