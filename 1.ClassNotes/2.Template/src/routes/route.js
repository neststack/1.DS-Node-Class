const express = require('express');
const UserController = require('../controllers/userController');
const webRouter = express.Router();
const apiRouter = express.Router();

const newMiddleware = (req, res, next) => {
    console.log('route newMiddleware');
    next();
};

const newMiddleware2 = (req, res, next) => {
    console.log('route newMiddleware2');
    next();
};

const router = (app) => {
    app.use('/', webRouter);
    webRouter.get('/', UserController.index);

    app.use('/api', apiRouter);
    apiRouter.get('/', (req, res) => {
        res.send('Api Working');
    });

    app.use('/test', [newMiddleware, newMiddleware2], UserController.index);
};

module.exports = router;
