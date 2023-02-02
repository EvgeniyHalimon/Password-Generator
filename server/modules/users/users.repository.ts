const User = require('./users.entity');

interface IUser{
  username: string,
  password: string
}

const userRepository = {
  findOne: async (id: string) => {
    return User.findOne({ _id: id }).exec();
  },
  findUser: async (user: string) => {
    return User.findOne({ username: user }).exec();
  },
  findAll: async () => {
    return User.find();
  },
  deleteOne: async (id: string) => {
    return User.deleteOne({ _id: id });
  },
  createNewUser: async(userObject: IUser) => {
    return User.create(userObject);
  },
};




export{ userRepository };
