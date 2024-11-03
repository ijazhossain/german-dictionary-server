import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRequestedWord } from './requestedWord.interface';
import { RequestedWord } from './requestedWord.model';

const createRequestedWordIntoDB = async (payload: TRequestedWord) => {
  const isRequested = await RequestedWord.findOne({
    requestedWord: payload.requestedWord,
  });
  if (isRequested) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Word is already requested by someone!!',
    );
  }
  const result = await RequestedWord.create(payload);
  return result;
};
const getAllRequestedWordFromDB = async (query: Record<string, unknown>) => {
  const searchQuery: Record<string, unknown> = {};
  if (query?.status !== undefined && query?.status !== 'all') {
    searchQuery.isAdded = query?.status;
  }
  const skip = (Number(query.page) - 1) * Number(query.limit);
  const result = await RequestedWord.find(searchQuery)
    .skip(skip)
    .limit(Number(query.limit));
  const totalCount = await RequestedWord.countDocuments(searchQuery); // To get the total number of documents
  return { words: result, totalCount };
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
