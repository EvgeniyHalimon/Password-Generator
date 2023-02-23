import bcrypt from 'bcrypt';

import { CustomError } from '../../shared/CustomError';
import { decrypt, encrypt } from '../../shared/cipherMachine';
import { IDType, IPasswordBody, IPasswordObject, IQueries, IUser } from '../types/types';

import { userRepository } from '../users/users.repository';

import { passwordRepository } from './password.repository';


const passwordService = {
  createPassword: async (id: IDType, role: string, body: IPasswordBody) => {
    const encryptedPassword = encrypt(body.password);
    const passwordsQuantity = await passwordRepository.passwordQuantity(id);
    if(role === 'user' && passwordsQuantity === 9){
      throw new CustomError({ message: 'You have reach your account limit of passwords', status: 403 });
    }
    await passwordRepository.createNewPassword({
      password: encryptedPassword,
      applicationName: body.applicationName,
      userId: id,
    });
  },
  updatePassword: async (body: IPasswordObject) => {
    const pwd = typeof body.password === 'object' ? body.password : encrypt(body.password);
    const password = await passwordRepository.findAndUpdate(body.id, { ...body, password: pwd  });
    if (!password){
      throw new CustomError({ message: 'Password not found', status: 404 });
    } 
    return password;
  },
  deletePassword: async (id: IDType) => {
    const password = await passwordRepository.findByUserID(id);
    if (!password){
      throw new CustomError({ message: 'Password not found', status: 404 });
    } 
    return passwordRepository.deletePassword(id);
  },
  getPasswords: async (id: IDType, queries: IQueries) => {
    const passwords = await passwordRepository.findByIDAndPaginate(id, queries);
    const passwordsQuantity = await passwordRepository.passwordQuantity(id);
    if (!passwords){
      throw new CustomError({ message: 'Passwords not found not found', status: 404 });
    }
    return { passwords: passwords, totalPages: Math.ceil(passwordsQuantity / queries.limit), totalPasswords: passwordsQuantity };
  },
  decryptPasswords: async (id: IDType, body: IUser) => {
    const foundUser = await userRepository.findInnerPassword(id);
    // evaluate password 
    const match = await bcrypt.compare(body.innerPassword, foundUser.innerPassword);
    if(match){
      const passwords = await passwordRepository.findByUserID(id);
      //! TODO: remove any
      const result = passwords.map((password: IPasswordObject | any) => {
        return { ...password.toJSON(), password: decrypt(password.password) };
      });
      return result;
    }
  },
};

export { passwordService };