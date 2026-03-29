'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCmsContent } from '@/lib/cms/use-cms-content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const cms = useCmsContent()
  const navLinks = cms.navbarLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#060606]/90 backdrop-blur-2xl border-b border-white/[0.05]'
            : 'bg-transparent'
        )}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between gap-8"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label={`${cms.siteName} — home`}
          >
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-white font-bold text-xs font-display">{cms.logoLetter}</span>
            </div>
            <span className="font-display font-semibold text-white/90 text-[15px] tracking-tight group-hover:text-white transition-colors">
              {cms.siteName}
            </span>
          </Link>

          {/* Desktop nav — pill container */}
          <ul
            className="hidden md:flex items-center gap-0.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-1.5 py-1.5"
            role="list"
          >
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
                      active ? 'text-white' : 'text-white/45 hover:text-white/80'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.1]"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#060606]/98 backdrop-blur-2xl border-b border-white/[0.06] md:hidden"
          >
            <nav aria-label="Mobile navigation" className="px-6 py-6 flex flex-col gap-1">
              {[{ href: '/', label: 'Home' }, ...navLinks].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    pathname === href
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/45 hover:text-white hover:bg-white/[0.04]'
                  )}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 rounded-xl bg-white text-black font-semibold text-sm"
                >
                  Book a Call
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
