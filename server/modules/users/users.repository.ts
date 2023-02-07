import { ObjectId } from 'mongoose';

import { User } from './users.entity';

interface IUser{
  username: string,
  password: string,
  innerPassword: string,
  email: string,
}

const userRepository = {
  findUserById: async (id: ObjectId | string) => {
    return await User.findById(id).exec();
  },
  findUser: async (email: string) => {
    return await User.findOne({ email: email }).select('+password').exec();
  },
  findAllUsers: async () => {
    return await User.find();
  },
  deleteUser: async (id: ObjectId | string) => {
    return await User.findByIdAndDelete(id);
  },
  createNewUser: async(userObject: IUser) => {
    return await User.create(userObject);
  },
};

export{ userRepository };
