import  Router  from "express";
import { createLinkHandler, getLinksHandler } from "./links.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { validateMiddleware } from "../../core/middleware/validate.middleware";
import { createLinkSchema, getAllLinksSchema } from "./links.validation";
import {z} from "../../core/zod";





const router = Router();



router.post('/',authMiddleware,validateMiddleware(z.object({body:createLinkSchema})) ,createLinkHandler);
router.get("/:clientId", authMiddleware, validateMiddleware(z.object({params:getAllLinksSchema})), getLinksHandler)




export default router;