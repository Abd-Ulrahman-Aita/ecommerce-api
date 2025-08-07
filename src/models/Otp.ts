import mongoose, { Document, Schema } from 'mongoose';

export interface IOtp extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IOtp>('Otp', otpSchema);
