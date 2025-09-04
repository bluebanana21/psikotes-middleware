import {email, z} from 'zod';

export const signupSchema = z.object({
    name : z.string().min(2).max(50),
    email: z.email(),
    password: z.string().min(8).max(100),
    DoB: z.string(),
    PoB: z.string(),
    gender: z.string(),
});

export const loginSchema = z.object({
    email: z.email(),
    password:  z.string().min(8).max(100),
});

export const resetPasswordSchema = z.object({
    password:  z.string().min(8).max(100),
});

export const resetEmailSchema = z.object({
    email:  z.email()
});