import { Router } from "express";
import { registerHandler, loginHandler, meHandler } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.validation";
const { authMiddleware } = require("../../core/middleware/auth.middleware");

const validate = (schema: any) => (req: any, res: any, next: any) => {

    const resultado = schema.safeParse(req.body);
    
    if (!resultado.success) {
        const errors = resultado.error.issues.map((err:any) => err.message);
       
        return res.status(400).json({ error: errors });
    }

    next();
}

const router = Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);
router.get('/me', authMiddleware, meHandler);

export default router;