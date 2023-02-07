import mongoose from 'mongoose';
const { Schema } = mongoose;

const passwordSchema = new Schema({
  userId:{
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

export const Password = mongoose.model('Password', passwordSchema);