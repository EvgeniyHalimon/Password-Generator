import bcrypt from 'bcrypt';

import jwt, { Secret } from 'jsonwebtoken';

import { SALT_ROUNDS } from '../constants/constants';

import { IDType, ITokens, IUser } from '../types/types';
import { userRepository } from '../users/users.repository';
import { userService } from '../users/users.service';

const ACCESS_KEY: Secret | any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret | any = process.env.REFRESH_TOKEN_SECRET;

//! TODO: remove any
const generateTokens = (foundUser: IUser | any) => {
  const accessToken = jwt.sign(
    {
      'userInfo': {
        'id': foundUser._id,
      },
    },
    ACCESS_KEY,
    { expiresIn: '1h' },
  );
  const refreshToken = jwt.sign(
    {
      'userInfo': {
        'id': foundUser._id,
      },
    },
    REFRESH_KEY,
    { expiresIn: '1d' },
  );
  return { accessToken, refreshToken };
};

const authorizationService = {
  login: async (body: IUser) : Promise<ITokens | undefined> => {
    const foundUser = await userService.findUser(body.email);
    // evaluate password 
    const match = await bcrypt.compare(body.password, foundUser.password);
    if (match) {
      // create JWTs
      return generateTokens(foundUser);
    }
  },
  newUser: async (body: IUser) => {
    const foundUser = await userService.checkIfUserExist(body.email);
    if(!foundUser){
      //encrypt the password
      const hashedPwd = await bcrypt.hash(body.password, SALT_ROUNDS);
      const hashedInnerPwd = await bcrypt.hash(body.innerPassword, SALT_ROUNDS);
      //create and store the new user
      await userRepository.createNewUser({
        'username': body.username ,
        'password': hashedPwd,
        'innerPassword': hashedInnerPwd,
        'email': body.email,
      });
    }
  },
  refreshToken: async (id: IDType): Promise<ITokens | undefined> => {
    const foundUser = await userService.findOneUser(id);
    // evaluate jwt 
    if(foundUser){
      return generateTokens(foundUser);
    }
  },
};

export { authorizationService };