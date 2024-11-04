import { Router } from 'express';
import { WordControllers } from './word.controller';

import { WordValidations } from './word.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-word',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(WordValidations.createWordValidationSchema),
  WordControllers.createWord,
);
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  WordControllers.getAllWord,
);
router.get('/search-word', WordControllers.getWordBySearch);
router.get('/suggestion/:query', WordControllers.getSuggestions);
router.get(
  '/word/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  WordControllers.getSingleWord,
);
router.delete(
  '/word/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  WordControllers.deleteWord,
);
router.patch(
  '/word/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(WordValidations.updateWordValidationSchema),
  WordControllers.updateWord,
);
router.patch('/add-bookmark/:userId/:wordId', WordControllers.bookmarkWord);
router.patch(
  '/remove-bookmark/:userId/:wordId',
  WordControllers.removeBookmarkWord,
);
router.get(
  '/word/bookmarks/bookmark/:wordId',
  WordControllers.getSingleBookmarkDetails,
);
router.get('/generate-quiz', WordControllers.generateQuiz);
router.patch('/approve-word/:id', WordControllers.approveWord);
export const WordRoutes = router;
