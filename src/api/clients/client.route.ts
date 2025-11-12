import { clientSchema } from './client.validation';
import  Router from 'express';
import { createClientsHandler, getClientsHandler } from './client.controller';
import { authMiddleware } from '../../core/middleware/auth.middleware';

const router = Router();

const clientValidationMiddleware = (schema: any) => (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body)
    if(!result.success) {
        return res.status(400).json({ errorsss: result.error.issues });
    }
    next();
}

router.post('/', authMiddleware ,clientValidationMiddleware(clientSchema), createClientsHandler);
router.get('/', authMiddleware ,getClientsHandler);

export default router;