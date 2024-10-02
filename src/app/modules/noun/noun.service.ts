import { TNoun } from './noun.interface';
import { Noun } from './noun.model';

const createNounIntoDB = async (payload: TNoun) => {
  const result = await Noun.create(payload);
  return result;
};
const getAllNounFromDB = async () => {
  const result = await Noun.find();
  return result;
};
const getSingleNounFromDB = async (id: string) => {
  const result = await Noun.findById(id);
  return result;
};
const deleteSingleNounFromDB = async (id: string) => {
  const result = await Noun.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};
const updateSingleNounIntoDB = async (id: string, payload: Partial<TNoun>) => {
  const result = await Noun.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const NounServices = {
  createNounIntoDB,
  getAllNounFromDB,
  getSingleNounFromDB,
  deleteSingleNounFromDB,
  updateSingleNounIntoDB,
};
