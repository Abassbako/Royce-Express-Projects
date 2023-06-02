const express = require('express');

const app = express();

const PORT = 3004;

const { connectToDb, getDb } = require('./db2');
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        })
        db = getDb();
    };
});

app.get('/bookdb', (req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({ name: 1 })
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});