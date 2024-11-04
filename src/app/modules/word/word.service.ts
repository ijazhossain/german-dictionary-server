import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TWord } from './word.interface';
import { Word } from './word.model';
import { RequestedWord } from '../requestedWord/requestedWord.model';

const createWordIntoDB = async (payload: TWord) => {
  const isWordExists = await Word.find({
    $and: [
      { germanWord: payload.germanWord },
      { partsOfSpeech: payload.partsOfSpeech },
    ],
  });
  if (isWordExists.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Word is already exists!');
  }
  const result = await Word.create(payload);
  return result;
};
const getAllWordFromDB = async (query: Record<string, unknown>) => {
  // console.log(query);
  let searchableQuery: Record<string, unknown> = {};

  if (
    query.searchQuery ||
    query.status !== undefined ||
    query.approval !== undefined
  ) {
    const searchConditions = [];

    if (query.searchQuery) {
      searchConditions.push(
        { germanWord: { $regex: `^${query.searchQuery}$`, $options: 'i' } },
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
      );
    }

    searchableQuery = {
      ...(searchConditions.length > 0 ? { $or: searchConditions } : {}),
      ...(query.status !== undefined && query.status !== 'all'
        ? { isCompleted: query.status }
        : {}),
      ...(query.approval !== undefined && query.approval !== 'all'
        ? { supperAdminApproval: query.approval }
        : {}),
    };
  }

  const skip = (Number(query.page) - 1) * Number(query.limit);

  const result = await Word.find(searchableQuery)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(Number(query.limit))
    .populate('userId');

  const totalCount = await Word.countDocuments(searchableQuery);

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

  const result = await Word.find(searchQuery);

  return { words: result };
};
const getSuggestionsFromDB = async (query: string) => {
  const result = await Word.find({
    $or: [
      {
        germanWord: { $regex: `^${query}`, $options: 'i' },
      },
      {
        'details.englishMeaning': {
          $regex: `^${query}`,
          $options: 'i',
        },
      }, // Exact case-insensitive match for English Meaning in details
      {
        'details.banglaMeaning': {
          $regex: `^${query}`,
          $options: 'i',
        },
      },
    ],
  })
    .limit(10)
    .select({ germanWord: 1, details: 1 });
  return result;
};
const getSingleWordFromDB = async (id: string) => {
  const result = await Word.findById(id);
  return result;
};
const deleteSingleWordFromDB = async (id: string) => {
  const result = await Word.deleteOne({ _id: id });
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
const approveWordIntoDB = async (id: string) => {
  const result = await Word.findByIdAndUpdate(id, {
    supperAdminApproval: true,
  });
  return result;
};
const getWordsByDateFromDB = async () => {
  // Step 1: Find all faculty and admin users and their details
  const facultyAndAdminUsers = await User.find({
    role: { $in: ['faculty', 'admin'] },
  }).select('name email');

  // Step 2: Aggregate word counts by user and date
  const wordCounts = await Word.aggregate([
    {
      $match: { userId: { $in: facultyAndAdminUsers.map((user) => user._id) } },
    },
    {
      $group: {
        _id: {
          userId: '$userId',
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.date': 1 } },
  ]);

  // Step 3: Count total words in the Word model
  const totalWordCount = await Word.countDocuments();

  // Step 4: Count total users in the User model
  const totalUserCount = await User.countDocuments();

  // Step 5: Count total users based on role
  const totalAdminCount = await User.countDocuments({ role: 'admin' });
  const totalFacultyCount = await User.countDocuments({ role: 'faculty' });
  const totalUserCountByRole = await User.countDocuments({ role: 'user' });

  // Step 6: Count total requested words
  const totalRequestedWords = await RequestedWord.countDocuments();

  // Step 7: Count total requested words based on isAdded status
  const totalRequestedWordsTrue = await RequestedWord.countDocuments({
    isAdded: true,
  });
  const totalRequestedWordsFalse = await RequestedWord.countDocuments({
    isAdded: false,
  });

  // Step 8: Count total words based on isCompleted status
  const totalWordsCompleted = await Word.countDocuments({ isCompleted: true });
  const totalWordsNotCompleted = await Word.countDocuments({
    isCompleted: false,
  });

  // Step 9: Format results by associating counts with faculty and admin details
  const result = facultyAndAdminUsers.map((user) => {
    const userWordCounts = wordCounts
      .filter((count) => count._id.userId.equals(user._id))
      .map((count) => ({ date: count._id.date, count: count.count }));
    const totalUserWordCount = userWordCounts.reduce(
      (sum, entry) => sum + entry.count,
      0,
    );

    return {
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
      totalWordCount: totalUserWordCount,
      wordCountsByDate: userWordCounts,
    };
  });

  return {
    result,
    totalWordCount,
    totalUserCount,
    totalAdminCount,
    totalFacultyCount,
    totalUserCountByRole,
    totalRequestedWords,
    totalRequestedWordsTrue,
    totalRequestedWordsFalse,
    totalWordsCompleted,
    totalWordsNotCompleted,
  };
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
  approveWordIntoDB,
  getWordsByDateFromDB,
};
