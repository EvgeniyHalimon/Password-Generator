import bcrypt from 'bcrypt';

import jwt, { Secret } from 'jsonwebtoken';

import { SALT_ROUNDS } from '../constants/constants.js';

import { ILoginService } from '../types/types.js';
import { userService } from '../users/users.service.js';

const userRepository = require('../users/users.repository');

const ACCESS_KEY: Secret | any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret | any = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (foundUser: any) => {
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
};

const authorizationService = {
  login: async (body: any) : Promise<ILoginService | undefined> => {
    const foundUser = await userService.findUser(body.username);
    // evaluate password 
    const match = await bcrypt.compare(body.password, foundUser.password);
    if (match) {
      // create JWTs
      return generateTokens(foundUser);
    }
  },
  newUser: async (body: any) => {
    const foundUser = await userService.findNewUser(body.username);
    if(!foundUser){
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
    }
  },
  refreshToken: async (id: string) => {
    const foundUser = await userService.findOneUser(id);
    // evaluate jwt 
    if(foundUser){
      return generateTokens(foundUser);
    }
  },
};

export { authorizationService };