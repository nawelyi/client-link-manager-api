import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";


export interface authRequest extends Request {
    user?: {
        id: string;
        role: string;
    }
}

export const authMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, secret) as { id: string; role: string };

        const user = await prisma.user.findUnique({
            where: { id: payload.id},
            select: { id: true, role: true}
        })

        if(!user) {
            return res.status(401).json({ message: "user not found" });
        }

        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}