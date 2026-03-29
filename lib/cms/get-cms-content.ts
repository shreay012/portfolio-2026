import { readCmsContent } from '@/lib/cms/store'

export async function getCmsContent() {
  return readCmsContent()
}
