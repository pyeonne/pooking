import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as hotelController from '../controller/hotel.js';
import { isAdmin, isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateHotel = [
  body('name').notEmpty().withMessage('name is missing'),
  body('type').notEmpty().withMessage('type is missing'),
  body('city').notEmpty().withMessage('type is missing'),
  body('address').notEmpty().withMessage('address is missing'),
  body('distance').notEmpty().withMessage('distance is missing'),
  body('title').notEmpty().withMessage('title is missing'),
  body('desc').notEmpty().withMessage('description is missing'),
  body('cheapestPrice').notEmpty().withMessage('price is missing'),
  validate,
];

// * GET /hotels
router.get('/', hotelController.getHotels);

// * GET /hotels/:id
router.get('/:id', hotelController.getHotel);

// * POST /hotels
router.post('/', validateHotel, hotelController.createHotel);

// * PUT /hotels/:id
router.put('/:id', isAuth, isAdmin, hotelController.updateHotel);

// * DELETE /hotels/:id
router.delete('/:id', hotelController.deleteHotel);

export default router;
