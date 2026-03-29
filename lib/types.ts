export interface CaseStudyFrontmatter {
  title: string
  slug: string
  description: string
  role: string
  timeline: string
  industry: string
  tags: string[]
  date: string
  featured: boolean
  coverGradient: string
  accentColor: string
  outcome: string
  heroImage?: string
  heroImageAlt?: string
}

export interface CaseStudy {
  slug: string
  frontmatter: CaseStudyFrontmatter
  content: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  gradient: string
  accentColor: string
  coverImage: string
  link: string
  featured: boolean
  year: string
  metrics: string
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
  website?: string  // honeypot — must remain empty
}

export interface ApiResponse<T = void> {
  success: boolean
  message: string
  data?: T
  error?: string
}
