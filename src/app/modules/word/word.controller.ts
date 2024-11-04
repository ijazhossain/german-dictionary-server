import { Request, Response } from 'express';
import { WordServices } from './word.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createWord = catchAsync(async (req: Request, res: Response) => {
  const result = await WordServices.createWordIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is created successfully',
    data: result,
  });
});
const getAllWord = catchAsync(async (req: Request, res: Response) => {
  const result = await WordServices.getAllWordFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Word is retrieved successfully',
    data: result,
  });
});
const getWordBySearch = catchAsync(async (req: Request, res: Response) => {
  const result = await WordServices.getAllWordFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search Word is retrieved successfully',
    data: result,
  });
});
const getSuggestions = catchAsync(async (req, res) => {
  const { query } = req.params;
  const result = await WordServices.getSuggestionsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word suggestions is retrieved successfully',
    data: result,
  });
});
const getSingleWord = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await WordServices.getSingleWordFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single word is retrieved successfully',
    data: result,
  });
});
const deleteWord = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WordServices.deleteSingleWordFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Word is deleted successfully',
    data: result,
  });
});
const updateWord = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WordServices.updateSingleWordIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Word is updated successfully',
    data: result,
  });
});
const bookmarkWord = catchAsync(async (req, res) => {
  const { userId, wordId } = req.params;
  const result = await WordServices.bookmarkWordIntoDB(userId, wordId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is bookmarked successfully',
    data: result,
  });
});
const removeBookmarkWord = catchAsync(async (req, res) => {
  const { userId, wordId } = req.params;
  const result = await WordServices.removeBookmarkFromDB(userId, wordId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is removed from bookmark successfully',
    data: result,
  });
});
const getSingleBookmarkDetails = catchAsync(async (req, res) => {
  const { wordId } = req.params;
  const result = await WordServices.getSingleBookmarkDetailsFromDB(wordId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single bookmark details are retrieved successfully',
    data: result,
  });
});
const generateQuiz = catchAsync(async (req, res) => {
  const questions = await WordServices.generateQuizFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz is generate successfully',
    data: questions,
  });
});
const approveWord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WordServices.approveWordIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is approved by admin',
    data: result,
  });
});
const getFacultyWordsByDate = catchAsync(async (req, res) => {
  const result = await WordServices.getWordsByDateFromDB();
  // console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is retrieved by date',
    data: result,
  });
});
export const WordControllers = {
  createWord,
  getAllWord,
  getWordBySearch,
  getSuggestions,
  getSingleWord,
  deleteWord,
  updateWord,
  bookmarkWord,
  removeBookmarkWord,
  getSingleBookmarkDetails,
  generateQuiz,
  approveWord,
  getFacultyWordsByDate,
};
