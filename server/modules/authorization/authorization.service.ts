import bcrypt from 'bcrypt';

import jwt, { Secret } from 'jsonwebtoken';

import { CustomError } from '../../shared/CustomError.js';
import { ILoginService } from '../../types/types.js';

const userRepository = require('../users/users.repository');

const ACCESS_KEY: Secret | any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY: Secret | any = process.env.REFRESH_TOKEN_SECRET;

const loginService = async (user: string, pwd: string) : Promise<ILoginService | undefined> => {
  if (!user || !pwd) {
    throw new CustomError({ message: 'Username and password are required.', status: 400 });
  }

  const foundUser = await userRepository.findUser(user);
  if (!foundUser){
    throw new CustomError({ message: 'Unauthorized', status: 401 });
  }
  // evaluate password 
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const userRoles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        'UserInfo': {
          'username': foundUser.username,
          'roles': userRoles,
        },
      },
      ACCESS_KEY,
      { expiresIn: '10s' },
    );
    const refreshToken = jwt.sign(
      { 'username': foundUser.username },
      REFRESH_KEY,
      { expiresIn: '1d' },
    );

    return { userRoles, accessToken, refreshToken };
  }
};

const newUserService = async (user: string, pwd: string) => {
  if (!user || !pwd) {
    throw new CustomError({ message: 'Username and password are required.', status: 400 });
  }
  const foundUser = await userRepository.findUser(user);
  if (foundUser){
    throw new CustomError({ message: 'User already exists', status: 409 });
  }
  //encrypt the password
  const hashedPwd = await bcrypt.hash(pwd, 10);
  //create and store the new user
  await userRepository.createNewUser({
    'username': user,
    'password': hashedPwd,
  });
}

const refreshTokenService = async (cookies: any, id: string) => {
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
      const userRoles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          'UserInfo': {
            'username': decoded.username,
            'roles': userRoles,
          },
        },
        ACCESS_KEY,
        { expiresIn: '10s' },
      );
      return { userRoles, accessToken };
    },
  );
}

export { loginService, newUserService };