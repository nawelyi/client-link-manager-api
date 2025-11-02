import { Router } from "express";
import { registerHandler } from "./auth.controller";
import { registerSchema } from "./auth.validation";

const validate = (schema: any) => (req: any, res: any, next: any) => {
    try {
        schema.parse({body: req.body, query: req.query, params: req.params});
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
}

const router = Router();

router.post('/register', validate(registerSchema), registerHandler);

export default router;