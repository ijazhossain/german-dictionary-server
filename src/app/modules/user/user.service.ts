import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  //   console.log(payload);
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!!');
  }
  const result = await User.create(payload);
  return result;
};

const getAllAdminsFromDB = async () => {
  const result = await User.find({ role: 'admin' });
  return result;
};
const getAllFacultiesFromDB = async () => {
  const result = await User.find({ role: 'faculty' });
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await User.find({ role: 'student' });
  return result;
};
const deleteSingleUserFromDB = async (id: string) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not found');
  }
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllAdminsFromDB,
  getAllFacultiesFromDB,
  getAllStudentsFromDB,
  deleteSingleUserFromDB,
};
