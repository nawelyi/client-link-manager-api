import { Router } from "express";
import { registerHandler } from "./auth.controller";
import { registerSchema } from "./auth.validation";

const validate = (schema: any) => (req: any, res: any, next: any) => {
    try {
        schema.parse({body: req.body});
        next();
    } catch (e: any) {
        return res.status(400).json({error: e.flatten().fieldErrors});
    }
}

const router = Router();

router.post('/register', validate(registerSchema), registerHandler);

export default router;