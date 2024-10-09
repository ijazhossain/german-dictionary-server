import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = Router();
router.post(
  '/create-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/', UserControllers.getUsers);
router.delete('/students/:id', UserControllers.deleteSingleStudent);
router.put('/students/:id', UserControllers.updateSingleUserRole);
export const UserRoutes = router;
