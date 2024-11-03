import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RequestedWordServices } from './requestedWord.service';
import sendResponse from '../../utils/sendResponse';

const createRequestedWord = catchAsync(async (req, res) => {
  const result = await RequestedWordServices.createRequestedWordIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is requested successfully',
    data: result,
  });
});
const getAllRequestedWords = catchAsync(async (req, res) => {
  const result = await RequestedWordServices.getAllRequestedWordFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All requested Word is retrieved successfully',
    data: result,
  });
});
const deleteRequestedWord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RequestedWordServices.deleteRequestedWordFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Requested word is deleted successfully',
    data: result,
  });
});
export const RequestedWordControllers = {
  createRequestedWord,
  getAllRequestedWords,
  deleteRequestedWord,
};
