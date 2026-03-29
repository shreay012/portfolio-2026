'use client'

import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react'
import { useCmsContent } from '@/lib/cms/use-cms-content'

const socialIcons = {
  LinkedIn: Linkedin,
  'Twitter / X': Twitter,
  GitHub: Github,
}

export function Footer() {
  const cms = useCmsContent()
  const year = new Date().getFullYear()

  return (
    <footer role="contentinfo" className="border-t border-white/[0.05] bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top row */}
        <div className="py-16 flex flex-col md:flex-row md:items-start justify-between gap-12">
          {/* Brand + tagline */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group" aria-label="Home">
              <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
                <span className="text-white font-bold text-xs">{cms.logoLetter}</span>
              </div>
              <span className="font-display font-semibold text-white/90 text-[15px] tracking-tight">
                  {cms.siteName}
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed">
                {cms.footerTagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
                {cms.footerSocials.map(({ href, label }) => {
                  const Icon = socialIcons[label as keyof typeof socialIcons] ?? ArrowUpRight
                  return (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-white/30 hover:text-white/70 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-4">
                Pages
              </p>
              <ul className="space-y-2.5" role="list">
                {cms.footerLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-4">
                Contact
              </p>
              <div className="space-y-2.5 text-sm text-white/40">
                <p>{cms.contactEmail}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors duration-200"
                >
                  Book a call <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20">© {year} {cms.siteName}. All rights reserved.</p>
          <p className="text-xs text-white/15">Next.js · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}



