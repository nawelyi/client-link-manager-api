import prisma from "../../core/prisma";



export const createClient = async (userId: string, name: string) => {
    const client = await prisma.client.create({
        data: {
            name,
            userId
        },
        select: {
            name: true
        }
    })
    return client;
}