import { Request, Response } from 'express';
import { WordServices } from './word.service';

const createWord = async (req: Request, res: Response) => {
  try {
    const result = await WordServices.createWordIntoDB(req.body);
    res.json({
      success: true,
      message: 'Word is created successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Word is not created',
      error,
    });
  }
};
const getAllWord = async (req: Request, res: Response) => {
  try {
    const result = await WordServices.getAllWordFromDB();
    res.json({
      success: true,
      message: 'All Word is retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'All Word is not retrieved',
      error,
    });
  }
};
const getSingleWord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await WordServices.getSingleWordFromDB(id);
    res.json({
      success: true,
      message: 'Single Word is retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Single Word is not retrieved',
      error,
    });
  }
};
const deleteWord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await WordServices.deleteSingleWordFromDB(id);
    res.json({
      success: true,
      message: 'Single Word is deleted successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Single Word is not deleted',
      error,
    });
  }
};
const updateWord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await WordServices.updateSingleWordIntoDB(id, req.body);
    res.json({
      success: true,
      message: 'Single Word is deleted successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Single Word is not deleted',
      error,
    });
  }
};

export const WordControllers = {
  createWord,
  getAllWord,
  getSingleWord,
  deleteWord,
  updateWord,
};
