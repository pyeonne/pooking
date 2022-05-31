import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as roomController from '../controller/room.js';
import { isAdmin, isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateRoom = [
  body('title').notEmpty().withMessage('name is missing'),
  body('desc').notEmpty().withMessage('type is missing'),
  body('price').notEmpty().withMessage('type is missing'),
  body('maxPeople').notEmpty().withMessage('address is missing'),
  body('roomNumbers').notEmpty().withMessage('distance is missing'),
  validate,
];

// * GET /rooms
router.get('/', roomController.getRooms);

// * GET /rooms/:id
router.get('/:id', roomController.getRoom);

// * POST /rooms/:id
router.post(
  '/:hotelid',
  isAuth,
  isAdmin,
  validateRoom,
  roomController.createRoom,
);

// * PUT /rooms/:id
router.put('/:id', isAuth, isAdmin, roomController.updateRoom);

// * DELETE /rooms/:id/:hotelid
router.delete('/:id/:hotelid', isAuth, isAdmin, roomController.deleteRoom);

export default router;
