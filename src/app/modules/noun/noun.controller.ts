import { Request, Response } from 'express';
import { NounServices } from './noun.service';

const createNoun = async (req: Request, res: Response) => {
  try {
    const result = await NounServices.createNounIntoDB(req.body);
    res.json({
      success: true,
      message: 'Noun is created successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Noun is not created',
      error,
    });
  }
};
const getAllNoun = async (req: Request, res: Response) => {
  try {
    const result = await NounServices.getAllNounFromDB();
    res.json({
      success: true,
      message: 'All Noun is retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'All Noun is not retrieved',
      error,
    });
  }
};
const getSingleNoun = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await NounServices.getSingleNounFromDB(id);
    res.json({
      success: true,
      message: 'Single Noun is retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Single Noun is not retrieved',
      error,
    });
  }
};
const deleteNoun = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await NounServices.deleteSingleNounFromDB(id);
    res.json({
      success: true,
      message: 'Single Noun is deleted successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Single Noun is not deleted',
      error,
    });
  }
};
const updateNoun = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await NounServices.updateSingleNounIntoDB(id, req.body);
    res.json({
      success: true,
      message: 'Single Noun is deleted successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Single Noun is not deleted',
      error,
    });
  }
};

export const NounControllers = {
  createNoun,
  getAllNoun,
  getSingleNoun,
  deleteNoun,
  updateNoun,
};
