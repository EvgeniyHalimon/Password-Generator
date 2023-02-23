import { IDType, IPasswordObject } from '../types/types';

import { Password } from './password.entity';

const passwordRepository = {
  findByUserID: async (id: IDType) => {
    return await Password.find({ userId: id }).exec();
  },
  findByIDAndPaginate: async (id: IDType, search: string, limit: number, page: number) => {
    return await Password.find({ userId: id, applicationName: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip(page  * limit);
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