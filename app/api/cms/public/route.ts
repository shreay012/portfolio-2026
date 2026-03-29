import { NextResponse } from 'next/server'
import { readCmsContent } from '@/lib/cms/store'

export async function GET() {
  const content = await readCmsContent()
  return NextResponse.json(content)
}
