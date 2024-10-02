import { Router } from 'express';
import { NounControllers } from './noun.controller';

const router = Router();

router.post('/create-noun', NounControllers.createNoun);
router.get('/', NounControllers.createNoun);
router.get('/:id', NounControllers.getSingleNoun);
router.delete('/:id', NounControllers.deleteNoun);
router.patch('/:id', NounControllers.updateNoun);
export const NounRoutes = router;
