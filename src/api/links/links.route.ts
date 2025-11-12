import  Router  from "express";
import { createLinkHandler } from "./links.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { createLinkSchema } from "./links.validation";


const linkValidationMiddleware = (schema: any) => (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({errors: result.error.issues})
    }
    next();
}


const router = Router();



router.post('/',authMiddleware,linkValidationMiddleware(createLinkSchema) ,createLinkHandler);



export default router;