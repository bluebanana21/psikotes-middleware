import express, { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import db from "../config/db.ts";
import type { RowDataPacket } from "mysql2";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const quesy = `insert into users (name, email, password) values (?, ?, ?)`;
    db.query(quesy, [name, email, hashedPassword], (err, result) => {
      if (err) throw err;
      res.status(201).send("User registered successfully");
    });
  } catch (error) {
    res.status(500).send("error registering user");
  }
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `select * from users where email = ?`;
db.query<RowDataPacket[]>(query, [email], async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
        const user = results[0] as RowDataPacket & { password: string };
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } else {
        res.status(404).send('User not found');
    }
});

});

export default authRouter;
