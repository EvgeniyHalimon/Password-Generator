import { ObjectId } from 'mongoose';

import { User } from './users.entity';

interface IUser{
  username: string,
  password: string,
  innerPassword: string,
  email: string,
}

const userRepository = {
  findOne: async (id: ObjectId | string) => {
    return await User.findById(id).exec();
  },
  findUser: async (user: string) => {
    return await User.findOne({ username: user }).exec();
  },
  findAll: async () => {
    return await User.find();
  },
  deleteOne: async (id: ObjectId | string) => {
    return await User.findByIdAndDelete(id);
  },
  createNewUser: async(userObject: IUser) => {
    return await User.create(userObject);
  },
};




export{ userRepository };
