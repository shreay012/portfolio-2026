import { NextRequest, NextResponse } from 'next/server'
import {
  CMS_SESSION_COOKIE,
  createAdminSessionToken,
  getSessionMaxAge,
  validateAdminCredentials,
} from '@/lib/cms/auth'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string }
    const username = body.username?.trim() ?? ''
    const password = body.password ?? ''

    const result = validateAdminCredentials(username, password)
    if (!result.ok) {
      return NextResponse.json({ success: false, message: result.message }, { status: result.status })
    }

    const token = createAdminSessionToken(result.username, result.secret)
    const response = NextResponse.json({ success: true, message: 'Logged in' })
    response.cookies.set(CMS_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: getSessionMaxAge(),
    })

    return response
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 })
  }
}
