const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    let { username, password } = req.body; 

    // Validar que ambos campos estén presentes
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Verificar si el usuario existe en el array `users`
    let user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Crear un token JWT con una clave secreta
    let accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });

    req.session.username = username;

    return res.status(200).json({ message: "Login successful", accessToken });
});




// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    console.log("🔍 Intentando agregar/modificar una reseña...");
    console.log("SESSION DATA:", req.session);

    let isbn = req.params.isbn;
    let { review } = req.body;
    let username = req.session.username;

    if (!username) {
        console.log("⚠️ Usuario no autenticado.");
        return res.status(401).json({ message: "User not logged in" });
    }

    if (!books[isbn]) {
        console.log("⚠️ Libro no encontrado.");
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review;
    console.log("✅ Reseña añadida/modificada con éxito.");

    return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
});







module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
