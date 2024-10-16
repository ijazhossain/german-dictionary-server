import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../utils/auth';
import { USER_ROLE } from './user.constant';

const router = Router();
router.post(
  '/create-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getUsers,
);
router.delete(
  '/student/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.deleteSingleStudent,
);
router.put(
  '/student/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.updateSingleUserRole,
);
router.get('/student/bookmarks/:id', UserControllers.getBookmarks);
router.get(
  '/student/bookmarks/populate/:id',
  UserControllers.getPopulateBookmarks,
);
export const UserRoutes = router;
