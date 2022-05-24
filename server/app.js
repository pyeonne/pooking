import express from 'express';
import 'express-async-errors';
import authRouter from './router/auth.js';
import hotelsRouter from './router/hotels.js';
import roomsRouter from './router/rooms.js';
import usersRouter from './router/users.js';
import { config } from './config.js';
import { connectDB } from './database/database.js';

const app = express();

// * middleware
app.use(express.json());

app.use('/auth', authRouter);
app.use('/hotels', hotelsRouter);
app.use('/rooms', roomsRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const errorStatus = err.stats || 500;
  const errorMessage = err.message || 'Something went wrong! 😱';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

connectDB()
  .then(() => {
    console.log(`Server is started... ${new Date()}`);
    app.listen(config.host.port);
  })
  .catch(console.error);
