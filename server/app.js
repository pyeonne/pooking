import express from 'express';
import { config } from './config.js';
import { connectDB } from './database/database.js';

const app = express();

connectDB()
  .then(() => {
    console.log(`Server is started... ${new Date()}`);
    app.listen(config.host.port);
  })
  .catch(console.error);
