const express = require('express');
const helmet = require('helmet');

const rateLimit = require("express-rate-limit");

const app = express();
app.use(helmet());

require('./db/config');

// rate-limiter for prevent a DDos attack :
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const path = require('path');

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(limiter);

app.use(express.json());
//parser

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;