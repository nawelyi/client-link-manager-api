import { createLink } from "./links.service";
import { Response } from "express";
import { authRequest } from "../../core/middleware/auth.middleware";





export const createLinkHandler = async (req:authRequest, res:Response) => {
    const userId = req.user?.id as string;
    try {
        const link = await createLink(userId, req.body); // todo claro aqui, solo pequeña duda de porque await si esto es una funcion de js no algo externo, por lo tanto puede ser sincrono
        return res.status(201).json(link);
        
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}