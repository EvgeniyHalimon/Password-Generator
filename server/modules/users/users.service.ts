import { CustomError } from '../../shared/CustomError.js';

import { userRepository } from './users.repository.js';

const userService = {
  findOneUser : async (id: string) => {
    const user = userRepository.findOne(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return user;
  },
  findAllUsers : async () => {
    const users = userRepository.findAll();
    if (!users){
      throw new CustomError({ message: 'No users found', status: 204 });
    } 
    return users;
  },
  deleteOneUser : async (id: string) => {
    const user = userRepository.findOne(id);
    if (!user){
      throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
    } 
    return userRepository.deleteOne(id);
  },
}

export{ userService };
   