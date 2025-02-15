const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Registro de usuario
public_users.post("/register", (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: "User already exists" });
    }

    users.push({ username, password });  
    return res.status(201).json({ message: "User registered successfully" });
});

// Obtener la lista de libros disponibles usando async/await
public_users.get('/', async function (req, res) {
    try {
        let booksData = await new Promise((resolve) => {
            resolve(books);
        });
        return res.status(200).json(booksData);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});

// Obtener detalles del libro basado en ISBN usando async/await
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        let isbn = req.params.isbn;
        let bookDetails = await new Promise((resolve, reject) => {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject("Book not found");
            }
        });

        return res.status(200).json(bookDetails);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Obtener libros basados en el autor usando async/await
public_users.get('/author/:author', async function (req, res) {
    try {
        let author = req.params.author;
        let booksByAuthor = await new Promise((resolve, reject) => {
            let results = Object.values(books).filter(book => book.author === author);

            if (results.length > 0) {
                resolve(results);
            } else {
                reject("No books found for this author");
            }
        });

        return res.status(200).json(booksByAuthor);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});


// Obtener libros basados en el título usando async/await
public_users.get('/title/:title', async function (req, res) {
    try {
        let title = req.params.title;
        let booksByTitle = await new Promise((resolve, reject) => {
            let results = Object.values(books).filter(book => book.title === title);

            if (results.length > 0) {
                resolve(results);
            } else {
                reject("No books found with this title");
            }
        });

        return res.status(200).json(booksByTitle);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});


// Obtener reseñas de un libro basado en el ISBN
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn];

    if (book) {
        return res.status(200).json(book.reviews);
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
