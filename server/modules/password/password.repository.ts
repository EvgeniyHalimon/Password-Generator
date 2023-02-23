import { IDType, IPasswordObject, IQueries } from '../types/types';

import { Password } from './password.entity';

const passwordRepository = {
  findByUserID: async (id: IDType) => {
    return await Password.find({ userId: id }).exec();
  },
  findByIDAndPaginate: async (id: IDType, queries: IQueries) => {
    return await Password.find({ userId: id, applicationName: { $regex: queries.search, $options: 'i' } })
      .collation({ locale: 'en' })
      .limit(queries.limit)
      .skip(queries.page * queries.limit)
      .sort({ [queries.sortBy] : queries.sort });
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
  passwordQuantity: async (id: IDType) => {
    return await Password.find({ userId: id }).countDocuments().exec();
  },
};

export { passwordRepository };