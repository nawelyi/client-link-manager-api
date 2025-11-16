import { Router } from "express";
import { registerHandler, loginHandler, meHandler } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.validation";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { validateMiddleware } from "../../core/middleware/validate.middleware";
import {z} from "../../core/zod";



const router = Router();

router.post('/register', validateMiddleware(z.object({body:registerSchema})), registerHandler);
router.post('/login', validateMiddleware(z.object({body:loginSchema})), loginHandler);
router.get('/me', authMiddleware, meHandler);

export default router;