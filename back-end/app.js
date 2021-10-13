const express = require('express');
const app = express();

require('./db/config');

const userRoutes = require('./routes/user');

// CORS :
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
// bodyparser

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

app.use('/api/auth', userRoutes);

module.exports = app;