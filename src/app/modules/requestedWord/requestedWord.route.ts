import { Router } from 'express';
import { RequestedWordControllers } from './requestedWord.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RequestedWordValidations } from './requestedWord.validation';

const router = Router();
router.post(
  '/create-requested-word',
  validateRequest(RequestedWordValidations.createRequestedWordValidationSchema),
  RequestedWordControllers.createRequestedWord,
);
router.get('/', RequestedWordControllers.getAllRequestedWords);
router.patch(
  '/requested-word/:id',
  RequestedWordControllers.deleteRequestedWord,
);
export const RequestedWordRoutes = router;
