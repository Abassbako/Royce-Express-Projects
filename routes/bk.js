const { Router } = require('express');

const router = Router();

const books = [
    {
        "_id": "641f39381596585841770fca",
        "title": "Sunshine"
    },
    {
        "_id": "641f3a1b1596585841770fcb",
        "title": "Moonlight in the sky",
        "author": "Bako Abass",
        "rating": 9,
        "genres": [
            "Novels",
            "Dystopian"
        ]
    },
    {
        "_id": "641f880c81d94dc7ec6c53eb",
        "title": "Twilight",
        "author": "Joseph Lambo",
        "rating": 10,
        "genres": [
            "Encyclopedia"
        ]
    },
    {
        "_id": "641f896081d94dc7ec6c53ec",
        "title": "Teenegers Lifestyle",
        "author": "Bako Abass",
        "rating": 8,
        "genres": [
            {
                "genre": "Documentation"
            }
        ]
    },
    {
        "_id": "6420c3e2dce0306ae80ee9b1",
        "title": "Albert Einstein The Great Physician",
        "author": "Bako Abass",
        "rating": 10,
        "genres": [
            "Documentation",
            "Encyclopedia"
        ]
    },
    {
        "_id": "6420eefedce0306ae80ee9b2",
        "title": "The Way of Kings",
        "genres": [
            "Fantasy",
            "sci-fi"
        ],
        "rating": 9,
        "author": "Brandon Sanderson",
        "reviews": [
            {
                "name": "Great Road!",
                "body": "Lorem ispum..."
            },
            {
                "name": "so so i guess",
                "body": "Lorem ispum"
            },
            {
                "name": "My fav every book",
                "body": "Lorem ispum"
            }
        ]
    },
    {
        "_id": "6420fa2bdce0306ae80ee9b3",
        "title": "The life of a woman"
    },
    {
        "_id": "6420fa2bdce0306ae80ee9b4",
        "title": "Women are dangerous"
    },
    {
        "_id": "6420fa2bdce0306ae80ee9b5",
        "title": "Women are heartless",
        "genres": [
            "Encyclopedia",
            "Dystopia",
            "Fantasy"
        ]
    },
    {
        "_id": "64211c185bfca3f0ec117879",
        "title": "Women don't deserve good men",
        "author": {
            "name": "Patrick Lawson"
        },
        "rating": 5,
        "genres": [
            "fantasy",
            "Documentation"
        ]
    },
    {
        "_id": "645c0e504448a0d696e46199"
    },
    {
        "_id": "645c0ebf4448a0d696e4619a",
        "title": "Love is great spread love",
        "author": "Bako Abdullahi",
        "genres": [
            "Fantasy",
            "Documentation"
        ]
    },
    {
        "_id": "645cb54dc768341c54a1d659",
        "title": "Teenegers Live",
        "author": "Anthony Higgins",
        "rating": 2.1,
        "genres": [
            "Fantasy"
        ]
    },
    {
        "_id": "645cbe0145901ae2bb441a51",
        "title": "Teenegers Live",
        "author": "Anthony Higgins",
        "rating": 2.1,
        "genres": [
            "Fantasy"
        ]
    },
    {
        "_id": "645d1a45fb8c33eca5902eb6",
        "title": "Moonlight",
        "author": "Royce Musk",
        "rating": 9,
        "genres": [
            "Dystopian"
        ]
    },
    {
        "_id": "646173db3f38f3b0498c5648",
        "title": "Foced into marriage",
        "author": {
            "name": "Bako Abass"
        }
    },
    {
        "_id": "646174170deee10d3c3193ae",
        "title": "Forced into marriage",
        "author": {
            "name": "Bako Abass"
        }
    },
    {
        "_id": "64617e22754c2250f253890c",
        "title": "When you lose the love of your life",
        "author": {
            "name": "Bako Abass"
        }
    },
    {
        "_id": "6464fa07d70d46e8a07efa3a"
    },
    {
        "_id": "64650e4ba6a7d22604d851a5"
    },
    {
        "_id": "6459afd894b73a28500432e8",
        "name": "Npm",
        "year": 2017,
        "genres": [
            "Programming"
        ]
    },
];

router.get('/bookdb/:title', (req, res) => {
    const { title } = req.params;
    const bookstore = books.find(b => b.title === title);
    res.send(bookstore);
});

module.exports = router;