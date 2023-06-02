const express = require('express');
const { ObjectId } = require('mongodb');
const booksRoute = require('./routes/books');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log((req.url, req.method));
    next();
});
app.use(booksRoute);

const PORT = 3001;

const { connectToDb, getDb } = require('./db1');
const { result } = require( 'lodash' );
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        });
        db = getDb();
    };
});

app.get('/booksdb', (req, res) => {
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

app.get('/booksdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id:ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Cuold not fetch the document'});
        });
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.get('booksdb/:author', (req, res) => {
    const { author } = req.params;
    const booksLib = books.find(book => book.author === author);
    res.send(booksLib);
});

app.post('/booksdb', (req, res) => {
    db.collection('books')
    .insertOne(req.body)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        req.status(500).json({error: 'Could not create a new document'})
    });
});

app.delete('/booksdb/:name', (req, res) => {
    db.collection('books')
    .deleteOne(req.params)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not delete the document'});
    });
});

app.patch('/booksdb/:name', (req, res) => {
    const updates = req.body;
    db.collection('books')
    .updateOne(req.params, {$set: updates})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not update the document'});
    });
});

app.patch('/booksdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const updates = req.body
        db.collection('books')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not update the document'});
        });
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.patch('/booksdb/:author', (req, res) => {
    const updates = req.body;
    db.collection('books')
    .updateOne(req.params, {$set: updates})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not update the document'});
    });
});