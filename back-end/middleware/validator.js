const { check, validationResult } = require('express-validator');
// form validation

exports.userValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(422).json({ succes: false, error: error });
    }

    next();
}

exports.userValidator = [
    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('It must be something like this : test@mail.com'),

    check('password')
    .isLength({ min: 8 })
    .trim()
    .withMessage('Your password must be at least 8 characters')
    .escape()
];