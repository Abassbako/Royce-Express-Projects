const express = require('express');
const { ObjectId } = require('mongodb');
const supermarketRoute = require('./routes/supermkt');
 
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(supermarketRoute);

const PORT = 3006;

const { connectToDb, getDb } = require('./db3');
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

app.get('/supermarketdb', (req, res) => {
    const pages = req.query.pages
    const booksPerPaes =10
    let goods = []
    db.collection('goods')
    .skip(pages * booksPerPaes)
    .limit(booksPerPaes)
    .find()
    .sort({ product: 1 })
    .forEach(good => goods.push(good))
    .then(() => {
        res.status(200).json(goods);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

app.get('/supermarketdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('goods')
        .findOne({_id: ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch document'});
        });
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.post('/supermarketdb', (req, res) => {
    db.collection('goods')
    .insertOne(req.body)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not create a new document'});
    });
});

app.patch('/supermarketdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const updates = req.body
        db.collection('goods')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates}) 
        .then((result) => {
            res.status(200).json(result);
        });
    } else {
        res.status(500).json({error:'Not a valid id'});
    };
});

app.delete('/supermarketdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('goods')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not delete the document'});
        });
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
});