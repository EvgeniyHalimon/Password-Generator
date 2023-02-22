import { IDType, IPasswordObject } from '../types/types';

import { Password } from './password.entity';

const passwordRepository = {
  findByUserID: async (id: IDType) => {
    return await Password.find({ userId: id });
  },
  findByPasswordID: async (id: IDType) => {
    return await Password.find({ _id: id }).exec();
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