import {z} from 'zod';

export const clientSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});