import { Router } from 'express';
import { WordControllers } from './word.controller';

import { WordValidations } from './word.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-word',
  validateRequest(WordValidations.createWordValidationSchema),
  WordControllers.createWord,
);
router.get('/', WordControllers.getAllWord);
router.get('/suggestion/:query', WordControllers.getSuggestions);
router.get('/word/:id', WordControllers.getSingleWord);
router.delete('/word/:id', WordControllers.deleteWord);
router.patch('/word/:id', WordControllers.updateWord);
export const WordRoutes = router;
