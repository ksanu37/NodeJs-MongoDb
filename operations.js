const assert = require('assert');

exports.insertDocuments = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);    // returning the promise from this function
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set: update}, null);
};