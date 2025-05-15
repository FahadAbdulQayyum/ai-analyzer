// src/utils/db.ts
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.DATABASE_URL as string);
};