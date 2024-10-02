import { Router } from 'express';
import { NounRoutes } from '../modules/noun/noun.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/noun',
    route: NounRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
