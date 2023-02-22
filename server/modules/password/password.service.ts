import bcrypt from 'bcrypt';

import { CustomError } from '../../shared/CustomError';
import { decrypt, encrypt } from '../../shared/cipherMachine';
import { IDType, IPasswordObject } from '../types/types';

import { userRepository } from '../users/users.repository';

import { passwordRepository } from './password.repository';


const passwordService = {
  createPassword: async (id: IDType, body: any) => {
    const encryptedPassword = encrypt(body.password);
    console.log('🚀 ~ file: password.service.ts:10 ~ createPassword: ~ encryptedPassword:', encryptedPassword);
    await passwordRepository.createNewPassword({
      password: encryptedPassword,
      applicationName: body.applicationName,
      userId: id,
    });
  },
  updatePassword: async (body: any) => {
    const password = await passwordRepository.findAndUpdate(body.id, body);
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
  findAllUserPasswords: async (id: IDType) => {
    const passwords = await passwordRepository.findByUserID(id);
    if (!passwords){
      throw new CustomError({ message: 'Passwords not found', status: 404 });
    }
    return passwords;
  },
  findPasswordByApplicationName: async (id: IDType, applicationName: string) => {
    const passwords: any = await passwordRepository.findByUserID(id);
    if (!passwords){
      throw new CustomError({ message: 'Passwords not found not found', status: 404 });
    }
    return passwords.filter((password) => password.applicationName === applicationName);
  },
  getPassword: async (id: IDType, body: any) => {
    const foundUser = await userRepository.findInnerPassword(id);
    // evaluate password 
    const match = await bcrypt.compare(body.innerPassword, foundUser.innerPassword);
    if(match){
      const passwords = await passwordRepository.findByUserID(id);
      const result = passwords.map((password: IPasswordObject | any) => {
        return { ...password.toJSON(), password: decrypt(password.password) };
      });
      return result;
    }
  },
};

export { passwordService };