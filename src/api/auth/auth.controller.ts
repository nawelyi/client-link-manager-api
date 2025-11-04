
import { Request, Response } from "express";
import { registerUser } from "./auth.service";
import prisma from "../../core/prisma";



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