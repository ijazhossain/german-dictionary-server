import { Router } from 'express';
import { WordRoutes } from '../modules/word/word.route';
import { UserRoutes } from '../modules/user/user.route';

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
