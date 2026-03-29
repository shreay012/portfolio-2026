'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
  as?: React.ElementType
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const [mounted, setMounted] = useState(false)
  const [forceVisible, setForceVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Fallback: never leave critical content invisible if in-view detection does not trigger.
    if (isInView) {
      setForceVisible(true)
      return
    }

    const timeout = window.setTimeout(() => {
      setForceVisible(true)
    }, 800)

    return () => window.clearTimeout(timeout)
  }, [isInView])

  const directionMap = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  }

  const initial = { opacity: 0, ...directionMap[direction] }
  const shouldShow = isInView || forceVisible
  const animate = shouldShow
    ? { opacity: 1, x: 0, y: 0 }
    : initial

  if (!mounted) {
    return <Tag className={cn(className)}>{children}</Tag>
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for animating children in sequence
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const [mounted, setMounted] = useState(false)
  const [forceVisible, setForceVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isInView) {
      setForceVisible(true)
      return
    }

    const timeout = window.setTimeout(() => {
      setForceVisible(true)
    }, 800)

    return () => window.clearTimeout(timeout)
  }, [isInView])

  if (!mounted) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView || forceVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] },
  },
}

// Convenience wrapper for stagger items usable in Server Component pages
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerItem} className={cn(className)}>
      {children}
    </motion.div>
  )
}
