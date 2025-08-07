const { body, check, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateAdminRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation
];

const validateAdminLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation
];

const validateCreateSeller = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobileNo')
    .isMobilePhone().withMessage('Valid mobile number is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('skills').isArray({ min: 1 }).withMessage('At least one skill is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidation
];

const validateSellerLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation
];

const validateAddProduct = [
  body('productName').notEmpty().withMessage('Product name is required'),
  body('productDescription').notEmpty().withMessage('Product description is required'),
  body('brands.*.brandName')
    .isString()
    .withMessage('Brand name must be a string')
    .notEmpty()
    .withMessage('Brand name is required'),
  body('brands.*.detail')
    .isString()
    .withMessage('Brand detail must be a string')
    .notEmpty()
    .withMessage('Brand detail is required'),
  body('brands.*.price')
  .custom((val) => !isNaN(parseFloat(val)) && isFinite(val))
  .isFloat({ gt: 0 })
  .withMessage('Brand price must be a valid number'),
  handleValidation
];

module.exports = {
  validateAdminRegister,
  validateAdminLogin,
  validateCreateSeller,
  validateSellerLogin,
  validateAddProduct,
};
