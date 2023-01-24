import { CustomError } from '../../shared/CustomError';

const userRepository = require('./users.repository');

const findOneUser = async (id) => {
  const user = userRepository.findOne(id);
  if (!user){
    throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
  } 
  return user;
};

const findAllUsers = async () => {
  const users = userRepository.findAll();
  if (!users){
    throw new CustomError({ message: 'No users found', status: 204 });
  } 
  return users;
};

const deleteOneUser = async (id) => {
  const user = await findOneUser(id);
  if (!user){
    throw new CustomError({ message: `User ID ${id} not found`, status: 404 });
  } 
  return userRepository.deleteOne(id);
};

export{ findOneUser, findAllUsers, deleteOneUser };
   