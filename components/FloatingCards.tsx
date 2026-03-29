'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, Star } from 'lucide-react'

const cards = [
  {
    id: 1,
    title: 'QuickHire',
    subtitle: 'UX Design · Product Strategy',
    metric: '−60% time-to-hire',
    icon: TrendingUp,
    gradient: 'from-[#4F8CFF]/20 to-[#7C5CFF]/10',
    border: 'border-[#4F8CFF]/20',
    iconColor: 'text-[#4F8CFF]',
    dotColor: 'bg-[#4F8CFF]',
    initialX: -40,
    initialY: -60,
    rotation: -6,
    floatY: -12,
    delay: 0,
    zIndex: 30,
  },
  {
    id: 2,
    title: 'AI Genie',
    subtitle: 'Product Design · AI/ML UX',
    metric: '+85% daily active users',
    icon: Zap,
    gradient: 'from-[#10B981]/20 to-[#0891B2]/10',
    border: 'border-[#10B981]/20',
    iconColor: 'text-[#10B981]',
    dotColor: 'bg-[#10B981]',
    initialX: 60,
    initialY: 20,
    rotation: 5,
    floatY: -16,
    delay: 0.7,
    zIndex: 20,
  },
  {
    id: 3,
    title: 'Goutbond',
    subtitle: 'Design System · Retention',
    metric: '3× user retention',
    icon: Users,
    gradient: 'from-[#7C5CFF]/20 to-[#EC4899]/10',
    border: 'border-[#7C5CFF]/20',
    iconColor: 'text-[#7C5CFF]',
    dotColor: 'bg-[#7C5CFF]',
    initialX: -20,
    initialY: 80,
    rotation: -3,
    floatY: -10,
    delay: 1.4,
    zIndex: 10,
  },
  {
    id: 4,
    title: 'E-Commerce',
    subtitle: 'CRO · Checkout Flow',
    metric: '+45% conversion rate',
    icon: Star,
    gradient: 'from-[#F97316]/20 to-[#FBBF24]/10',
    border: 'border-[#F97316]/20',
    iconColor: 'text-[#F97316]',
    dotColor: 'bg-[#F97316]',
    initialX: 80,
    initialY: -20,
    rotation: 7,
    floatY: -14,
    delay: 2.1,
    zIndex: 25,
  },
]

export function FloatingCards() {
  return (
    <div className="relative w-full h-full" aria-hidden="true">
      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.15) 0%, transparent 70%)' }}
      />

      {cards.map((card) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.id}
            className="absolute"
            style={{
              left: `calc(50% + ${card.initialX}px)`,
              top: `calc(50% + ${card.initialY}px)`,
              zIndex: card.zIndex,
              rotate: card.rotation,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, card.floatY, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: card.delay * 0.3 },
              scale: { duration: 0.5, delay: card.delay * 0.3 },
              y: {
                duration: 4 + card.id * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.delay,
              },
            }}
          >
            <div
              className={`
                w-[200px] rounded-2xl p-4 
                bg-gradient-to-br ${card.gradient}
                border ${card.border}
                backdrop-blur-xl
                shadow-[0_8px_32px_rgba(0,0,0,0.4)]
              `}
              style={{ background: 'rgba(22, 29, 38, 0.85)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${card.gradient} border ${card.border}`}
                >
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <span className={`w-2 h-2 rounded-full ${card.dotColor} shadow-[0_0_6px_currentColor] animate-pulse`} />
              </div>

              {/* Content */}
              <p className="font-display font-bold text-slate-100 text-sm mb-0.5">{card.title}</p>
              <p className="text-[11px] text-slate-500 mb-3">{card.subtitle}</p>

              {/* Metric chip */}
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.05] border ${card.border}`}>
                <TrendingUp className={`w-3 h-3 ${card.iconColor}`} />
                <span className={`text-[10px] font-semibold ${card.iconColor}`}>{card.metric}</span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
