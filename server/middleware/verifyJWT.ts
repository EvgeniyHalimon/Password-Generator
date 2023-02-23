import dotenv from 'dotenv';
import { NextFunction, Response } from 'express';

import jwt, { Secret } from 'jsonwebtoken';

import { CustomRequest } from '../modules/types/types';
import { CustomError } from '../shared/CustomError';

dotenv.config();

const ACCESS_KEY: Secret | any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret | any = process.env.REFRESH_TOKEN_SECRET;

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  if(req.url == '/auth/register' || req.url == '/auth/login'){
    return next();
  }
  const authHeader = req.headers['authorization'];
  if(!authHeader) throw new CustomError({ message: 'Unauthorized', status: 401 });
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    req.url === '/auth/refresh' ? REFRESH_KEY : ACCESS_KEY,
    (err: any, decoded: any) => {
      if(err) throw new CustomError({ message: 'Forbidden', status: 403 });
      req.id = decoded.userInfo.id;
      req.role = decoded.userInfo.role;
      next();
    },
  );
};

export default verifyJWT;