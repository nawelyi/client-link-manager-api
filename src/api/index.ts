import Router  from "express";
import authRoute from './auth/auth.route';
import clientRoute from './clients/client.route'
import linkRoute from './links/links.route'
const router = Router();

router.use('/auth', authRoute);
router.use('/client', clientRoute);
router.use('/links', linkRoute);

export default router;