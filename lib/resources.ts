export interface ResourceItem {
  slug: string
  title: string
  description: string
  category: string
  cta: string
  href: string
  accentColor: string
}

export const tools: ResourceItem[] = [
  {
    slug: 'ux-evaluation-report-generator',
    title: 'UX Evaluation Report Generator',
    description: 'A structured framework for running heuristic reviews, surfacing usability issues, and exporting stakeholder-ready reports.',
    category: 'Tool',
    cta: 'Explore Tools',
    href: '/tools',
    accentColor: '#4F8CFF',
  },
  {
    slug: 'growth-priority-mapper',
    title: 'Growth Priority Mapper',
    description: 'A decision tool for ranking UX and product opportunities by business impact, implementation effort, and conversion lift.',
    category: 'Framework',
    cta: 'See Frameworks',
    href: '/tools',
    accentColor: '#10B981',
  },
]

export const books: ResourceItem[] = [
  {
    slug: 'journey-from-graphic-designer-to-product-designer',
    title: 'Journey from Graphic Designer to Product Designer',
    description: 'A practical transition story on growing from visual execution into product thinking, systems, research, and strategy.',
    category: 'Book',
    cta: 'Explore Books',
    href: '/books',
    accentColor: '#F97316',
  },
  {
    slug: 'designing-for-ai-trust',
    title: 'Designing for AI Trust',
    description: 'A field guide for creating explainable AI experiences that users understand, trust, and adopt more quickly.',
    category: 'Book',
    cta: 'Browse Library',
    href: '/books',
    accentColor: '#7C5CFF',
  },
]

export const blogPosts: ResourceItem[] = [
  {
    slug: 'build-fast-without-breaking-trust',
    title: 'Build Fast Without Breaking Trust',
    description: 'How to move quickly on product experiments without creating confusing UX or undermining user confidence.',
    category: 'Insight',
    cta: 'Read Insights',
    href: '/blog',
    accentColor: '#0EA5E9',
  },
  {
    slug: 'cognitive-load-in-product-design',
    title: 'Cognitive Load in Product Design',
    description: 'A breakdown of why users stall, hesitate, or abandon flows when interfaces ask for too much thinking at once.',
    category: 'Article',
    cta: 'View Articles',
    href: '/blog',
    accentColor: '#EAB308',
  },
  {
    slug: 'from-ux-audits-to-growth-roadmaps',
    title: 'From UX Audits to Growth Roadmaps',
    description: 'A practical method for translating design observations into business-prioritized product action.',
    category: 'Essay',
    cta: 'Open Blog',
    href: '/blog',
    accentColor: '#14B8A6',
  },
]
