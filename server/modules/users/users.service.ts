import { CustomError } from '../../shared/CustomError';
import { IDeleteResponse, IUser } from '../../shared/types/types';

import { IUserDocResponce } from './types';

import { userRepository } from './users.repository';

const userService = {
  findByID : async (id: string): Promise<IUserDocResponce> => {
    const user = await userRepository.findUserById(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return user;
  },

  findByEmail : async (email: string): Promise<IUserDocResponce> => {
    const username = await userRepository.findUser(email);
    if (!username){
      throw new CustomError({ message: 'No such email', status: 401 });
    } 
    return username;
  },

  checkIfUserExist : async (email: string): Promise<IUser> => {
    const username = await userRepository.findUser(email);
    if (username){
      throw new CustomError({ message: 'User already exists', status: 409 });
    } 
    return username;
  },

  findAll : async (): Promise<IUser[]> => {
    const users = await userRepository.findAllUsers();
    if (!users){
      throw new CustomError({ message: 'No users found', status: 204 });
    } 
    return users;
  },
  
  delete : async (id: string): Promise<IDeleteResponse> => {
    return await userRepository.deleteUser(id);
  },
};

export { userService };
   