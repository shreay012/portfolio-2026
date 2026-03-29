'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { AnimatedSection, StaggerContainer } from './AnimatedSection'
import { motion } from 'framer-motion'
import { useCmsContent } from '@/lib/cms/use-cms-content'

export function FeaturedWork() {
  const cms = useCmsContent()
  const featuredProjects = cms.projects.filter((project) => project.featured)

  if (!featuredProjects.length) return null

  return (
    <section id="work" className="py-28 lg:py-40 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <p className="section-label mb-5">Selected Work</p>
            <h2
              className="font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Case studies that
              <br />
              <span className="gradient-text">drove real growth</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/80 transition-colors group shrink-0"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="md:col-span-2"
          >
            <ProjectCard project={featuredProjects[0]} large />
          </motion.div>

          {featuredProjects.slice(1).map((project, i) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i + 1) * 0.08 },
                },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
