import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';
import { email } from 'zod';

dotenv.config();

export const config = {
    jwt:{
        secret: process.env.JWT_SECRET || 'default secret key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    bcrypt: {
        saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587', 10),
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    },
    frontend: {
        url: process.env.FRONTEND_URL
    }
} as const;