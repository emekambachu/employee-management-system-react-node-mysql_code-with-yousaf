const { check, validationResult } = require('express-validator');

exports.loginValidation = [
    check('email')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!'),

    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!'),

    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validationErrors = [];
            errors.array().forEach(error => {
                validationErrors.push(error.msg);
            });
            return res.json({
                success: false,
                validation_errors: validationErrors
            });
        }
        next();
    },

];

// exports.validateUser = [
//     check('email')
//         .trim()
//         .escape()
//         .not()
//         .isEmpty()
//         .withMessage('User name can not be empty!')
//         .bail()
//         .isLength({min: 3})
//         .withMessage('Minimum 3 characters required!')
//         .bail(),
//     check('email')
//         .trim()
//         .normalizeEmail()
//         .not()
//         .isEmpty()
//         .withMessage('Invalid email address!')
//         .bail(),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty())
//             return res.status(422).json({errors: errors.array()});
//         next();
//     },
// ];