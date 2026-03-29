import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/cms/auth'

export async function GET(request: NextRequest) {
  const auth = requireAdminSession(request)
  if (!auth.ok) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }

  return NextResponse.json({ authenticated: true, username: auth.username })
}
