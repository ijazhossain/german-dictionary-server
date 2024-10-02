import { Router } from 'express';
import { WordControllers } from './word.controller';

const router = Router();

router.post('/create-word', WordControllers.createWord);
router.get('/', WordControllers.createWord);
router.get('/:id', WordControllers.getSingleWord);
router.delete('/:id', WordControllers.deleteWord);
router.patch('/:id', WordControllers.updateWord);
export const WordRoutes = router;
