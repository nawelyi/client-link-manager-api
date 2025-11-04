import {z} from 'zod';

export const registerSchema = z.object({
    
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        first_name: z.string().min(1, 'First name is required'),
        last_name: z.string().optional()

})

export const loginSchema = z.object({
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long')
})