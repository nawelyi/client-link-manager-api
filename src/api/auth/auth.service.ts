import prisma from "../../core/prisma";
import bcrypt from "bcrypt";


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