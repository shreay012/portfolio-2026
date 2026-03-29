'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
  src: string
  alt: string
  title: string
  caption: string
  tag?: string
}

interface InteractiveProjectGalleryProps {
  title?: string
  eyebrow?: string
  intro?: string
  images: GalleryImage[]
}

export function InteractiveProjectGallery({
  title = 'Interactive Gallery',
  eyebrow = 'Project Visuals',
  intro,
  images,
}: InteractiveProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = useMemo(() => images[activeIndex] ?? images[0], [activeIndex, images])

  if (!images.length) return null

  return (
    <section className="my-14 rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-5 lg:p-7 not-prose">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/30 mb-2">{eyebrow}</p>
          <h3 className="font-display font-extrabold text-white text-2xl tracking-tight mb-2">{title}</h3>
          {intro ? <p className="text-white/50 leading-relaxed max-w-2xl">{intro}</p> : null}
        </div>
        <div className="text-sm text-white/35">{activeIndex + 1} / {images.length}</div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
        <div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/20 aspect-[16/10]">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority={activeIndex === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 920px"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-white/80">{activeImage.title}</span>
            {activeImage.tag ? (
              <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/35">
                {activeImage.tag}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-white/40 leading-relaxed">{activeImage.caption}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {images.map((image, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`text-left rounded-[20px] border overflow-hidden transition-all ${isActive ? 'border-white/25 bg-white/[0.06]' : 'border-white/[0.06] hover:border-white/[0.14] bg-white/[0.02]'}`}
                aria-pressed={isActive}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-300 ${isActive ? 'scale-[1.02]' : 'scale-100'}`}
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/28 mb-1">Frame {index + 1}</p>
                  <p className="text-sm font-medium text-white/72 leading-snug">{image.title}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface ExperiencePanelProps {
  title?: string
  leftTitle: string
  leftSummary: string
  leftPoints: string[]
  rightTitle: string
  rightSummary: string
  rightPoints: string[]
}

export function ExperiencePanel({
  title = 'Flow Perspectives',
  leftTitle,
  leftSummary,
  leftPoints,
  rightTitle,
  rightSummary,
  rightPoints,
}: ExperiencePanelProps) {
  const [active, setActive] = useState<'left' | 'right'>('left')
  const current = active === 'left'
    ? { title: leftTitle, summary: leftSummary, points: leftPoints }
    : { title: rightTitle, summary: rightSummary, points: rightPoints }

  return (
    <section className="my-14 rounded-[32px] border border-white/[0.08] bg-white/[0.02] p-5 lg:p-7 not-prose">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/30 mb-2">Interactive Breakdown</p>
          <h3 className="font-display font-extrabold text-white text-2xl tracking-tight">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActive('left')}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${active === 'left' ? 'border-white/28 bg-white/[0.08] text-white' : 'border-white/[0.08] text-white/45 hover:text-white/75 hover:border-white/[0.16]'}`}
            aria-pressed={active === 'left'}
          >
            {leftTitle}
          </button>
          <button
            type="button"
            onClick={() => setActive('right')}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${active === 'right' ? 'border-white/28 bg-white/[0.08] text-white' : 'border-white/[0.08] text-white/45 hover:text-white/75 hover:border-white/[0.16]'}`}
            aria-pressed={active === 'right'}
          >
            {rightTitle}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-5">
        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/28 mb-2">Current view</p>
          <h4 className="font-display font-bold text-white text-xl tracking-tight mb-3">{current.title}</h4>
          <p className="text-white/50 leading-relaxed mb-5">{current.summary}</p>
          <ul className="space-y-3">
            {current.points.map((point) => (
              <li key={point} className="rounded-2xl border border-white/[0.06] bg-black/10 px-4 py-3 text-sm text-white/68 leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/28 mb-4">Why it matters</p>
          <div className="space-y-3 text-sm text-white/48 leading-relaxed">
            <p>Interactive switching makes the case study easier to scan from both sides of the product system.</p>
            <p>Instead of reading one long narrative, visitors can inspect the candidate and employer experiences separately.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
