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

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);
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
const updateSingleUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const role = req.body;
  const result = await UserServices.updateSingleUserIntoDB(id, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: result,
  });
});
const getBookmarks = catchAsync(async (req, res) => {
  const { id: userId } = req.params;
  const result = await UserServices.getBookmarksFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookmarks for this user is retrieved successfully',
    data: result,
  });
});
const getPopulateBookmarks = catchAsync(async (req, res) => {
  const { id: userId } = req.params;
  const result = await UserServices.getPopulateBookmarksFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookmarks for this user is retrieved successfully',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  getUsers,
  deleteSingleStudent,
  updateSingleUserRole,
  getBookmarks,
  getPopulateBookmarks,
};
