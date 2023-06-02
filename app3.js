const express = require('express');
const { ObjectId } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const PORT = 3009;

const { connectToDb, getDb } = require('./db6');
var db;

connectToDb((e) => {
    if (!e) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT)
        });
    };
    db = getDb();
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
    .catch((e) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

app.get('/bookdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((e) => {
            res.status(500).json({error: 'Could not feth the docume'});
        })
    } else {
        res.status(500).json({error: 'Not a valid'});
    };
});

app.post('/bookdb', (req, res) => {
    db.collection('books')
    .insertOne(req.params)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((e) => {
        res.status(500).json({error: 'Could not create a new document'})
    });
});

app.patch('/bookdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const updates = req.body
        db.collection('books')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((e) => {
            res.status(500).json({error: 'Could not update the document'});
        });
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.delete('/bookdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((e) => {
            res.status(500).json({error: 'Could not delete the document'});
        });
    } else {
        res.status(500).json({error: 'Not  valid id'});
    };
});