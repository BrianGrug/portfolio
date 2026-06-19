import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { verifyTurnstile } from '@/lib/utils';

export const sendEmail = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const turnstile = await verifyTurnstile(data.token);

    if (!turnstile.success) {
      return {
        success: false,
        message: 'Invalid turnstile token',
        errors: turnstile['error-codes'],
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mail = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: data.subject,
      text: data.body,
    });

    return {
      success: mail.accepted.length > 0 || mail.pending.length > 0,
      message: 'Email sent successfully',
    };
  });
