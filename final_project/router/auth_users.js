const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
}

// Login de usuario
regd_users.post("/login", (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    let accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });

    req.session.authorization = { accessToken, username };
    
    return res.status(200).json({ message: "Login successful", accessToken });
});

// Agregar o modificar una reseña de un libro
regd_users.put("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    let { review } = req.body;

    if (!req.session.authorization || !req.session.authorization.username) {
        return res.status(401).json({ message: "User not logged in" });
    }

    let username = req.session.authorization.username;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
});

// Eliminar una reseña de un libro
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;

    if (!req.session.authorization || !req.session.authorization.username) {
        return res.status(401).json({ message: "User not logged in" });
    }

    let username = req.session.authorization.username;

    if (!books[isbn] || !books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found for this user and book" });
    }

    delete books[isbn].reviews[username];

    return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

