const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const db_config = process.env.DB_CONFIG;

mongoose.connect(db_config, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));