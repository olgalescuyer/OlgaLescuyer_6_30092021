const express = require('express');
const router = express.Router();

// form validation :
const { userValidationResult, userValidator } = require('../middleware/validator')

// const userCtrl = require('../controllers/user');
// other syntax :
const { signup, login } = require('../controllers/user');

router.post('/signup', userValidator, userValidationResult, signup);
router.post('/login', login);

module.exports = router;