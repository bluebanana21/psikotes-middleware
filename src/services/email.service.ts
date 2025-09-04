import nodemailer from "nodemailer";
import {config } from "../config/config.ts"
import path, { format } from "path";
import fs from 'fs/promises';

export class emailService {
    private static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.user,
            pass: config.email.pass,
        },
        debug: true,
        logger: true
    });

    private static async getTemplate(tempalteName: string): Promise<string>{
        const templatePath = path.join(__dirname,'../templates', `${tempalteName}.html`);
        return await fs.readFile(templatePath, 'utf-8');
    }

    private static replaceTemplateVariables(template: string, variables: Record<string, string>): string {
        return  Object.entries(variables).reduce(
            (acc, [key, value])=>acc.replace(new RegExp(`{{${key}}}`, 'g'),value), 
            template
        );
    }

    static async verifyConnection(): Promise<boolean>{
        try {
            await this.transporter.verify();
            console.log('SMTP Connection verified successfully');
            return true;
        } catch (error) {
            console.error('SMTP connection verification failed:', error);
            return false;
        }
    }

    static async sendVerificationEmail(
        to: string,
        name: string,
        verificationToken: string
    ): Promise<void>{
        try{
            const template = await this.getTemplate('verifiyEmail');

            //Link frontend di config belom di setting
            const verificationLink = `${config.frontend.url}/verify-email?token=${verificationToken}`;

            const html = this.replaceTemplateVariables(template, {
                name, verificationLink,
            });

            const mailOption = {
                format: `"fredAbod" <${config.email.user}>`,
                to, 
                subject: 'Verify Your Email',
                html,
            };

            const info = await this.transporter.sendMail(mailOption);
            console.log('password reset sent successfully', info.messageId);
        } catch (error){
            console.log('Error sending password reset emai', error);
            throw new Error('Failed to send password reset email');
        }
    }
    
}