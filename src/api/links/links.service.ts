import prisma from "../../core/prisma";




export const createLink = async (userId: string, data:any) => {
    const {title, url, clientId} = data;
    const isClientExist = await prisma.client.findFirst({
        where: {
            id: clientId,
            userId
        }
    })

    if(!isClientExist) {
        throw new Error("Client does not exist");
    }
    const link = await prisma.link.create({
        data: {
            title,
            url,
            clientId
        }
    });
    return link;
}

export const getAllLinks = async (userId:string, clientId:any) => {
 
    const isClientExist = await prisma.client.findFirst({
        where: {
            id: clientId,
            userId
        }
    })

    if(!isClientExist) {
        throw new Error("Client does not exist");
    }

    const getLinks = await prisma.link.findMany({
        where: {
            clientId
        }
    })

    return getLinks

}