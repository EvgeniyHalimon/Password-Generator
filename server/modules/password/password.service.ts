import bcrypt from 'bcrypt';

import { CustomError } from '../../shared/CustomError';
import { decrypt, encrypt } from '../../shared/cipherMachine';

import { convertID } from '../../shared/convertID';
import { userRepository } from '../users/users.repository';

import { passwordRepository } from './password.repository';
import { IPasswordBody, IEncryptedPasswordObject, IQueries, Roles } from './types';


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

const passwordService = {
  create: async (id: string, role: string, body: IPasswordBody) => {
    const encryptedPassword = encrypt(body.password);
    const passwordsQuantity = await passwordRepository.passwordQuantity(id);
    if(role === Roles.USER && passwordsQuantity === LIMIT_OF_PASSWORDS){
      throw new CustomError({ message: 'You have reach your account limit of passwords', status: 401 });
    }
    await passwordRepository.createNewPassword({
      password: encryptedPassword,
      applicationName: body.applicationName,
      userId: convertID(id),
    });
  },

  update: async (body: IEncryptedPasswordObject) => {
    const pwd = typeof body.password === 'object' ? body.password : encrypt(body.password);
    const password = await passwordRepository.findAndUpdate(body.id , { ...body, password: pwd  });
    if (!password){
      throw new CustomError({ message: 'Password not found', status: 404 });
    } 
    return password;
  },

  delete: async (ids: string[]) => {
    return await passwordRepository.deletePasswords(ids);
  },

  get: async (id: string, queries: IQueries | any) => {
    const passwords = await passwordRepository.findByIDAndPaginate(id, buildQueryObject(queries));
    const passwordsQuantity = passwords.length;
    if (!passwords){
      throw new CustomError({ message: 'Passwords not found not found', status: 404 });
    }
    return { passwords: passwords, totalPages: Math.ceil(passwordsQuantity / queries.limit), totalPasswords: passwordsQuantity };
  },
  
  decrypt: async (id: string, innerPassword: string) => {
    const foundUser = await userRepository.findUserByIdForDecrypt(id);
    // evaluate password
    const match = await bcrypt.compare(innerPassword, foundUser.innerPassword);
    if (!match){
      throw new CustomError({ message: 'Wrong password', status: 401 });
    } 
    if(match){
      const passwords = await passwordRepository.findByUserID(id);
      const passwordsQuantity = passwords.length;
      //! TODO: remove any
      const result = passwords.map((password) => {
        return { ...password.toJSON(), password: decrypt(password.password) };
      });
      return { passwords: result, totalPages: Math.ceil(passwordsQuantity / LIMIT_PER_PAGE), totalPasswords: passwordsQuantity };
    }
  },
};

export { passwordService };