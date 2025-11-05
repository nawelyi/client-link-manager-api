
import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import prisma from "../../core/prisma";
import { authRequest } from "../../core/middleware/auth.middleware";



export const registerHandler = async (req: Request, res: Response) => {
    try {
        const existinUser = await prisma.user.findUnique({
            where: {email: req.body.email}
        })

        if(existinUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const user = await registerUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const loginHandler = async (req: Request, res: Response) => {
    try {
      const token = await loginUser(req.body);
      return res.status(200).json({token});
    } catch (error: any) {
        if (error.message === "Invalid email" || error.message === "Invalid password") {
           return res.status(401).json({ message: error.message });
        }
        else {
           return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const meHandler = async (req: authRequest, res: Response) => {

    if (req.user) {
        return res.status(200). json(req.user);
    }

    return res.status(401).json({ message: "Unauthorized" });
}