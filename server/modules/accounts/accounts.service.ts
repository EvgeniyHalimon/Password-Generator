import bcrypt from 'bcrypt';

import { CustomError } from '../../shared/CustomError';
import { decrypt, encrypt } from '../../shared/cipherMachine';

import { convertID } from '../../shared/convertID';
import { userRepository } from '../users/users.repository';

import { accountsRepository } from './accounts.repository';
import { IPasswordBody, IQueries, Roles, IPasswordUpdate } from './types';


const LIMIT_PER_PAGE = 8;
const LIMIT_OF_PASSWORDS = 9;

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
  create: async (id: string, role: string, body: IPasswordBody) => {
    const encryptedPassword = encrypt(body.password);
    const accountsQuantity = await accountsRepository.accountsQuantity(id);
    if(role === Roles.USER && accountsQuantity === LIMIT_OF_PASSWORDS){
      throw new CustomError({ message: 'You have reach your account limit of accounts', status: 401 });
    }
    await accountsRepository.create({
      password: encryptedPassword,
      applicationName: body.applicationName,
      userId: convertID(id),
    });
  },

  update: async (body: IPasswordUpdate) => {
    const pwd = typeof body.password === 'object' ? body.password : encrypt(body.password);
    const account = await accountsRepository.findAndUpdate(body.id, { ...body, password: pwd  });
    if (!account){
      throw new CustomError({ message: 'Account not found', status: 404 });
    } 
    return account;
  },

  delete: async (ids: string[]) => {
    return await accountsRepository.delete(ids);
  },

  get: async (id: string, queries: IQueries) => {
    const accounts = await accountsRepository.findByIDAndPaginate(id, buildQueryObject(queries));
    if (!accounts){
      throw new CustomError({ message: 'Accounts not found not found', status: 404 });
    }
    return { accounts: accounts[0].data, totalPages: Math.ceil(accounts[0].meta.totalPages), totalAccounts: accounts[0].meta.totalAccounts };
  },
  
  decrypt: async (id: string, innerPassword: string, queries: IQueries | any) => {
    const foundUser = await userRepository.findUserByIdForDecrypt(id);
    // evaluate password
    const match = await bcrypt.compare(innerPassword, foundUser.innerPassword);
    if (!match){
      throw new CustomError({ message: 'Wrong password', status: 401 });
    } 
    if(match){
      const accounts = await accountsRepository.findByIDAndPaginate(id, buildQueryObject(queries));
      const decryptedAccounts = accounts[0].data.map((account) => {
        return { ...account, password: decrypt(account.password) };
      });
      return { accounts: decryptedAccounts, totalPages: Math.ceil(accounts[0].meta.totalPages), totalAccounts: accounts[0].meta.totalAccounts };
    }
  },
};

export { accountsService };