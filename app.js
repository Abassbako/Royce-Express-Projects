const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const PORT = 3000;

const { connectToDb, getDb } = require('./db');
const { result } = require( 'lodash' );
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
        res.status(500).json({error: 'Could not fetch the documentt'});
    });
});

app.get('/bookdb/:title', (req, res) => {
    const { title } = req.params;
    const bookStore = books.find()
})

app.post('/bookdb', (req, res) => {
    db.collection('books')
    .insertOne(req.body)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Culd not create a new document'});
    });
});