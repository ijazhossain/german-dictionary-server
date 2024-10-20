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
  // Utility function to shuffle array
  const shuffleArray = <T>(array: T[]): T[] =>
    array.sort(() => Math.random() - 0.5);

  // Fetch 10 random words from the database
  const words = await Word.aggregate([{ $sample: { size: 10 } }]);

  // Generate quiz questions
  const questions = await Promise.all(
    words.map(async (word) => {
      // Fetch wrong choices for parts of speech question
      const wrongChoices = await Word.aggregate([
        { $match: { _id: { $ne: word._id } } },
        { $sample: { size: 3 } },
      ]);

      // Get unique parts of speech from the fetched words
      const uniquePartsOfSpeech = [
        ...new Set(words.map((w) => w.partsOfSpeech)),
      ];

      // Ensure we have at least 3 wrong parts of speech choices
      const filteredWrongChoices = uniquePartsOfSpeech.filter(
        (pos) => pos !== word.partsOfSpeech,
      );

      // If there are not enough wrong choices, fill with random ones (this can be replaced with a predefined fallback if desired)
      while (filteredWrongChoices.length < 3) {
        const randomPos =
          uniquePartsOfSpeech[
            Math.floor(Math.random() * uniquePartsOfSpeech.length)
          ];
        if (!filteredWrongChoices.includes(randomPos)) {
          filteredWrongChoices.push(randomPos);
        }
      }

      // Create a question for meaning
      const meaningQuestion = {
        question: `What is the meaning of the German word "${word.germanWord}"?`,
        choices: shuffleArray([
          word.details[0].englishMeaning, // Correct answer
          ...wrongChoices.map((w) => w.details[0].englishMeaning), // Wrong answers
        ]),
        correctAnswer: word.details[0].englishMeaning,
      };

      // Create a question for parts of speech
      const partsOfSpeechQuestion = {
        question: `What is the parts of speech of the German word "${word.germanWord}"?`,
        choices: shuffleArray([
          word.partsOfSpeech, // Correct answer
          ...filteredWrongChoices.slice(0, 3), // Use the 3 wrong choices
        ]),
        correctAnswer: word.partsOfSpeech,
      };

      return [meaningQuestion, partsOfSpeechQuestion];
    }),
  );

  return questions.flat(); // Flatten the array of questions
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
