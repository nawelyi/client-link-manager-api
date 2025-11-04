import { Router } from "express";
import { registerHandler, loginHandler } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.validation";

const validate = (schema: any) => (req: any, res: any, next: any) => {
    try {
        schema.parse( req.body);
        next();
    } catch (e: any) {
        return res.status(400).json({error: e.flatten().fieldErrors});
    }
}

const router = Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);

export default router;