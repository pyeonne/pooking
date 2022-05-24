import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
  body('username').trim().notEmpty().withMessage('username is missing'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  validate,
];

// * POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// * POST /auth/login
router.post('/login', validateCredential, authController.login);

export default router;
