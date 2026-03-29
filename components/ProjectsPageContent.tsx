"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CTASection } from '@/components/CTASection'
import { useCmsContent } from '@/lib/cms/use-cms-content'
import type { Project } from '@/lib/types'

const projectFilters = ['All', 'AI/ML', 'UX Design', 'Growth', 'Design Systems', 'SaaS'] as const

function getProjectFilterTag(project: Project) {
  const tags = project.tags.join(' ').toLowerCase()
  if (tags.includes('ai') || tags.includes('ml')) return 'AI/ML'
  if (tags.includes('growth') || tags.includes('cro')) return 'Growth'
  if (tags.includes('system') || tags.includes('dashboard')) return 'Design Systems'
  if (tags.includes('saas')) return 'SaaS'
  return 'UX Design'
}

interface ProjectsPageContentProps {
  label?: string
  title?: string
  description?: string
}

export function ProjectsPageContent({
  label = 'Projects',
  title = 'See how I help businesses scale smarter',
  description = 'Selected case studies and product transformations focused on growth, trust, and measurable UX impact across AI, SaaS, and enterprise systems.',
}: ProjectsPageContentProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>('All')
  const cms = useCmsContent()
  const allWork = cms.projects
  const featuredProjects = allWork.filter((project) => project.featured)
  const archiveProjects = allWork.filter((p) => !featuredProjects.find((f) => f.id === p.id))

  const filteredArchive = useMemo(() => {
    if (activeFilter === 'All') return archiveProjects
    return archiveProjects.filter((project) => getProjectFilterTag(project) === activeFilter)
  }, [activeFilter])

  return (
    <>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="max-w-4xl mb-12">
            <p className="section-label mb-6">{label}</p>
            <h1
              className="font-display font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
            >
              Featured
              <br />
              <span className="gradient-text">work</span>
            </h1>
            <p className="text-lg text-white/45 leading-relaxed max-w-2xl">{description}</p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                href="#all-projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition-colors"
              >
                View all projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium text-white/60 border border-white/[0.12] hover:text-white hover:border-white/25 transition-colors"
              >
                Start a conversation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="grid sm:grid-cols-3 gap-3 mb-14">
            {[
              { label: 'Projects delivered', value: '50+' },
              { label: 'Avg uplift range', value: '35%-140%' },
              { label: 'Focus domains', value: 'AI, SaaS, Enterprise' },
            ].map((item) => (
              <div key={item.label} className="card p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/28 mb-1.5">{item.label}</p>
                <p className="text-base font-semibold text-white/78 tracking-tight">{item.value}</p>
              </div>
            ))}
          </AnimatedSection>

          <StaggerContainer className="grid gap-4 md:grid-cols-2 mb-20">
            {featuredProjects.map((project, i) => (
              <StaggerItem key={project.id} className={i === 0 ? 'md:col-span-2' : ''}>
                <ProjectCard project={project} large={i === 0} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div id="all-projects">
            <AnimatedSection className="mb-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="section-label mb-3">All Projects</p>
                  <h2 className="font-display font-extrabold text-white text-3xl tracking-tight">Project archive</h2>
                  <p className="text-white/40 mt-2 max-w-xl">
                    A broader look at product, UX, and growth engagements across multiple industries.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectFilters.map((filter) => {
                    const isActive = filter === activeFilter
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3.5 py-2 rounded-full text-xs border transition-colors ${isActive ? 'text-white border-white/30 bg-white/[0.08]' : 'text-white/42 border-white/[0.1] hover:text-white/75 hover:border-white/[0.2]'}`}
                        aria-pressed={isActive}
                      >
                        {filter}
                      </button>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filteredArchive.map((project) => (
              <StaggerItem key={project.id}>
                <ArchiveCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="pt-16 border-t border-white/[0.05]">
            <p className="section-label mx-auto text-center mb-8 inline-flex justify-center w-full">Industries & Platforms</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                'AI Platforms',
                'SaaS Products',
                'Enterprise Systems',
                'HR Tech',
                'D2C Commerce',
                'Marketplaces',
                'Fintech',
                'HealthTech',
                'Design Systems',
                'B2B Dashboards',
              ].map((brand) => (
                <span
                  key={brand}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-white/30 bg-white/[0.03] border border-white/[0.06]"
                >
                  {brand}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <CTASection />
    </>
  )
}

function ArchiveCard({ project }: { project: Project }) {
  return (
    <Link href={project.link} className="group card block p-5 hover:border-white/[0.14]">
      <div className="relative mb-4 overflow-hidden rounded-xl border border-white/[0.1] bg-black/20 aspect-[16/10]">
        <Image
          src={project.coverImage}
          alt={`${project.title} cover`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 420px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
        <div
          className="absolute inset-0 opacity-0 translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
          style={{ background: `linear-gradient(120deg, transparent 0%, ${project.accentColor}38 52%, rgba(0,0,0,0.25) 100%)` }}
        />
        <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white/65">
          {project.year}
        </div>
      </div>

      <div className="flex items-start justify-end mb-3">
        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      <h3 className="font-display font-bold text-white/80 group-hover:text-white transition-colors mb-2 tracking-tight">
        {project.title}
      </h3>
      <p className="text-xs text-white/30 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/25">
              {t}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-bold text-right" style={{ color: `${project.accentColor}AA` }}>
          {project.metrics}
        </span>
      </div>
    </Link>
  )
}
