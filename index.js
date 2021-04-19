const MongoClient = require('mongodb').MongoClient;   // Enables us to connect to the MongoDB server
const assert = require('assert');

const  url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
const dboper = require('./operations');

MongoClient.connect(url). then((client) => {
    console.log('Connected to MongoDB server');

    const db = client.db(dbname);
    // const collection = db.collection('dishes');
    // collection.insertOne({"name": "Pizza", "desc": "New Pizza"}, (err, result) =>{
    //     assert.equal(err, null);

    //     console.log('After Insert:\n');
    //     console.log(result.ops);

    //     collection.find({"name": "Pizza"}).toArray((err, docs) =>{
    //         assert.equal(err, null);

    //         console.log('Found:\n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err, result) =>{
    //             assert.equal(err, null);
    //             console.log('Collection dropped \n');
    //             client.close();
    //         });
    //     })
    // });
    dboper.insertDocuments(db, {name: "Pizza", desc: "Test"}, 'dishes')
    .then((result)=>{
        console.log('Insert Document:\n', result.ops);
        return dboper.findDocuments(db, 'dishes');
    })
    .then((docs)=>{
        console.log("Found : ", docs)
        return dboper.updateDocument(db, {name: "Pizza"}, {desc: "Updatd"}, 'dishes');
    })
    .then((result)=>{
        console.log('Updated Document:\n', result.result)
        return dboper.findDocuments(db, 'dishes')
     })
    .then((docs)=>{
        console.log("Found : ", docs)
        return db.dropCollection('dishes') 
    })
    .then((result) => {
        console.log('Dropped Collection', result);
        client.close();
    })
    .catch((err) => console.log(err))
})
.catch((err)=> console.log(err));