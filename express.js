const express = require('express');
const bookRoute = require('./routes/book');

const app = express();
const { ObjectId } = require('mongodb');

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(bookRoute);

const PORT = 3007;
const { result } = require('lodash');

const { connectToDb, getDb } =  require('./db4');
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
    // const pages = req.query.pages || 0
    // const booksperpages = 3
    let books = []
    db.collection('books')
    .find()
    .sort({ title: 1 })
    // .skip(pages * booksperpages)
    // .limit(booksperpages)
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

app.get('/bookdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the document'});
        });
    } else {
        res.status(500).json({error: 'Not a vaild id'});
    };
});

app.post('/bookdb', (req, res) => {
    db.collection('books')
    .insertOne(req.body)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not create a new document'});
    });
});

app.delete('/bookdb/:title', (req, res) => {
    db.collection('books')
    .deleteOne(req.params)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not delete the document'});
    });
});

app.delete('/bookdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Couold not delete the document'});
        });
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
}); 

app.patch('bookdb/:id', (req, res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not create update the document'});
        })
    } else{
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.patch('/bookdb/:title', (req, res) => {
    const updates = req.body
    db.collection('books')
    .updateOne(req.params, {$set: updates})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not update the document'})
    });
}); 