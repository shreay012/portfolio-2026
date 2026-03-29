'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const budgetOptions = [
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
  'Let\'s discuss',
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().email('Please enter a valid email').max(254),
  company: z.string().max(120).optional(),
  budget: z.string().optional(),
  message: z.string().min(20, 'Please tell me a bit more (at least 20 characters)').max(2000),
  website: z.string().max(0, 'Leave this blank'), // honeypot
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    if (data.website) return // Honeypot triggered — silently reject
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          budget: data.budget,
          message: data.message,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      reset()
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-16 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-display font-bold text-xl text-white">Message received!</h3>
        <p className="text-white/45 max-w-sm">
          Thanks for reaching out. I&apos;ll review your message and get back to you within
          24–48 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-white/50 hover:text-white transition-colors font-medium"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        {...register('website')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      {/* Name + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            autoComplete="name"
            placeholder="Alex Johnson"
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      {/* Company + Budget row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register('company')}
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc. (optional)"
            className={inputCls(false)}
          />
        </Field>
        <Field label="Budget Range" error={errors.budget?.message}>
          <select {...register('budget')} className={cn(inputCls(false), 'pr-10')}>
            <option value="">Select budget…</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell me about your project, goals, and current challenges…"
          className={cn(inputCls(!!errors.message), 'resize-none')}
        />
      </Field>

      {/* Server error */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold text-black text-sm bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-white/20">
        I read every message personally and reply within 24–48 hours.
      </p>
    </form>
  )
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
        {label}
        {required && <span className="text-white/50 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1" role="alert">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full px-4 py-3 rounded-xl text-sm text-white/80 placeholder:text-white/20',
    'bg-white/[0.04] border transition-all duration-150 outline-none',
    'focus:border-white/25 focus:bg-white/[0.06]',
    hasError
      ? 'border-red-500/40 bg-red-500/5'
      : 'border-white/[0.07] hover:border-white/[0.13]'
  )
}
