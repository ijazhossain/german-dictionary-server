import { TWord } from './word.interface';
import { Word } from './word.model';

const createWordIntoDB = async (payload: TWord) => {
  const result = await Word.create(payload);
  return result;
};
const getAllWordFromDB = async (searchQuery: Record<string, unknown>) => {
  let query = {};
  if (Object.keys(searchQuery).length) {
    query = {
      $or: [
        {
          germanWord: {
            $regex: `^${searchQuery?.searchQuery}$`,
            $options: 'i',
          },
        },
        {
          'details.englishMeaning': {
            $regex: `^${searchQuery?.searchQuery}$`,
            $options: 'i',
          },
        },
        {
          'details.banglaMeaning': {
            $regex: `^${searchQuery?.searchQuery}$`,
            $options: 'i',
          },
        },
      ],
    };
  }

  const result = await Word.find(query);
  return result;
};
const getSuggestionsFromDB = async (query: string) => {
  const result = await Word.find({
    $or: [
      {
        germanWord: { $regex: `^${query}`, $options: 'i' },
      },
    ],
  }).limit(10);
  return result;
};
const getSingleWordFromDB = async (id: string) => {
  const result = await Word.findById(id);
  return result;
};
const deleteSingleWordFromDB = async (id: string) => {
  const result = await Word.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};
const updateSingleWordIntoDB = async (id: string, payload: Partial<TWord>) => {
  const result = await Word.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const WordServices = {
  createWordIntoDB,
  getAllWordFromDB,
  getSuggestionsFromDB,
  getSingleWordFromDB,
  deleteSingleWordFromDB,
  updateSingleWordIntoDB,
};
