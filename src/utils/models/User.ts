import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true, // Ensure this is set to true
    unique: true,   // Optional: If usernames must be unique
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },  
},
{
    collection: 'users'
  },
);

const User = models.User || mongoose.model('User', userSchema);

export default User;