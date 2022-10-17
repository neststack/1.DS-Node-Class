const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Création du serveur Express
const app = express();

// Configuration du serveur
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de donnée SQlite
const db_name = path.join(__dirname, 'data', 'apptest.db');
const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to 'apptest.db'");
});

// Create table books (Book_ID, Title, Auteur, Commentaires)
const sql_create = `Create table if not exist (
  Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL,
  Author VARCHAR(100) NOT NULL,
  Commentes TEXT
);`;
db.run(sql_create, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Create table with data');
    // Alimentation de la table
    const sql_insert = `Insert data`;
    db.run(sql_insert, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Insert Books');
    });
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Server running at (http://localhost:3000/) !');
});

// GET /
app.get('/', (req, res) => {
    // res.send("Bonjour le monde...");
    res.render('index');
});

// GET /about
app.get('/about', (req, res) => {
    res.render('about');
});

// GET /data
app.get('/data', (req, res) => {
    const test = {
        title: 'Test',
        items: ['one', 'two', 'three'],
    };
    res.render('data', { model: test });
});

// GET /books
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM Books ORDER BY Title';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('books', { model: rows });
    });
});

// GET /create
app.get('/create', (req, res) => {
    res.render('create', { model: {} });
});

// POST /create
app.post('/create', (req, res) => {
    const sql = 'INSERT INTO books (Title, Author, Commentes) VALUES (?, ?, ?)';
    const book = [req.body.Title, req.body.Author, req.body.Commentes];
    db.run(sql, book, (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/books');
    });
});

// GET /edit/5
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM books WHERE Book_ID = ?';
    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('edit', { model: row });
    });
});

// POST /edit/5
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const book = [req.body.Title, req.body.Author, req.body.Commentes, id];
    const sql =
        'UPDATE books SET Title = ?, Author = ?, Commentes = ? WHERE (Book_ID = ?)';
    db.run(sql, book, (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/books');
    });
});

// GET /delete/5
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM books WHERE Book_ID = ?';
    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('delete', { model: row });
    });
});

// POST /delete/5
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM books WHERE Book_ID = ?';
    db.run(sql, id, (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/books');
    });
});
