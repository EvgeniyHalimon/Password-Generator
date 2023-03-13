import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

import { CustomError } from '../../shared/CustomError';
import { SALT_ROUNDS } from '../../shared/constants/constants';

import { IUser } from '../../shared/types/types';
import { IUserGenerateTokens } from '../users/types';
import { userRepository } from '../users/users.repository';
import { userService } from '../users/users.service';

import { ITokens } from './types';

dotenv.config();

const ACCESS_KEY: Secret = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (foundUser: IUserGenerateTokens): ITokens => {
  const accessToken = jwt.sign(
    {
      'userInfo': {
        'id': foundUser._id,
        'role': foundUser.role,
      },
    },
    ACCESS_KEY,
    { expiresIn: '1h' },
  );
  const refreshToken = jwt.sign(
    {
      'userInfo': {
        'id': foundUser._id,
        'role': foundUser.role,
      },
    },
    REFRESH_KEY,
    { expiresIn: '1d' },
  );
  return { accessToken, refreshToken };
};

const authorizationService = {
  login: async (body: IUser) : Promise<ITokens | undefined> => {
    const foundUser = await userService.findByEmail(body.email);
    // evaluate password 
    const match = await bcrypt.compare(body.password, foundUser.password);
    if (!match) {
      throw new CustomError({ message: 'Password is invalid', status: 400 });
    }
    return generateTokens(foundUser);
  },

  register: async (body: IUser): Promise<void> => {
    const foundUser = await userService.checkIfUserExist(body.email);
    if(foundUser){
      throw new CustomError({ message: 'User already exist', status: 400 });
    }
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
  },
  
  refreshToken: async (id: string): Promise<ITokens | undefined> => {
    const foundUser = await userService.findByID(id);
    // evaluate jwt 
    if(foundUser){
      return generateTokens(foundUser);
    }
  },
};

export { authorizationService };