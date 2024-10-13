import { TWord } from './word.interface';
import { Word } from './word.model';

const createWordIntoDB = async (payload: TWord) => {
  const result = await Word.create(payload);
  return result;
};
const getAllWordFromDB = async (query: Record<string, unknown>) => {
  let searchableQuery = {};
  if ((query.searchQuery as string).length) {
    searchableQuery = {
      $or: [
        {
          germanWord: {
            $regex: `^${query.searchQuery}$`,
            $options: 'i',
          },
        },
        {
          'details.englishMeaning': {
            $regex: `^${query.searchQuery}$`,
            $options: 'i',
          },
        },
        {
          'details.banglaMeaning': {
            $regex: `^${query.searchQuery}$`,
            $options: 'i',
          },
        },
      ],
    };
  }

  const skip = (Number(query.page) - 1) * Number(query.limit);
  const result = await Word.find(searchableQuery)
    .skip(skip)
    .limit(Number(query.limit));
  const totalCount = await Word.countDocuments(searchableQuery); // To get the total number of documents
  return { words: result, totalCount };
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
