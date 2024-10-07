import { Router } from 'express';
import { WordRoutes } from '../modules/word/word.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRouter } from '../modules/Auth/auth.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/word',
    route: WordRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
