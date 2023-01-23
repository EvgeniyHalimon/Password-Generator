const userRepository = require('./users.repository');

const findOneUser = async (id) => {
  if(!id) {
    throw new Error('No id provided');
  }
  return userRepository.findOne(id);
};

const findAllUsers = async () => {
  return userRepository.findAll();
};

const deleteOneUser = async (id) => {
  if(!id) {
    throw new Error('No id provided');
  }
  return userRepository.deleteOne(id);
};

module.exports = { findOneUser,findAllUsers, deleteOneUser };
   