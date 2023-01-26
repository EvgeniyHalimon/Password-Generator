import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';

require('dotenv').config();
const app = express();
const path = require('path');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logEvents');
const verifyJWT = require('./middleware/verifyJWT');


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

// routes
app.use('/register', require('./routes/register.ts'));
app.use('/auth', require('./routes/auth.ts'));
app.use('/refresh', require('./routes/refresh.ts'));

app.use(verifyJWT);

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

app.use(errorHandler);

app.use((err: ValidationError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});