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
router.get('/admins', UserControllers.getAdmins);
router.get('/faculties', UserControllers.getFaculties);
router.get('/students', UserControllers.getStudents);
router.delete('/students/:id', UserControllers.deleteSingleStudent);
export const UserRoutes = router;
