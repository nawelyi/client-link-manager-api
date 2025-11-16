import { clientSchema } from './client.validation';
import  Router from 'express';
import { createClientsHandler, getClientsHandler } from './client.controller';
import { authMiddleware } from '../../core/middleware/auth.middleware';
import { validateMiddleware } from '../../core/middleware/validate.middleware';
import {z} from '../../core/zod';

const router = Router();



router.post('/', authMiddleware ,validateMiddleware(z.object({body:clientSchema})), createClientsHandler);
router.get('/', authMiddleware ,getClientsHandler);

export default router;