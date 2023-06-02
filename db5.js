const { MongoClient } = require('mongodb');

var dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/supermarketdb')
        .then((client) => {
            dbConnection = client.db();
            return cb()
        })
        .catch((e) => {
            console.error(new Error(err));
            return cb(err);
        })
    }, 
    getDb: () => dbConnection,
};