import { model, Schema } from 'mongoose';
import { TName, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userNameSchema = new Schema<TName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});
const userSchema = new Schema<TUser, UserModel>(
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
      select: 0,
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
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Word',
        default: [],
      },
    ],
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
//pre save middleware hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};
//matching the passwords
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  console.log({ plainTextPassword, hashedPassword });
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
//checking if the JWT issued before the password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};
export const User = model<TUser, UserModel>('User', userSchema);
