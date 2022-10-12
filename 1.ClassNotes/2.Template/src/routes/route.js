const express = require('express');
const UserController = require('../controllers/userController');
const webRouter = express.Router();
const apiRouter = express.Router();

const router = (app) => {
    app.use('/', webRouter);
    webRouter.get("/", UserController.index);

    app.use('/api', apiRouter);
    apiRouter.get("/", (req, res) => {
        res.send("Api Working");
    });
}

module.exports = router;