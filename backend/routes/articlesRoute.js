const express = require('express');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

const Article = require('../models/articlesModel.js');
const config = require('../config.js');
const isAuthenticated = require('../middleware/auth.middleware');

let router = express.Router();

const checkForErrors = ({ title, author, content, price }) => {
    let errors = {};
    let isValid = false;
    if (title === '') {
        errors = { ...errors, title: 'This field is required' }
    }
    if (author === '') {
        errors = { ...errors, author: 'This field is required' }
    }
    if (content === '') {
        errors = { ...errors, content: 'This field is required' }
    }
    if (!price) {
        errors = { ...errors, price: 'This field is required or should be higher than 0' }
    }

    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }
    isValid = true;
    return { isValid, errors };
}

router.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        res.json({ articles });
    })
});

router.get('/myarticles', isAuthenticated, (req, res) => {
    Article.find({authorId: req.authorId}, (err, articles) => {
        if (err) throw err;
        res.json({ articles });
    })
});

router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) throw err;
        res.json({ article });
    })
});

router.post('/add', isAuthenticated, (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const content = req.body.content || '';
    const price = req.body.price || '';
    const authorId = req.authorId;
    const status = "pending";

    const { isValid, errors } = checkForErrors({ title, author, content, price });

    if (isValid) {
        const newArticle = new Article({
            title: title,
            author: author,
            content: content,
            price: price,
            authorId: new ObjectId(authorId),
            status: status
        });

        newArticle.save((err) => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    } else {
        res.json({ errors });
    }
});

router.post('/edit/:id', isAuthenticated, (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const content = req.body.content || '';
    const price = req.body.price || '';
    const authorId = req.authorId;

    const { isValid, errors } = checkForErrors({ title, author, content, price });

    if (isValid) {
        const updatedArticle = {
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            price: req.body.price,
            authorId: new ObjectId(authorId)
        };

        Article.findByIdAndUpdate(req.params.id, updatedArticle, err => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
    } else {
        res.json({ errors });
    }
});

router.delete('/delete/:id', isAuthenticated, (req, res) => {
    Article.remove({_id: req.params.id}, err => {
        res.json({ success: 'success' });
    });
});

module.exports = router;