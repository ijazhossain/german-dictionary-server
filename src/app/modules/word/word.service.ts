import { User } from '../user/user.model';
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
const getWordBySearchFromDB = async (query: Record<string, unknown>) => {
  const searchQuery = {
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

  const result = await Word.findOne(searchQuery);

  return { words: result };
};
const getSuggestionsFromDB = async (query: string) => {
  const result = await Word.find({
    $or: [
      {
        germanWord: { $regex: `^${query}`, $options: 'i' },
      },
    ],
  })
    .limit(10)
    .select({ germanWord: 1 });
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
const bookmarkWordIntoDB = async (userId: string, wordId: string) => {
  const result = await User.findByIdAndUpdate(userId, {
    $addToSet: { bookmarks: wordId },
  });
  return result;
};
const removeBookmarkFromDB = async (userId: string, wordId: string) => {
  const result = await User.findByIdAndUpdate(userId, {
    $pull: { bookmarks: wordId },
  });
  return result;
};
const getSingleBookmarkDetailsFromDB = async (wordId: string) => {
  const result = await Word.findById(wordId);
  return result;
};
const generateQuizFromDB = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);
  const words = await Word.aggregate([{ $sample: { size: 10 } }]);

  const questions = await Promise.all(
    words.flatMap(async (word) => {
      const wrongChoices = await Word.aggregate([
        { $match: { _id: { $ne: word._id } } },
        { $sample: { size: 3 } },
      ]);

      const englishQuestion = {
        question: `What is the meaning of the German word "${word.germanWord}" in English?`,
        choices: shuffleArray([
          word.details[0].englishMeaning,
          ...wrongChoices.map((w) => w.details[0].englishMeaning),
        ]),
        correctAnswer: word.details[0].englishMeaning,
      };

      const banglaQuestion = {
        question: `What is the meaning of the German word "${word.germanWord}" in Bangla?`,
        choices: shuffleArray([
          word.details[0].banglaMeaning,
          ...wrongChoices.map((w) => w.details[0].banglaMeaning),
        ]),
        correctAnswer: word.details[0].banglaMeaning,
      };
      // Parts of speech question
      const wrongPartsOfSpeech = await Word.aggregate([
        { $match: { _id: { $ne: word._id } } },
        { $sample: { size: 3 } },
      ]);

      const partsOfSpeechQuestion = {
        question: `What is the part of speech of the German word "${word.germanWord}"?`,
        choices: shuffleArray([
          word.partsOfSpeech,
          ...wrongPartsOfSpeech.map((w) => w.partsOfSpeech),
        ]),
        correctAnswer: word.partsOfSpeech,
      };
      return [englishQuestion, banglaQuestion, partsOfSpeechQuestion]; // Return both questions
    }),
  );

  const allQuestions = shuffleArray(questions.flat());

  // Return exactly 10 questions
  return allQuestions.slice(0, 10);
};

export const WordServices = {
  createWordIntoDB,
  getAllWordFromDB,
  getWordBySearchFromDB,
  getSuggestionsFromDB,
  getSingleWordFromDB,
  deleteSingleWordFromDB,
  updateSingleWordIntoDB,
  bookmarkWordIntoDB,
  removeBookmarkFromDB,
  getSingleBookmarkDetailsFromDB,
  generateQuizFromDB,
};
