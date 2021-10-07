const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const configdb = process.env.DB_CONFIG;

mongoose.connect(configdb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));