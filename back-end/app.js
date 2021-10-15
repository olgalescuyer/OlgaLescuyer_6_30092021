const express = require('express');
const app = express();

require('./db/config');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
//parser

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;