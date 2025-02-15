const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    // Verifica si el usuario tiene una sesión activa con un token
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        // Verifica el JWT
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;  // Adjunta la información del usuario a la solicitud
                next();  // Permite continuar con la siguiente función de middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
