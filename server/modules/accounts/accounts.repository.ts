import { convertID } from '../../shared/convertID';
import { IDeleteResponse } from '../../shared/types/types';

import { Account } from './accounts.entity';
import { IAccount, IAccountWithMetaDoc, IAccountDoc, IQueries } from './types';

const accountsRepository = {
  findByUserID: async (id: string): Promise<IAccountDoc[]> => {
    return await Account.find({ userId: convertID(id) }).exec();
  },

  findByIDAndPaginate: async (id: string, queries: IQueries): Promise<IAccountWithMetaDoc[]> => {
    return await Account.aggregate([
      { $match: { userId: convertID(id) , applicationName: { $regex: queries.search, $options: 'i' } } },
      {
        $facet: {
          data: [
            { $sort : { [queries.sortBy] : queries.sort === 'asc' ? 1 : -1 } },
            { $skip: queries.page * queries.limit },
            { $limit: queries.limit }, 
          ],
          pagination: [
            { $count: 'total' },
          ],
          total: [{
            $count: `${queries.sortBy}`,
          }],
        },
      },
      {
        $unwind: '$total',
      },
      {
        $project: {
          data: {
            $slice: ['$data', queries.page * queries.limit, {
              $ifNull: [queries.limit, `$total.${queries.sortBy}`],
            }],
          },
          meta: {
            totalAccounts: `$total.${queries.sortBy}`,
            limit: {
              $literal:queries.limit ,
            },
            totalPages: {
              $ceil: {
                $divide: [`$total.${queries.sortBy}`, queries.limit],
              },
            },
          },
        },
      },
    ]);
  },

  create: async(passwordObject: IAccount): Promise<IAccountDoc> => {
    return await Account.create(passwordObject);
  },

  findAndUpdate: async (id: string, passwordObject: IAccount): Promise<IAccountDoc> => {
    return await Account.findByIdAndUpdate(convertID(id), passwordObject);
  },
  
  accountsQuantity: async (id: string): Promise<number> => {
    return await Account.find({ userId: convertID(id) }).countDocuments().exec();
  },

  delete: async (ids: string[]): Promise<IDeleteResponse> => {
    return await Account.deleteMany({ _id: { $in: ids } });
  },
};

export { accountsRepository };