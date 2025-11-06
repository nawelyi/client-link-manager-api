import { Response} from 'express';
import { authRequest } from '../../core/middleware/auth.middleware';
import { createClient, getClientByUserId } from './client.service';


export const createClientsHandler = async (req: authRequest, res: Response) => {
    const userId = req.user?.id as string;
    const { name } = req.body;
    try {
        const client = await createClient(userId, name);
        return res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export const getClientsHandler = async (req: authRequest, res: Response) => {
    const userId = req.user?.id as string;
    try {
        const clients = await getClientByUserId(userId);
        return res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}