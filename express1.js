const express = require('express');
const { ObjectId } = require('mongodb');
const superRoutes = require('./routes/super');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app.use(superRoutes);

const PORT = 3009;

const { connectToDb, getDb } = require('./db5');
const { result } = require( 'lodash' );
var db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log('app listening on port', PORT);
        })
        db = getDb();
    }
});

app.get('/supermarketdb', (req, res) => {
    let goods = []
    db.collection('goods')
    .find()
    .sort({ product: 1 })
    .forEach(good => goods.push(good))
    .then(() => {
        res.status(200).json(goods);
    })
    .catch((e) => {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

app.get('/supermarketdb/:id', (req, res) => {
    if (ObjectId.isValid(rq.params.id)) {
        db.collection('goods')
        .findOne({_id: ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((e) => {
            res.status(500).json({error: 'Could not fetch the document'});
        }); 
    } else {
        res.status(500).json({error: 'Not a valid id'});
    };
});

app.post('/supermarketdb', (req, res) => {
    db.collection('goods')
    .insertOne(req.params)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((e) => {
        res.status(500).json({error: 'Could not create a new document'});
    });
});

app.patch('/supermarketdb/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('goods')
        .updateOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((e) => {
            res.status(500).json({error: 'Could not update the document'});
        })
    } else {
        res.status(500).json({error: 'Not a valid id '});
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