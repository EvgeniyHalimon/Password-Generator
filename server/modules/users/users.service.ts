import { CustomError } from '../../shared/CustomError.js';

import { userRepository } from './users.repository.js';

const userService = {
  findOneUser : async (id: string) => {
    const user = await userRepository.findOne(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return user;
  },
  findUser : async (user: string) => {
    const username = await userRepository.findUser(user);
    if (!username){
      throw new CustomError({ message: 'Unauthorized', status: 401 });
    } 
    return username;
  },
  findNewUser : async (user: string) => {
    const username = await userRepository.findUser(user);
    if (username){
      throw new CustomError({ message: 'User already exists', status: 409 });
    } 
    return username;
  },
  findAllUsers : async () => {
    const users = await userRepository.findAll();
    if (!users){
      throw new CustomError({ message: 'No users found', status: 204 });
    } 
    return users;
  },
  deleteOneUser : async (id: string) => {
    const user = await userRepository.findOne(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return userRepository.deleteOne(id);
  },
};

export{ userService };
   