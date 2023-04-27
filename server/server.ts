import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import mongoose from 'mongoose';

import corsOptions from './config/corsOptions';
import connectDB from './config/dbConnection';
import accountController from './modules/accounts/accounts.controller';
import authController from './modules/authorization/authorization.controller';
import userController from './modules/users/users.controller';
import credentials from './shared/middleware/credentials';
import errorHandler from './shared/middleware/errorHandler';
import { logger } from './shared/middleware/logEvents';
import verifyJWT from './shared/middleware/verifyJWT';

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

// routes
app.use(verifyJWT);
app.use('/auth', authController);
app.use('/users', userController);
app.use('/password', accountController);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
