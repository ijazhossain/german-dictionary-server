import { Request, Response } from 'express';
import { WordServices } from './word.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createWord = async (req: Request, res: Response) => {
  const result = await WordServices.createWordIntoDB(req.body);
  res.json({
    success: true,
    message: 'Word is created successfully',
    data: result,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Word is created successfully',
    data: result,
  });
};
const getAllWord = catchAsync(async (req: Request, res: Response) => {
  const searchQuery = req.query;

  const result = await WordServices.getAllWordFromDB(searchQuery);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Word is retrieved successfully',
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

export const WordControllers = {
  createWord,
  getAllWord,
  getSingleWord,
  deleteWord,
  updateWord,
};
