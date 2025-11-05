
import prisma from "../../core/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (input:any) => {
    const {email, password, first_name, last_name} = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            first_name,
            last_name
        },
        select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            role: true,
            created_at: true
        }
    })

    return user;
}

export const loginUser = async (input:any) => {
    const {email, password} = input;
    const userExisting = await prisma.user.findUnique({
        where: {email}
    })

    if(!userExisting){
        throw new Error('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, userExisting.password);
    if(!isPasswordValid){
        throw new Error('Invalid password');
    }

    const jwtSecret = process.env.JWT_SECRET as string;

    const token = jwt.sign({
        id: userExisting.id,
        role: userExisting.role
    },
    jwtSecret,
    {
        expiresIn: '15m'
    })

    return token;
}

