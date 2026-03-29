import Image from 'next/image'

interface ProjectImageProps {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  aspectRatio?: 'wide' | 'standard'
}

interface ProjectImageRowProps {
  leftSrc: string
  leftAlt: string
  rightSrc: string
  rightAlt: string
  leftCaption?: string
  rightCaption?: string
}

export function ProjectImage({
  src,
  alt,
  caption,
  priority = false,
  aspectRatio = 'wide',
}: ProjectImageProps) {
  return (
    <figure className="my-10">
      <div className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] ${aspectRatio === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
      </div>
      {caption ? <figcaption className="mt-3 text-sm text-white/35">{caption}</figcaption> : null}
    </figure>
  )
}

export function ProjectImageRow({
  leftSrc,
  leftAlt,
  rightSrc,
  rightAlt,
  leftCaption,
  rightCaption,
}: ProjectImageRowProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5 my-10">
      <ProjectImage src={leftSrc} alt={leftAlt} caption={leftCaption} aspectRatio="standard" />
      <ProjectImage src={rightSrc} alt={rightAlt} caption={rightCaption} aspectRatio="standard" />
    </div>
  )
}
