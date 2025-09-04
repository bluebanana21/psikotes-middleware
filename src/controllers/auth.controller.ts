import bcrypt from "bcryptjs";
import type { UserInput } from "../interfaces/user.interface.ts";
import { emailService } from "../services/email.service.ts";
import crypto from "crypto";
import express, { type Request, type Response } from "express";
import db from "../config/db.ts";
import type { RowDataPacket } from "mysql2";

export class authController{
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: UserInput = req.body;

      const rows = db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      const users = rows as unknown as any[];


      if (users.length > 0) {
        res.status(400).json({
          status: "error",
          message: "User already exists",
        });
        return;
      }

      const isEmailServiceWorking = await emailService.verifyConnection();
      if (!isEmailServiceWorking) {
        res.status(500).json({
          status: "error",
          message: "Email service is not available. please try again later",
        });
        return;
      }

      const verificationToken = crypto.randomBytes(32).toString("hex");

      //ganti 10 ama value salt rounds dari env
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `insert into users (name, email, password, DoB, PoB, gender, verificationToken, verificationTokenExpires, isVerified, emailVerificationFailed
                values (?, ?, ?, ?, ?, ?, ?, ?, false, false)
                `,
        [
          name,
          email,
          hashedPassword,
          verificationToken,
          new Date(Date.now() + 24 * 60 * 60 * 1000),
        ]
      );

      try {
        await emailService.sendVerificationEmail(
          email,
          name,
          verificationToken
        );

        res.status(201).json({
          status: "success",
          message:
            "Registration successfull please check email fro verification link",
        });
      } catch (emailError) {
        console.error("Filed to send verification email: ", emailError);

        db.query(
          "update users set emailVerificationFailed = true where email = ?",
          [email]
        );

        res.status(201).json({
          status: "Warning",
          message: "account created but verification email could not be sent",
        });
      }
    } catch (error) {
      console.error("signup error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const rows = db.query("select * from users where email = ?", [
        email,
      ]);
      const users = rows as unknown as any[];

      if (users.length === 0) {
        res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
        return;
      }

      const user = users[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
        return;
      }

      db.query(
        "update users set isVerified = true, verificationToken = null, verificationTokenExpires = null where id ?",
        [user.id]
      );

      res.json({
        status: "success",
        message: "email verified successfylyy",
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        status: "error",
        message: "internal server error",
      });
    }
  }
}
