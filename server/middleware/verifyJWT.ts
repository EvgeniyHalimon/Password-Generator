import { NextFunction, Response } from 'express';

require('dotenv');
import jwt, { Secret } from 'jsonwebtoken';
const ACCESS_KEY: Secret | any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret | any = process.env.REFRESH_TOKEN_SECRET;

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    req.route.path === '/refresh' ? REFRESH_KEY : ACCESS_KEY,
    (err: any, decoded: any) => {
      if(err) return res.sendStatus(403);
      req.user = decoded.username;
      next();
    },
  );
};

module.exports = verifyJWT;