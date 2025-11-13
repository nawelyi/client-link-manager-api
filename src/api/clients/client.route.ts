import { clientSchema } from './client.validation';
import  Router from 'express';
import { createClientsHandler, getClientsHandler } from './client.controller';
import { authMiddleware } from '../../core/middleware/auth.middleware';
import { validateMiddleware } from '../../core/middleware/validate.middleware';

const router = Router();



router.post('/', authMiddleware ,validateMiddleware(clientSchema), createClientsHandler);
router.get('/', authMiddleware ,getClientsHandler);

export default router;