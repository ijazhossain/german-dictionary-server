import { model, Schema } from 'mongoose';
import { TName, TUser } from './user.interface';
const userNameSchema = new Schema<TName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});
const userSchema = new Schema<TUser>(
  {
    name: {
      type: userNameSchema,
      required: [true, 'User name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'faculty', 'student'],
      default: 'student',
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    passwordChangedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
export const User = model<TUser>('User', userSchema);
