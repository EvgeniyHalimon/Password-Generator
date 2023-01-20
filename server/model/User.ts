import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  innerPassword: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    User: {
      type: Number,
    },
    PremiumUser: Number,
    Admin: Number,
  },
});

module.exports = mongoose.model('User', userSchema);