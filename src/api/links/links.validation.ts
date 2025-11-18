import {z} from '../../core/zod';

export const createLinkSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    url: z.url('Invalid URL format'),
    clientId: z.cuid('Invalid client ID format'),
});

export const getAllLinksSchema = z.object({
    clientId: z.cuid('invalid client ID format')
})