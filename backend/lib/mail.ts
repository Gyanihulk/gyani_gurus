import 'dotenv/config'
import { createTransport, getTestMessageUrl } from 'nodemailer'

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as any)

function makeANiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘, ColdBlooded</p>
    </div>
  `
}

export interface Envelope {
  from: string
  to?: string[] | null
}

export interface MailResponse {
  accepted?: string[] | null
  rejected?: null[] | null
  envelopeTime: number
  messageTime: number
  messageSize: number
  response: string
  envelope: Envelope
  messageId: string
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string,
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: `${process.env.SENDER_MAIL_USER}`,
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${to}">Click Here to reset</a>
    `),
  })

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
  }
}
