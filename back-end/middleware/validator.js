const { check, validationResult } = require('express-validator');

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
    .normalizeEmail()
    .isEmail()
    .withMessage('email is required')
    .not()
    .withMessage('must be something like this : mail@mail.com'),

    check('password')
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('password is required')
    .withMessage('password must be 8 characters')

];