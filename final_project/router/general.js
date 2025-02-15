const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


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



// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json(JSON.stringify(books, null, 2));
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let isbn = req.params.isbn; // Obtiene el ISBN de los parámetros de la URL
    let book = books[isbn]; // Busca el libro en la base de datos

    if (book) {
        return res.status(200).json(book); // Devuelve el libro encontrado
    } else {
        return res.status(404).json({message: "Book not found"}); // Error si no existe
    }
});

  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let author = req.params.author; // Obtiene el autor de los parámetros de la URL
    let booksByAuthor = [];

    // Itera sobre el objeto books para encontrar los libros del autor
    Object.keys(books).forEach(isbn => {
        if (books[isbn].author === author) {
            booksByAuthor.push(books[isbn]); // Agrega el libro si el autor coincide
        }
    });

    if (booksByAuthor.length > 0) {
        return res.status(200).json(booksByAuthor); // Devuelve los libros encontrados
    } else {
        return res.status(404).json({message: "No books found for this author"});
    }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let title = req.params.title; // Obtiene el título desde la URL
    let booksByTitle = [];

    // Itera sobre el objeto books para encontrar el libro con el título dado
    Object.keys(books).forEach(isbn => {
        if (books[isbn].title === title) {
            booksByTitle.push(books[isbn]); // Agrega el libro si el título coincide
        }
    });

    if (booksByTitle.length > 0) {
        return res.status(200).json(booksByTitle); // Devuelve los libros encontrados
    } else {
        return res.status(404).json({message: "No books found with this title"});
    }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn; // Obtiene el ISBN de los parámetros de la URL
    let book = books[isbn]; // Busca el libro en la base de datos

    if (book) {
        return res.status(200).json(book.reviews); // Devuelve las reseñas del libro
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});



module.exports.general = public_users;
