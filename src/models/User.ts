import mongoose, { Document, Schema, Types } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: UserRole;
  passwordResetOtp?: string;
  passwordResetOtpExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);