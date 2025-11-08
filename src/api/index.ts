import { Router } from "express";
import authRoute from './auth/auth.route';
import clientRoute from './clients/client.route'

const router = Router();

router.use('/auth', authRoute);
router.use('/client', clientRoute);

export default router;