import path from 'path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import mongoose from 'mongoose';

import corsOptions from './config/corsOptions';
import connectDB from './config/dbConnection';
import credentials from './middleware/credentials';
import errorHandler from './middleware/errorHandler';
import { logger } from './middleware/logEvents';
import verifyJWT from './middleware/verifyJWT';
import authController from './modules/authorization/authorization.controller';
import userController from './modules/users/users.controller';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3210;

//Connect to Mongo
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross origin resourse sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(errorHandler);

app.use((err: ValidationError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

app.use(verifyJWT);
// routes
app.use('/auth', authController);
app.use('/users', userController);

app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ 'error': '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});