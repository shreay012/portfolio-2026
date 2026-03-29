import { NextRequest, NextResponse } from 'next/server'
import { readCmsContent, writeCmsContent } from '@/lib/cms/store'
import type { CmsSiteContent } from '@/lib/cms/types'
import { requireAdminSession } from '@/lib/cms/auth'

function getAuthError(request: NextRequest) {
  const auth = requireAdminSession(request)
  if (!auth.ok) {
    return {
      message: auth.message,
      status: auth.status,
    }
  }

  return null
}

export async function GET(request: NextRequest) {
  const authError = getAuthError(request)
  if (authError) {
    return NextResponse.json({ success: false, message: authError.message }, { status: authError.status })
  }

  const content = await readCmsContent()
  return NextResponse.json({ success: true, data: content })
}

export async function PUT(request: NextRequest) {
  const authError = getAuthError(request)
  if (authError) {
    return NextResponse.json({ success: false, message: authError.message }, { status: authError.status })
  }

  try {
    const body = (await request.json()) as CmsSiteContent
    await writeCmsContent(body)
    return NextResponse.json({ success: true, message: 'CMS content updated' })
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 })
  }
}
