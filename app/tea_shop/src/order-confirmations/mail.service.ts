import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: String(process.env.SMTP_SENDER_EMAIL),
        pass: String(process.env.SMTP_SENDER_PASSWORD)
      }
    });
  }

  async sendConfirmationCode(email: string, code: string): Promise<void> {
    const mailOptions = {
      from: String(process.env.SMTP_SENDER_EMAIL),
      to: email,
      subject: 'Код подтверждения заказа',
      text: `Ваш код подтверждения заказа: ${code}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
