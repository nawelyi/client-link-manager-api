import {z} from 'zod';

export const clientSchema = z.object({
    name: z.string().min(3, 'Name is required'),
});