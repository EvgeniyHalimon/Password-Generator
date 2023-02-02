import bcrypt from 'bcrypt';

import jwt, { Secret } from 'jsonwebtoken';

import { SALT_ROUNDS } from '../../constants/constants.js';

import { CustomError } from '../../shared/CustomError.js';
import { ILoginService } from '../../types/types.js';

const userRepository = require('../users/users.repository');

const ACCESS_KEY: Secret | any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret | any = process.env.REFRESH_TOKEN_SECRET;

const authorizationService = {
  login: async (body: any) : Promise<ILoginService | undefined> => {
    const foundUser = await userRepository.findUser(body.username);
    if (!foundUser){
      throw new CustomError({ message: 'Unauthorized', status: 401 });
    }
    // evaluate password 
    const match = await bcrypt.compare(body.password, foundUser.password);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        {
          'UserInfo': {
            'id': foundUser._id,
          },
        },
        ACCESS_KEY,
        { expiresIn: '10s' },
      );
      const refreshToken = jwt.sign(
        {
          'UserInfo': {
            'id': foundUser._id,
          },
        },
        REFRESH_KEY,
        { expiresIn: '1d' },
      );
  
      return { accessToken, refreshToken };
    }
  },
  newUser: async (body: any) => {
    const foundUser = await userRepository.findUser(body.username);
    if (foundUser){
      throw new CustomError({ message: 'User already exists', status: 409 });
    }
    //encrypt the password
    const hashedPwd = await bcrypt.hash(body.password, SALT_ROUNDS);
    const hashedInnerPwd = await bcrypt.hash(body.innerButton, SALT_ROUNDS);
    //create and store the new user
    await userRepository.createNewUser({
      'username': body.username ,
      'password': hashedPwd,
      'innerPassword': hashedInnerPwd,
      'email': body.email,
    });
  },
  refreshToken: async (cookies: any, id: string) => {
    if (!cookies?.jwt){
      throw new CustomError({ message: 'Unauthorized', status: 401 });
    }
    const refreshToken = cookies.jwt;
  
    const foundUser = await userRepository.findOne(id);
    if (!foundUser){
      throw new CustomError({ message: 'User not found', status: 401 });
    }
    // evaluate jwt 
    jwt.verify(
      refreshToken,
      REFRESH_KEY,
      (err: any, decoded: any) => {
        if (err || foundUser.username !== decoded.username){
          throw new CustomError({ message: 'User not found', status: 401 });
        }
        const accessToken = jwt.sign(
          {
            'UserInfo': {
              'id': foundUser._id,
            },
          },
          ACCESS_KEY,
          { expiresIn: '10s' },
        );
        const refreshToken = jwt.sign(
          {
            'UserInfo': {
              'id': foundUser._id,
            },
          },
          REFRESH_KEY,
          { expiresIn: '1d' },
        );
        return { accessToken, refreshToken };
      },
    );
  },
};

export { authorizationService };