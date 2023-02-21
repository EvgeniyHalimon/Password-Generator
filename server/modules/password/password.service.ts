import { CustomError } from '../../shared/CustomError';
import { IDType } from '../types/types';

import { passwordRepository } from './password.repository';

const passwordService = {
  createPassword: async (id: IDType, body: any) => {
    await passwordRepository.createNewPassword({
      password: body.password,
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
    const password = await passwordRepository.findByID(id);
    if (!password){
      throw new CustomError({ message: 'Password not found', status: 404 });
    } 
    return passwordRepository.deletePassword(id);
  },
  findAllUserPasswords: async (id: IDType) => {
    const passwords = await passwordRepository.findByID(id);
    if (!passwords){
      throw new CustomError({ message: 'Passwords not found', status: 404 });
    }
    return passwords;
  },
  findPasswordByApplicationName: async (id: IDType, applicationName: string) => {
    const passwords: any = await passwordRepository.findByID(id);
    if (!passwords){
      throw new CustomError({ message: 'Passwords not found not found', status: 404 });
    }
    return passwords.filter((password) => password.applicationName === applicationName);
  },
};

export { passwordService };