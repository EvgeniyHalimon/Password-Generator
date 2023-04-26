import bcrypt from 'bcrypt';

import { CustomError } from '../../shared/CustomError';
import { decrypt, encrypt } from '../../shared/cipherMachine';

import { convertID } from '../../shared/convertID';
import { IDeleteResponse } from '../../shared/types/types';
import { userRepository } from '../users/users.repository';

import { accountsRepository } from './accounts.repository';
import { IPasswordBody, IQueries, Roles, IPasswordUpdate, IAccountResponce, IAccountDecrypted } from './types';

const LIMIT_OF_PASSWORDS = 40;

const buildQueryObject = (query: IQueries): IQueries => {
  return {
    page: Number(query.page) - 1 || 0,
    limit: Number(query.limit) || 5,
    search: query.search.toString() || '',
    sortBy: query.sortBy.toString() || '',
    sort: query.sort || 'asc',
  };
};

const accountsService = {
  create: async (id: string, role: string, body: IPasswordBody): Promise<any> => {
    const encryptedPassword = encrypt(body.password);
    const accountsQuantity = await accountsRepository.accountsQuantity(id);
    if(role === Roles.USER && accountsQuantity === LIMIT_OF_PASSWORDS){
      throw new CustomError({ message: 'You have reach your account limit of accounts', status: 401 });
    }
    return await accountsRepository.create({
      password: encryptedPassword,
      applicationName: body.applicationName,
      userId: convertID(id),
    });
  },

  update: async (body: IPasswordUpdate): Promise<void> => {
    const pwd = typeof body.password === 'object' ? body.password : encrypt(body.password);
    const account = await accountsRepository.findAndUpdate(body.id, { ...body, password: pwd  });
    if (!account){
      throw new CustomError({ message: 'Account not found', status: 404 });
    }
  },

  delete: async (ids: string[]): Promise<IDeleteResponse> => {
    return await accountsRepository.delete(ids);
  },

  get: async (id: string, queries: IQueries): Promise<IAccountResponce> => {
    const accounts = await accountsRepository.findByIDAndPaginate(id, buildQueryObject(queries));
    if (!accounts){
      throw new CustomError({ message: 'Accounts not found', status: 404 });
    }
    return { accounts: accounts[0].data, totalPages: Math.ceil(accounts[0].meta.totalPages), totalAccounts: accounts[0].meta.totalAccounts };
  },
  
  decrypt: async (userId: string, id: string, innerPassword: string): Promise<IAccountDecrypted> => {
    const foundUser = await userRepository.findUserByIdForDecrypt(userId);
    const foundAccount = await accountsRepository.findByAccountID(id);
    // evaluate password
    const match = await bcrypt.compare(innerPassword, foundUser.innerPassword);
    if (!match){
      throw new CustomError({ message: 'Wrong password', status: 401 });
    }
    return Object.defineProperty(foundAccount['_doc'], 'password', { value: decrypt(foundAccount['_doc'].password) });

    /* 
    FOR MASS DECRYPTION
    const accounts = await accountsRepository.findByIDAndPaginate(id, buildQueryObject(queries));
    const decryptedAccounts = accounts[0].data.map((account) => {
      return { ...account, password: decrypt(account.password) };
    });
    return { accounts: decryptedAccounts, totalPages: Math.ceil(accounts[0].meta.totalPages), totalAccounts: accounts[0].meta.totalAccounts }; */
  },
};

export { accountsService };