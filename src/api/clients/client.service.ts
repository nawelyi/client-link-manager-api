import prisma from "../../core/prisma";



export const createClient = async (userId: string, name: string) => {
    const client = await prisma.client.create({
        data: {
            name,
            userId
        }
       
    })
    return client;
}


export const getClientByUserId = async (userId: string) => {
    const clients = await prisma.client.findMany({
        where: { userId }
    });
    
    return clients;

}