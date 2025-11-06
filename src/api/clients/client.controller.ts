import { Response} from 'express';
import { authRequest } from '../../core/middleware/auth.middleware';
import { createClient } from './client.service';


export const createClientsHandler = async (req: authRequest, res: Response) => {
    const userId = req.user?.id as string;
    const { name } = req.body;
    try {
        const client = await createClient(userId, name);
        return res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}