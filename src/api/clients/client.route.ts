import { clientSchema } from './client.validation';
import  Router from 'express';
import { createClientsHandler } from './client.controller';

const router = Router();

const clientValidationMiddleware = (schema: any) => (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body)
    if(!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }
    next();
}

router.post('/', clientValidationMiddleware(clientSchema), createClientsHandler);

export default router;