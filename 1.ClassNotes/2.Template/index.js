const app = require('express')();
const server = require('http').createServer(app);
const path = require('path');
const pug = require('pug');
const cookieParser = require('cookie-parser');
const logger = require('express-logger');

app.use(logger({ path: 'logfile.txt' }));

app.use(cookieParser());

app.use((req, res, next) => {
    console.log('simple');
    next();
});

app.use('/profile', (req, res, next) => {
    console.log('profile');
    next();
});

// app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

require('./src/routes/route')(app);

server.listen(4000, () => {
    console.log(`listening on 4000`);
});
