import type { NextFunction } from "express";
import {z, type ZodObject, type ZodSchema} from "zod";
import express, {type Request, type Response} from 'express';

export const validateRequest = <T extends ZodObject>(schema:T)=> {
    return async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        await schema.parseAsync(req.body);
        next();
        
    } catch (error) {

        if (error instanceof Error) {
            res.status(400).json({
                status: 'error',
                message: 'validation failed',
                errors: 'errors' in error ? (error as any).errors : [error.message]
            });
            return;
        }
        next(error);
    }
    };
};