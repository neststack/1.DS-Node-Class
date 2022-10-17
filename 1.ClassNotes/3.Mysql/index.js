const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const SiteController = require('./Controller/SiteController');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
