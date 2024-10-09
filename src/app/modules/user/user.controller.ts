import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  //   console.log(req.body);
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getAdmins = catchAsync(async (req, res) => {
  const result = await UserServices.getAllAdminsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties are retrieved successfully',
    data: result,
  });
});
const getFaculties = catchAsync(async (req, res) => {
  const result = await UserServices.getAllFacultiesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties are retrieved successfully',
    data: result,
  });
});
const getStudents = catchAsync(async (req, res) => {
  const result = await UserServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users are retrieved successfully',
    data: result,
  });
});
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  getAdmins,
  getFaculties,
  getStudents,
  deleteSingleStudent,
};
