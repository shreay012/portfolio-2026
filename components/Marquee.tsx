const items = [
  'UX Research',
  'Product Strategy',
  'UI Design',
  'Design Systems',
  'Growth Optimization',
  'Conversion Rate Optimization',
  'SaaS Products',
  'Fintech',
  'E-Commerce',
  'Onboarding Flows',
  'Mobile Apps',
  'AI Tools',
  'Dashboard Design',
  'B2B SaaS',
  'Marketplace Products',
]

export function Marquee() {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.05] py-4 bg-[#060606]">
      {/* Left/right fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 inset-y-0 w-20 z-10"
        style={{ background: 'linear-gradient(to right, #060606, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 inset-y-0 w-20 z-10"
        style={{ background: 'linear-gradient(to left, #060606, transparent)' }}
      />

      <div className="flex animate-marquee gap-0 whitespace-nowrap" aria-hidden>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5 text-sm font-medium text-white/30 shrink-0">
            {item}
            <span className="w-1 h-1 rounded-full bg-white/15 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
