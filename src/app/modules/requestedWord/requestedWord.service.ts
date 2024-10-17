import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRequestedWord } from './requestedWord.interface';
import { RequestedWord } from './requestedWord.model';

const createRequestedWordIntoDB = async (payload: TRequestedWord) => {
  const isRequested = await RequestedWord.findOne({
    requestedWord: payload.requestedWord,
  });
  if (isRequested) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!!');
  }
  const result = await RequestedWord.create(payload);
  return result;
};
const getAllRequestedWordFromDB = async () => {
  const result = await RequestedWord.find({ isAdded: { $ne: true } });
  return result;
};
const deleteRequestedWordFromDB = async (id: string) => {
  const result = await RequestedWord.findByIdAndUpdate(id, { isAdded: true });
  return result;
};
export const RequestedWordServices = {
  createRequestedWordIntoDB,
  getAllRequestedWordFromDB,
  deleteRequestedWordFromDB,
};
