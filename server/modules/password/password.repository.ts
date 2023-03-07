
import { convertID } from '../../shared/convertID';

import { Password } from './password.entity';
import { IPassword, IPasswordDoc, IQueries } from './types';


const passwordRepository = {
  findByUserID: async (id: string): Promise<IPasswordDoc[]> => {
    return await Password.find({ userId: convertID(id) }).exec();
  },

  findByIDAndPaginate: async (id: string, queries: IQueries) => {
    return await Password.find({ userId: convertID(id) , applicationName: { $regex: queries.search, $options: 'i' } })
      .collation({ locale: 'en' })
      .limit(queries.limit)
      .skip(queries.page * queries.limit)
      .sort({ [queries.sortBy] : queries.sort });
  },

  deletePassword: async (id: string) => {
    return await Password.findByIdAndDelete(convertID(id));
  },

  createNewPassword: async(passwordObject: IPassword) => {
    return await Password.create(passwordObject);
  },

  findAndUpdate: async (id: string, passwordObject: IPassword) => {
    return await Password.findByIdAndUpdate(convertID(id), passwordObject);
  },
  
  passwordQuantity: async (id: string) => {
    return await Password.find({ userId: convertID(id) }).countDocuments().exec();
  },

  deletePasswords: async (ids: string[]) => {
    return await Password.deleteMany({ _id: { $in: ids } });
  },
};

export { passwordRepository };