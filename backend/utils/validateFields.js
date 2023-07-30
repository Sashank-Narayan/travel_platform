const { body, validationResult } = require('express-validator');

const validateSignUpFields = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').trim().isEmail().withMessage('Invalid email format.'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
]

const validateLoginFields = [
  body('email').trim().notEmpty().withMessage('Email is required.'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required.'),
]

module.exports = {validateSignUpFields, validateLoginFields};
