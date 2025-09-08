import { Router, type Request, type Response } from "express";
import type User from "../interfaces/user.interface.ts";
import * as authController from "../controllers/auth.controller.ts"


const router = Router();

const users: User[] = [
    {id: 1, name: "Affan", email: "affan@gmail.com", DoB: "20/05/2000", PoB: "Jakarta", gender: "Male"},
{id: 2, name: "Ghost", email: "ghost@gmail.com", DoB: '2000-12-17', PoB: "Jakarta", gender: "Male"},
];

router.get("/users", (req: Request, res: Response)=> {
    res.json(users);
});

router.post('/register', )