import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'
import nodemailer from 'nodemailer'

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  company: z.string().max(120).optional(),
  budget: z.string().max(60).optional(),
  message: z.string().min(20).max(2000),
})

// Simple in-memory rate limiter per IP (resets on cold start)
const requestLog = new Map<string, number[]>()
const RATE_LIMIT = 3         // max submissions
const WINDOW_MS = 60 * 60 * 1000  // per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (hits.length >= RATE_LIMIT) return true
  requestLog.set(ip, [...hits, now])
  return false
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(req: NextRequest) {
  // IP rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // Parse body safely
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Validate
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? 'Validation failed.'
    return NextResponse.json({ success: false, error: first }, { status: 422 })
  }

  const { name, email, company, budget, message } = parsed.data

  // Store in MongoDB
  try {
    await connectDB()
    await Contact.create({ name, email, company, budget, message })
  } catch (err) {
    console.error('[contact] DB error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to save your message. Please try again.' },
      { status: 500 }
    )
  }

  // Send email notification (non-blocking failure — don't fail the request if email fails)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transport = createTransport()
      await transport.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `New inquiry from ${name}${company ? ` @ ${company}` : ''}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : '',
          budget ? `Budget: ${budget}` : '',
          '',
          `Message:\n${message}`,
        ]
          .filter(Boolean)
          .join('\n'),
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #1e293b;">
            <h2 style="color: #4F8CFF;">New portfolio inquiry</h2>
            <table style="width:100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 100px;"><strong>Name</strong></td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong>Company</strong></td><td>${company}</td></tr>` : ''}
              ${budget ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong>Budget</strong></td><td>${budget}</td></tr>` : ''}
            </table>
            <hr style="margin: 16px 0; border-color: #e2e8f0;" />
            <p style="color: #64748b;"><strong>Message:</strong></p>
            <p style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 3px solid #4F8CFF;">${message.replace(/\n/g, '<br />')}</p>
          </div>
        `,
      })
    } catch (err) {
      console.error('[contact] Email error (non-fatal):', err)
    }
  }

  return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 })
}
