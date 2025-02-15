# Express Book Reviews API

## Project Overview
The **Express Book Reviews API** is a Node.js-based RESTful API that allows users to browse books, retrieve book details by ISBN, author, or title, and manage book reviews. This project implements **Express.js** with **session-based authentication**, allowing registered users to add, update, and delete their own book reviews.

## Features

### 📚 Public Endpoints (Accessible by All Users)
- **`GET /`**: Retrieve the full list of available books.
- **`GET /isbn/:isbn`**: Get book details using the ISBN.
- **`GET /author/:author`**: Retrieve books by a specific author.
- **`GET /title/:title`**: Retrieve books by title.
- **`GET /review/:isbn`**: View book reviews by ISBN.
- **`POST /register`**: Register a new user.

### 🔒 Authenticated Endpoints (Requires Login)
- **`POST /customer/login`**: Authenticate a user and start a session.
- **`PUT /customer/auth/review/:isbn`**: Add or update a review for a book.
- **`DELETE /customer/auth/review/:isbn`**: Delete a user’s own book review.

## Technology Stack
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Backend framework.
- **Express-Session**: Session management for authentication.
- **JWT (jsonwebtoken)**: Token-based authentication.
- **Axios**: HTTP client for making requests.
- **Promise & Async/Await**: For handling asynchronous operations.

## Implementation Details
- **Session-based authentication** tracks logged-in users. A user must log in before adding, updating, or deleting book reviews.
- **JWT tokens** are generated upon login and verified in protected routes.
- **Books data** is stored as a simple JavaScript object (`booksdb.js`).
- **Async/Await and Promises** are used for all book retrieval routes to simulate real-world asynchronous database operations.

## Project Structure
```
/expressBookReviews
│── /router
│   ├── general.js      # Public routes (GET books, register users)
│   ├── auth_users.js   # Authenticated routes (login, manage reviews)
│── booksdb.js          # Book data source
│── index.js            # Server configuration & route management
│── package.json        # Dependencies and project metadata
│── README.md           # Project documentation
```

## Setup & Run the Project

### 📥 Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RaulEstevezA/expressBookReviews.git
   cd expressBookReviews
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

### 🛠 Testing API Endpoints
You can test the API using **Postman** or `cURL`. Example request to get all books:
```bash
curl -X GET https://your-server-url/
```

### 📌 Example Login Request (Postman or cURL)
```bash
curl -X POST https://your-server-url/customer/login \
     -H "Content-Type: application/json" \
     -d '{"username": "yourUser", "password": "yourPass"}'
```

## Future Enhancements
- Integrate a database (MongoDB, PostgreSQL) instead of using a local object.
- Implement user registration with password hashing.
- Add additional authentication features such as OAuth.

---

This project demonstrates full CRUD operations, authentication handling, and API development using Node.js & Express. 🚀
