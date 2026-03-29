import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, Clock3, Tag, Briefcase, BookOpenText, Sparkles } from 'lucide-react'
import type { CaseStudyFrontmatter } from '@/lib/types'

interface CaseStudyLayoutProps {
  frontmatter: CaseStudyFrontmatter
  children: React.ReactNode
  toc: Array<{ id: string; text: string; level: 2 | 3 }>
  readingTime: number
}

export function CaseStudyLayout({ frontmatter, children, toc, readingTime }: CaseStudyLayoutProps) {
  const { title, description, role, timeline, industry, tags, outcome, accentColor, heroImage, heroImageAlt } = frontmatter

  return (
    <article className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All Case Studies
        </Link>
      </div>

      <header className="relative overflow-hidden py-20 mb-16 border-b border-white/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 60% 80% at 24% 40%, ${accentColor}10 0%, transparent 72%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${accentColor}55 50%, transparent 100%)` }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] border"
              style={{ background: `${accentColor}10`, borderColor: `${accentColor}22`, color: `${accentColor}CC` }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Case Study
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ background: `${accentColor}10`, borderColor: `${accentColor}22`, color: `${accentColor}CC` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-16 items-start">
            <div>
              <h1
                className="font-display font-extrabold text-white mb-5"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.6rem)', lineHeight: '0.98', letterSpacing: '-0.045em' }}
              >
                {title}
              </h1>

              <p className="text-xl text-white/50 leading-relaxed max-w-3xl mb-10">{description}</p>

              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <MetaCard icon={Briefcase} label="Role" value={role} />
                <MetaCard icon={Clock3} label="Timeline" value={timeline} />
                <MetaCard icon={Tag} label="Industry" value={industry} />
                <MetaCard icon={BookOpenText} label="Read Time" value={`${readingTime} min`} />
              </div>
            </div>

            <div className="card p-6 lg:p-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-3">Project Snapshot</p>
              <div className="space-y-4 text-sm text-white/55 leading-relaxed">
                <p>
                  This page is structured as a narrative case study: context, diagnosis, design decisions,
                  and measurable outcomes.
                </p>
                {outcome ? (
                  <div className="rounded-2xl border p-4" style={{ background: `${accentColor}08`, borderColor: `${accentColor}18` }}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: `${accentColor}AA` }}>
                      Headline Outcome
                    </p>
                    <p className="text-white/85 font-medium">{outcome}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-16">
        {heroImage ? (
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.03] aspect-[16/9]">
            <Image
              src={heroImage}
              alt={heroImageAlt ?? `${title} hero image`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        ) : (
          <div
            className="relative overflow-hidden rounded-[32px] border border-white/[0.08] aspect-[16/9]"
            style={{
              background: `linear-gradient(135deg, ${accentColor}22 0%, rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.01) 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]" />
            <div className="relative h-full flex items-end p-8 lg:p-10">
              <div className="max-w-xl">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-3">Project Hero</p>
                <h2 className="font-display font-extrabold text-white text-2xl lg:text-4xl tracking-tight mb-3">{title}</h2>
                <p className="text-white/50 leading-relaxed">Add a project-specific hero image in frontmatter to replace this visual fallback.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-20">
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="card p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-4">Overview</p>
              <div className="space-y-4">
                <SidebarMetric label="Role" value={role} />
                <SidebarMetric label="Timeline" value={timeline} />
                <SidebarMetric label="Industry" value={industry} />
              </div>
            </div>

            {toc.length > 0 ? (
              <div className="card p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-4">On This Page</p>
                <nav aria-label="Case study sections">
                  <ul className="space-y-1.5">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${item.level === 3 ? 'ml-3 text-white/35 hover:text-white/60' : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ) : null}

            {outcome ? (
              <div className="card p-5" style={{ background: `${accentColor}07`, borderColor: `${accentColor}16` }}>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: `${accentColor}AA` }}>
                  Key Outcome
                </p>
                <p className="text-sm text-white/80 leading-relaxed">{outcome}</p>
              </div>
            ) : null}
          </aside>

          <div>
            <div className="mb-10 rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 mb-3">Case Study Overview</p>
              <p className="text-base text-white/58 leading-relaxed max-w-3xl">
                A structured walkthrough of the problem, research signals, core decisions, and the measurable impact of the work.
                The layout is intentionally editorial so each project reads less like a portfolio card and more like a complete product story.
              </p>
            </div>

            <div className="prose-dark">{children}</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-20 pt-16 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-2">Want results like these?</p>
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
              Let&apos;s build your next product.
            </h3>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
            >
              Book a Call
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-medium text-white/50 border border-white/[0.1] hover:text-white hover:border-white/25 transition-colors"
            >
              More Projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function MetaCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-white/25" />
        <span className="text-[11px] text-white/25 uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="text-sm font-medium text-white/70 leading-relaxed">{value}</p>
    </div>
  )
}

function SidebarMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/25 mb-1.5">{label}</p>
      <p className="text-sm text-white/68 leading-relaxed">{value}</p>
    </div>
  )
}
