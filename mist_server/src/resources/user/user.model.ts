import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '@/resources/user/user.interface';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new Schema<UserDocument>(
  {
    ID: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['programmer', 'player'],
      required: true,
    },
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Game',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<UserDocument>('User', UserSchema);