import { Router } from 'express';
import { WordRoutes } from '../modules/word/word.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRouter } from '../modules/Auth/auth.route';
import { RequestedWordRoutes } from '../modules/requestedWord/requestedWord.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/words',
    route: WordRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/requested-words',
    route: RequestedWordRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
