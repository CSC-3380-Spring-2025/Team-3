import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '@/resources/user/user.interface';

const UserSchema = new Schema<UserDocument>(
  {
    ID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    name: {
      type: String,
      required: true,
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

UserSchema.pre<UserDocument>('save', async function (this: UserDocument) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.isValidPassword = async function (
  this: UserDocument,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default model<UserDocument>('User', UserSchema);