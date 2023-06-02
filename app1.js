const express = require('express');

const app = express();

const PORT = 3003;

app.listen(PORT, () => {
    console.log('app listening on port', PORT);
});

app.get('/supermarket', (req, res) => {
    res.send(goods);
});

app.post('/supermarket', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});