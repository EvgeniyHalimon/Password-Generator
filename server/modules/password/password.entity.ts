import mongoose from 'mongoose';
const { Schema } = mongoose;

const passwordSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  password: {
    type: String,
    required: true,
  },
  applicationName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Password', passwordSchema);