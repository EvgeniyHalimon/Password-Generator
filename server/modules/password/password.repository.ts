import { IDType } from '../types/types';

import { Password } from './password.entity';

interface IPasswordObject{
    userId: IDType,
    password: string,
    applicationName: string
}

const passwordRepository = {
  findByID: async (id: IDType) => {
    return await Password.find({ userId: id }).exec();
  },
  deletePassword: async (id: IDType) => {
    return await Password.findByIdAndDelete(id);
  },
  createNewPassword: async(passwordObject: IPasswordObject) => {
    return await Password.create(passwordObject);
  },
  findAndUpdate: async (id: IDType, passwordObject: IPasswordObject) => {
    return await Password.findByIdAndUpdate(id, passwordObject);
  },
};

export { passwordRepository };