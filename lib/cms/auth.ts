import crypto from 'crypto'
import { NextRequest } from 'next/server'

export const CMS_SESSION_COOKIE = 'cms_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 8

type AuthEnv = {
  username: string
  password: string
  secret: string
}

function getAuthEnv(): { data: AuthEnv | null; error: string | null } {
  const username = process.env.CMS_ADMIN_USERNAME
  const password = process.env.CMS_ADMIN_PASSWORD
  const secret = process.env.CMS_SESSION_SECRET

  if (!username || !password || !secret) {
    return {
      data: null,
      error: 'CMS auth is not configured. Set CMS_ADMIN_USERNAME, CMS_ADMIN_PASSWORD, and CMS_SESSION_SECRET.',
    }
  }

  return {
    data: { username, password, secret },
    error: null,
  }
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, 'utf-8').toString('base64url')
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf-8')
}

function sign(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  if (leftBuffer.length !== rightBuffer.length) return false
  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

export function validateAdminCredentials(username: string, password: string) {
  const { data, error } = getAuthEnv()
  if (!data) {
    return { ok: false as const, status: 500, message: error }
  }

  const usernameOk = safeEqual(username, data.username)
  const passwordOk = safeEqual(password, data.password)

  if (!usernameOk || !passwordOk) {
    return { ok: false as const, status: 401, message: 'Invalid username or password' }
  }

  return { ok: true as const, username: data.username, secret: data.secret }
}

export function createAdminSessionToken(username: string, secret: string) {
  const payload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  }

  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

export function verifyAdminSessionToken(token: string) {
  const { data, error } = getAuthEnv()
  if (!data) {
    return { ok: false as const, status: 500, message: error }
  }

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) {
    return { ok: false as const, status: 401, message: 'Unauthorized' }
  }

  const expectedSignature = sign(encodedPayload, data.secret)
  if (!safeEqual(signature, expectedSignature)) {
    return { ok: false as const, status: 401, message: 'Unauthorized' }
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as { u?: string; exp?: number }
    if (!payload.u || !payload.exp) {
      return { ok: false as const, status: 401, message: 'Unauthorized' }
    }

    if (!safeEqual(payload.u, data.username)) {
      return { ok: false as const, status: 401, message: 'Unauthorized' }
    }

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      return { ok: false as const, status: 401, message: 'Session expired' }
    }

    return { ok: true as const, username: payload.u }
  } catch {
    return { ok: false as const, status: 401, message: 'Unauthorized' }
  }
}

export function requireAdminSession(request: NextRequest) {
  const token = request.cookies.get(CMS_SESSION_COOKIE)?.value
  if (!token) {
    return { ok: false as const, status: 401, message: 'Unauthorized' }
  }

  return verifyAdminSessionToken(token)
}

export function getSessionMaxAge() {
  return SESSION_DURATION_SECONDS
}
