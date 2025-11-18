import { Request, Response, NextFunction } from "express";
import { ZodSchema} from "../zod";

export const validateMiddleware = (schema:ZodSchema) => (req:Request, res:Response, next:NextFunction) => {
    const result = schema.safeParse({body: req.body, query: req.query, params: req.params});
    if(!result.success){
        const errors = result.error.issues.map(e => e.message)
        return res.status(400).json({errors})
    }
    next();
}