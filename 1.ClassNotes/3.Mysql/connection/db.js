const sql = require('mysql');

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected');
});

module.exports = connection;
