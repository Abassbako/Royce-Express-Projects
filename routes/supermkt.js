const { Router } = require('express');

const router = Router();

const goods = [
    {
        "_id": "645fae84ff25a2d8b9a366b6",
        "Product": "Milk",
        "Id": 1,
        "Quality": "Palatable"
    },
    {
        "_id": "645fb839fe1782eb08af8621",
        "Product": "pampers",
        "Id": 2,
        "Quality": "absorber"
    },
    {
        "_id": "64603ce5234891271c8cc5ef",
        "Product": "Soft Drinks",
        "Id": 3,
        "Quality": "refreshment"
    },
    {
        "_id": "646130ab3e42bd5ebcd92037",
        "Product": "Noddles",
        "Id": 4,
        "Quality": "Meal"
    }
];

router.get('/supermarketdb/:product', (req, res) => {
    const { product } = req.params;
    const supermarket = goods.find(g => g.Product === product);
    res.send(supermarket);
});

module.exports =  router;