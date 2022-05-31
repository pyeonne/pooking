import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';
import { createError } from './error.js';

export const isAuth = async (req, res, next) => {
  let token;
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    token = req.cookies['token'];
  }

  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return next(createError(403, 'Token is not valid!'));
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return next(createError(401, 'User not found!'));
    }
    req.userId = user.id;
    req.token = token;
    req.isAdmin = user.isAdmin;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};
