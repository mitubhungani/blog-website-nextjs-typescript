import { Schema, model, Document } from 'mongoose';

// 1. Define the TypeScript interface extending mongoose.Document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the Mongoose schema corresponding to the interface
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
