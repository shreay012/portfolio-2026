import type { Metadata } from 'next'
import { Mail, MapPin, Clock, CalendarDays, Phone, Globe } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { AnimatedSection } from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Connect with Shreay Goyal, Senior Product Designer and UX Strategist, for SaaS and enterprise product design engagements.',
}

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-2xl mb-16">
          <p className="section-label mb-6">Contact</p>
          <h1
            className="font-display font-extrabold text-white mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
          >
            Let&apos;s build something
            <br />
            <span className="gradient-text">that performs</span>
          </h1>
          <p className="text-lg text-white/45 leading-relaxed">
            Share your product context, where users drop off, and what outcome matters most.
            I&apos;ll come back with focused questions and a practical plan of attack.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <div className="card p-8 lg:p-10">
              <h2 className="font-display font-bold text-white text-xl mb-8 tracking-tight">Send a message</h2>
              <ContactForm />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-2 flex flex-col gap-4">
            <div className="card p-7">
              <h3 className="font-display font-bold text-white mb-5 tracking-tight">Contact info</h3>
              <div className="space-y-4">
                {[
                  { Icon: Mail, label: 'Email', value: 'shreay012@gmail.com', href: 'mailto:shreay012@gmail.com' },
                  { Icon: Phone, label: 'Phone', value: '+91 9351779913', href: 'tel:+919351779913' },
                  { Icon: MapPin, label: 'Location', value: 'Gurugram, India', sub: 'Open to remote collaborations' },
                  { Icon: Globe, label: 'Portfolio', value: 'Behance' },
                  { Icon: Clock, label: 'Response time', value: 'Within 24-48 hours' },
                ].map(({ Icon, label, value, href, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-white/35" />
                    </div>
                    <div>
                      <p className="text-xs text-white/25 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-white/65 hover:text-white transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-white/65">{value}</p>
                      )}
                      {sub && <p className="text-xs text-white/25">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-7 border-white/[0.1]" style={{ background: 'rgba(91,142,255,0.05)' }}>
              <CalendarDays className="w-5 h-5 text-white/40 mb-3" />
              <h3 className="font-display font-bold text-white mb-2 tracking-tight">Prefer a call?</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                Book a free 30-minute discovery call. No pressure, just an honest conversation
                about your product.
              </p>
              <a
                href="https://cal.com/shreaygoyal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                Book 30-min call
              </a>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-white/40 leading-relaxed mb-3">
                &quot;Shreay changed how we design decisions, not just screens. Our activation
                jumped from 22% to 61% in under two months.&quot;
              </blockquote>
              <p className="text-xs font-semibold text-white/25">- Founder, Series A SaaS Company</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
