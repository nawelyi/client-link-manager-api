import { Router } from "express";
import { registerHandler, loginHandler, meHandler } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.validation";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { validateMiddleware } from "../../core/middleware/validate.middleware";



const router = Router();

router.post('/register', validateMiddleware(registerSchema), registerHandler);
router.post('/login', validateMiddleware(loginSchema), loginHandler);
router.get('/me', authMiddleware, meHandler);

export default router;