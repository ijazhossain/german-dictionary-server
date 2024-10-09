import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
type TQuery = { role?: string };
const createUserIntoDB = async (payload: TUser) => {
  //   console.log(payload);
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!!');
  }
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async (userRole: TQuery) => {
  const { role } = userRole;
  const query: TQuery = {};
  if (role) {
    const validRoles = ['admin', 'faculty', 'student'];
    if (!validRoles.includes(role)) {
      throw new Error(
        'Invalid role. Valid roles are: admin, faculty, student.',
      );
    }
    query.role = role;
  }

  const result = await User.find(query);
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
const updateSingleUserIntoDB = async (
  id: string,
  role: Record<string, unknown>,
) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not found');
  }
  const result = await User.findOneAndUpdate({ _id: id }, role, { new: true });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  deleteSingleUserFromDB,
  updateSingleUserIntoDB,
};
