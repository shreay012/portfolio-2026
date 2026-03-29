import type { CmsSiteContent } from '@/lib/cms/types'
import { allWork } from '@/lib/projects'
import { blogPosts, books, tools } from '@/lib/resources'

export const defaultCmsContent: CmsSiteContent = {
  siteName: 'Shreay Goyal',
  logoLetter: 'S',
  contactEmail: 'shreay012@gmail.com',
  navbarLinks: [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/tools', label: 'Tools' },
    { href: '/books', label: 'Books' },
    { href: '/blog', label: 'Blog' },
  ],
  footerLinks: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/tools', label: 'Tools' },
    { href: '/books', label: 'Books' },
    { href: '/blog', label: 'Blog' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ],
  footerTagline:
    'Senior Product Designer and UX Strategist focused on AI-driven product experiences for SaaS and enterprise teams.',
  footerSocials: [
    { href: 'https://linkedin.com/in/shreaygoyal', label: 'LinkedIn' },
    { href: 'https://twitter.com/shreaygoyal', label: 'Twitter / X' },
    { href: 'https://github.com/shreaygoyal', label: 'GitHub' },
  ],
  hero: {
    badge: 'Available for select product collaborations',
    titleLeading: 'AI-driven design',
    titleHighlight: 'for real product impact.',
    description:
      'Senior Product Designer with 8+ years designing SaaS and enterprise experiences that improve usability, engagement, and product growth.',
    primaryCtaLabel: 'View Projects',
    primaryCtaHref: '/projects',
    secondaryCtaLabel: 'Book a Discovery Call',
    secondaryCtaHref: '/contact',
    stats: [
      { value: '8+', label: 'Years of experience' },
      { value: '6+', label: 'Global brands' },
      { value: 'SaaS', label: 'Product focus' },
      { value: 'AI', label: 'Design-led workflows' },
    ],
  },
  projects: allWork,
  tools,
  books,
  blogPosts,
}
