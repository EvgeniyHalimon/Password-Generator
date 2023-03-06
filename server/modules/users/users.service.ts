import { CustomError } from '../../shared/CustomError';

import { userRepository } from './users.repository';

const userService = {
  findByID : async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return user;
  },

  findByEmail : async (email: string) => {
    const username = await userRepository.findUser(email);
    if (!username){
      throw new CustomError({ message: 'Unauthorized', status: 401 });
    } 
    return username;
  },

  checkIfUserExist : async (email: string) => {
    const username = await userRepository.findUser(email);
    if (username){
      throw new CustomError({ message: 'User already exists', status: 409 });
    } 
    return username;
  },

  findAll : async () => {
    const users = await userRepository.findAllUsers();
    if (!users){
      throw new CustomError({ message: 'No users found', status: 204 });
    } 
    return users;
  },
  
  delete : async (id: string) => {
    return userRepository.deleteUser(id);
  },
};

export { userService };
   