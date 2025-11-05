import { Router } from "express";
import { registerHandler, loginHandler } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.validation";


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

export default router;