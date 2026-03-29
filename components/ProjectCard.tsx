'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  large?: boolean
}

function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={cn('relative w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-black/20', large ? 'aspect-[16/8.4]' : 'aspect-[16/10]')}>
      <Image
        src={project.coverImage}
        alt={`${project.title} cover`}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        sizes={large ? '(max-width: 1024px) 100vw, 1200px' : '(max-width: 1024px) 100vw, 600px'}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />

      <div
        className="absolute inset-0 opacity-0 translate-y-6 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0"
        style={{ background: `linear-gradient(130deg, ${project.accentColor}40 0%, transparent 48%, rgba(0,0,0,0.25) 100%)` }}
      />

      <div className="absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-130%] group-hover:translate-x-[320%] transition-transform duration-700 ease-out" />

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">{project.year}</p>
          <p className="text-sm font-semibold text-white/88 leading-tight">{project.title}</p>
        </div>
        <div className="rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white/65">
          Case Study
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <Link
      href={project.link}
      className={cn('group card flex flex-col gap-5 overflow-hidden', large ? 'p-7 lg:p-8' : 'p-6')}
      aria-label={`View case study: ${project.title}`}
    >
      <ProjectVisual project={project} large={large} />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.05] border border-white/[0.07] text-white/35"
              >
                {tag}
              </span>
            ))}
            <span className="text-[11px] text-white/20 font-mono self-center ml-0.5">{project.year}</span>
          </div>

          <h3 className={cn('font-display font-bold text-white tracking-tight mb-2', large ? 'text-2xl' : 'text-xl')}>
            {project.title}
          </h3>

          <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
        </div>

        <div
          className="shrink-0 w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white/30 transition-all duration-200"
          aria-hidden
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div
        className="inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{
          background: `${project.accentColor}12`,
          color: `${project.accentColor}CC`,
          border: `1px solid ${project.accentColor}20`,
        }}
      >
        {project.metrics}
      </div>
    </Link>
  )
}
