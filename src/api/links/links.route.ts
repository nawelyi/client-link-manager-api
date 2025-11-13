import  Router  from "express";
import { createLinkHandler } from "./links.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { validateMiddleware } from "../../core/middleware/validate.middleware";
import { createLinkSchema } from "./links.validation";





const router = Router();



router.post('/',authMiddleware,validateMiddleware(createLinkSchema) ,createLinkHandler);



export default router;