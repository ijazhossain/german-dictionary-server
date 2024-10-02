import { Router } from 'express';
import { WordRoutes } from '../modules/noun/word.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/word',
    route: WordRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
