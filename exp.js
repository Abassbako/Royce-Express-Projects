const express = require('express');
const { result } = require( 'lodash' );

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

const motels = [
    {
        "name": "Paradise",
        "rank": "5 star hotel",
    },
    {
        "name": "Santa Clara Motel",
        "rank": "4 star hotel",
    }, 
    {
        "name": "Exclusive Mansion",
        "rank": "3 star hotel",
    },
];

const PORT = 3008;

app.listen(PORT, () => {
    console.log('app listening on port', PORT);
});

app.get('/motel', (req, res) => {
    res.send(motels);
});

app.get('/motel/:name', (req, res) => {
    const { name } = req.params;
    const Motels = motels.find(m => m.name === name);
    res.send(Motels);
});

app.post('/motel', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
    motels.push(req.body);
});

app.patch('/motel/:name', (req, res) => {
    const updates = req.body
    .updateOne(req.params, {$set: updates});
});

app.delete('/motel/:name', (req, res) => {
    const { name } = req.params;
    const Motel = motels.find(m => m.name === name);
    res.send(Motel);
});