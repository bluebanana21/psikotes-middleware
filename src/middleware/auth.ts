import { type Request, type Response, type NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../config/config";

export interface AuthRequest extends Request{
    userId?: string
}

export const autenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Authentication token reqired'});

    }

    try {
       const decoded = jwt.verify(token, config.jwt.secret) as {userId: string};
       req.userId = decoded.userId;
       next(); 
    } catch (error) {
       return res.status(403).json({message: 'Invalid or expired token'}) 
    }
};