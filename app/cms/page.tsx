'use client'

import { useEffect, useState } from 'react'
import type { CmsSiteContent, CmsNavLink, CmsSocialLink, CmsHeroStat } from '@/lib/cms/types'
import type { Project } from '@/lib/types'
import type { ResourceItem } from '@/lib/resources'
import { defaultCmsContent } from '@/lib/cms/default-content'

type CmsTab = 'general' | 'hero' | 'navigation' | 'projects' | 'resources' | 'raw'

export default function CmsPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [content, setContent] = useState<CmsSiteContent | null>(null)
  const [rawJson, setRawJson] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<CmsTab>('general')

  useEffect(() => {
    void checkSession()
  }, [])

  async function checkSession() {
    setLoading(true)
    setStatus('Checking admin session...')
    try {
      const res = await fetch('/api/cms/session', { cache: 'no-store' })
      const data = (await res.json()) as { authenticated?: boolean }
      if (data.authenticated) {
        setAuthenticated(true)
        await loadContent('Session active. Loading content...')
        return
      }
      setAuthenticated(false)
      setStatus('Sign in to access CMS')
    } catch {
      setAuthenticated(false)
      setStatus('Unable to verify session')
    } finally {
      setLoading(false)
    }
  }

  async function login() {
    if (!username || !password) {
      setStatus('Enter username and password')
      return
    }

    setLoading(true)
    setStatus('Signing in...')
    try {
      const res = await fetch('/api/cms/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !data.success) {
        setStatus(data.message ?? 'Login failed')
        setLoading(false)
        return
      }

      setAuthenticated(true)
      setPassword('')
      await loadContent('Signed in. Loading content...')
    } catch {
      setStatus('Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    setStatus('Signing out...')
    try {
      await fetch('/api/cms/logout', { method: 'POST' })
    } finally {
      setAuthenticated(false)
      setContent(null)
      setRawJson('')
      setPassword('')
      setStatus('Signed out')
      setLoading(false)
    }
  }

  async function loadContent(message = 'Loading content...') {
    setStatus(message)
    try {
      const res = await fetch('/api/cms', { cache: 'no-store' })

      const data = await res.json()
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          setAuthenticated(false)
          setContent(null)
          setRawJson('')
        }
        setStatus(data.message ?? 'Failed to load content')
        return
      }

      setContent(data.data as CmsSiteContent)
      setRawJson(JSON.stringify(data.data, null, 2))
      setStatus('Content loaded')
    } catch {
      setStatus('Failed to load content')
    }
  }

  async function saveContent() {
    setLoading(true)
    setStatus('Saving...')

    if (!content) {
      setStatus('Load content first')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          setAuthenticated(false)
          setContent(null)
          setRawJson('')
        }
        setStatus(data.message ?? 'Save failed')
        setLoading(false)
        return
      }

      setStatus('Saved successfully')
    } catch {
      setStatus('Save failed')
    } finally {
      setLoading(false)
    }
  }

  function updateContent(next: CmsSiteContent) {
    setContent(next)
    setRawJson(JSON.stringify(next, null, 2))
  }

  function parseRawJson() {
    try {
      const parsed = JSON.parse(rawJson) as CmsSiteContent
      updateContent(parsed)
      setStatus('Raw JSON applied')
    } catch {
      setStatus('Invalid JSON')
    }
  }

  function resetToDefaults() {
    const next = JSON.parse(JSON.stringify(defaultCmsContent)) as CmsSiteContent
    updateContent(next)
    setStatus('Reset to default CMS content')
  }

  return (
    <main className="min-h-screen bg-[#060606] pt-28 pb-20 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display font-extrabold text-white text-4xl tracking-tight mb-3">Admin CMS</h1>
        <p className="text-white/45 mb-8">Manage complete website content with section-based controls.</p>

        {authenticated ? (
          <div className="card p-5 mb-5">
            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="button"
                onClick={() => void loadContent()}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm disabled:opacity-50"
              >
                Refresh Content
              </button>
              <button
                type="button"
                onClick={saveContent}
                disabled={!rawJson || loading}
                className="px-5 py-3 rounded-xl border border-white/[0.2] text-white font-semibold text-sm disabled:opacity-50"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={resetToDefaults}
                disabled={loading}
                className="px-5 py-3 rounded-xl border border-red-500/30 text-red-300 font-semibold text-sm disabled:opacity-50"
              >
                Reset Defaults
              </button>
              <button
                type="button"
                onClick={() => void logout()}
                disabled={loading}
                className="px-5 py-3 rounded-xl border border-white/[0.2] text-white/75 font-semibold text-sm disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="card p-5 mb-5">
            <label className="block text-xs uppercase tracking-[0.16em] text-white/25 mb-2">Admin Sign In</label>
            <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-4 py-3 text-white/80 outline-none focus:border-white/30"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-4 py-3 text-white/80 outline-none focus:border-white/30"
              />
              <button
                type="button"
                onClick={() => void login()}
                disabled={!username || !password || loading}
                className="px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm disabled:opacity-50"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {content ? (
          <>
            <div className="card p-3 mb-5">
              <div className="flex flex-wrap gap-2">
                {([
                  ['general', 'General'],
                  ['hero', 'Hero'],
                  ['navigation', 'Navigation & Footer'],
                  ['projects', 'Projects'],
                  ['resources', 'Tools / Books / Blog'],
                  ['raw', 'Raw JSON'],
                ] as Array<[CmsTab, string]>).map(([tab, label]) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-lg text-xs border transition-colors ${activeTab === tab ? 'text-white border-white/30 bg-white/[0.08]' : 'text-white/45 border-white/[0.08] hover:text-white/75 hover:border-white/[0.14]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'general' ? (
              <div className="card p-5 space-y-4">
                <TextField label="Site Name" value={content.siteName} onChange={(v) => updateContent({ ...content, siteName: v })} />
                <TextField label="Logo Letter" value={content.logoLetter} onChange={(v) => updateContent({ ...content, logoLetter: v })} />
                <TextField label="Contact Email" value={content.contactEmail} onChange={(v) => updateContent({ ...content, contactEmail: v })} />
                <TextField label="Footer Tagline" value={content.footerTagline} onChange={(v) => updateContent({ ...content, footerTagline: v })} multiline />
              </div>
            ) : null}

            {activeTab === 'hero' ? (
              <div className="card p-5 space-y-4">
                <TextField label="Badge" value={content.hero.badge} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, badge: v } })} />
                <TextField label="Title Leading" value={content.hero.titleLeading} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, titleLeading: v } })} />
                <TextField label="Title Highlight" value={content.hero.titleHighlight} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, titleHighlight: v } })} />
                <TextField label="Description" value={content.hero.description} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, description: v } })} multiline />
                <div className="grid md:grid-cols-2 gap-4">
                  <TextField label="Primary CTA Label" value={content.hero.primaryCtaLabel} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, primaryCtaLabel: v } })} />
                  <TextField label="Primary CTA Href" value={content.hero.primaryCtaHref} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, primaryCtaHref: v } })} />
                  <TextField label="Secondary CTA Label" value={content.hero.secondaryCtaLabel} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, secondaryCtaLabel: v } })} />
                  <TextField label="Secondary CTA Href" value={content.hero.secondaryCtaHref} onChange={(v) => updateContent({ ...content, hero: { ...content.hero, secondaryCtaHref: v } })} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/25 mb-3">Hero Stats</p>
                  <div className="space-y-3">
                    {content.hero.stats.map((stat, index) => (
                      <div key={`${stat.label}-${index}`} className="grid md:grid-cols-[1fr_2fr_auto] gap-3">
                        <input
                          value={stat.value}
                          onChange={(e) => {
                            const next = [...content.hero.stats]
                            next[index] = { ...stat, value: e.target.value }
                            updateContent({ ...content, hero: { ...content.hero, stats: next } })
                          }}
                          className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/30"
                        />
                        <input
                          value={stat.label}
                          onChange={(e) => {
                            const next = [...content.hero.stats]
                            next[index] = { ...stat, label: e.target.value }
                            updateContent({ ...content, hero: { ...content.hero, stats: next } })
                          }}
                          className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = content.hero.stats.filter((_, i) => i !== index)
                            updateContent({ ...content, hero: { ...content.hero, stats: next } })
                          }}
                          className="px-3 py-2.5 rounded-xl border border-white/[0.12] text-white/60 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next: CmsHeroStat[] = [...content.hero.stats, { value: '', label: '' }]
                      updateContent({ ...content, hero: { ...content.hero, stats: next } })
                    }}
                    className="mt-3 px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70"
                  >
                    Add Stat
                  </button>
                </div>
              </div>
            ) : null}

            {activeTab === 'navigation' ? (
              <div className="space-y-5">
                <ListEditor
                  title="Navbar Links"
                  items={content.navbarLinks}
                  onChange={(next) => updateContent({ ...content, navbarLinks: next })}
                />
                <ListEditor
                  title="Footer Links"
                  items={content.footerLinks}
                  onChange={(next) => updateContent({ ...content, footerLinks: next })}
                />
                <SocialEditor
                  title="Footer Socials"
                  items={content.footerSocials}
                  onChange={(next) => updateContent({ ...content, footerSocials: next })}
                />
              </div>
            ) : null}

            {activeTab === 'projects' ? (
              <ProjectEditor
                items={content.projects}
                onChange={(next) => updateContent({ ...content, projects: next })}
              />
            ) : null}

            {activeTab === 'resources' ? (
              <div className="space-y-5">
                <ResourceEditor title="Tools" items={content.tools} onChange={(next) => updateContent({ ...content, tools: next })} />
                <ResourceEditor title="Books" items={content.books} onChange={(next) => updateContent({ ...content, books: next })} />
                <ResourceEditor title="Blog Posts" items={content.blogPosts} onChange={(next) => updateContent({ ...content, blogPosts: next })} />
              </div>
            ) : null}

            {activeTab === 'raw' ? (
              <div className="card p-4">
                <textarea
                  value={rawJson}
                  onChange={(e) => setRawJson(e.target.value)}
                  className="w-full min-h-[540px] rounded-xl bg-black/40 border border-white/[0.08] p-4 text-sm text-white/75 font-mono outline-none focus:border-white/25"
                />
                <button
                  type="button"
                  onClick={parseRawJson}
                  className="mt-3 px-4 py-2 rounded-lg border border-white/[0.14] text-sm text-white/75"
                >
                  Apply Raw JSON
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="card p-6 text-white/45">
            Sign in with your admin username and password to start managing the website.
          </div>
        )}

        <p className="mt-4 text-sm text-white/45">{status}</p>
      </div>
    </main>
  )
}

function TextField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.16em] text-white/25 mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.1] px-4 py-3 text-white/80 outline-none focus:border-white/30"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.1] px-4 py-3 text-white/80 outline-none focus:border-white/30"
        />
      )}
    </div>
  )
}

function ListEditor({ title, items, onChange }: { title: string; items: CmsNavLink[]; onChange: (items: CmsNavLink[]) => void }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/25 mb-3">{title}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
            <input
              value={item.label}
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...item, label: e.target.value }
                onChange(next)
              }}
              placeholder="Label"
              className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/30"
            />
            <input
              value={item.href}
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...item, href: e.target.value }
                onChange(next)
              }}
              placeholder="/path"
              className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/30"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="px-3 py-2.5 rounded-xl border border-white/[0.12] text-white/60 hover:text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, { href: '/', label: '' }])}
        className="mt-3 px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70"
      >
        Add Link
      </button>
    </div>
  )
}

function SocialEditor({ title, items, onChange }: { title: string; items: CmsSocialLink[]; onChange: (items: CmsSocialLink[]) => void }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/25 mb-3">{title}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="grid md:grid-cols-[1fr_2fr_auto] gap-3">
            <input
              value={item.label}
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...item, label: e.target.value }
                onChange(next)
              }}
              placeholder="Label"
              className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/30"
            />
            <input
              value={item.href}
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...item, href: e.target.value }
                onChange(next)
              }}
              placeholder="https://"
              className="rounded-xl bg-white/[0.03] border border-white/[0.1] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/30"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="px-3 py-2.5 rounded-xl border border-white/[0.12] text-white/60 hover:text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, { href: 'https://', label: '' }])}
        className="mt-3 px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70"
      >
        Add Social
      </button>
    </div>
  )
}

function ProjectEditor({ items, onChange }: { items: Project[]; onChange: (items: Project[]) => void }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/25 mb-3">Projects</p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="rounded-xl border border-white/[0.08] p-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <input value={item.id} onChange={(e) => mutateProject(items, index, { id: e.target.value }, onChange)} placeholder="id" className="input-cms" />
              <input value={item.title} onChange={(e) => mutateProject(items, index, { title: e.target.value }, onChange)} placeholder="title" className="input-cms" />
              <input value={item.link} onChange={(e) => mutateProject(items, index, { link: e.target.value }, onChange)} placeholder="/projects/slug" className="input-cms" />
              <input value={item.metrics} onChange={(e) => mutateProject(items, index, { metrics: e.target.value }, onChange)} placeholder="metrics" className="input-cms" />
              <input value={item.year} onChange={(e) => mutateProject(items, index, { year: e.target.value }, onChange)} placeholder="year" className="input-cms" />
              <input value={item.accentColor} onChange={(e) => mutateProject(items, index, { accentColor: e.target.value }, onChange)} placeholder="#hex" className="input-cms" />
              <input value={item.coverImage} onChange={(e) => mutateProject(items, index, { coverImage: e.target.value }, onChange)} placeholder="/projects/covers/x.svg" className="input-cms md:col-span-2" />
              <input value={item.gradient} onChange={(e) => mutateProject(items, index, { gradient: e.target.value }, onChange)} placeholder="gradient classes" className="input-cms md:col-span-2" />
            </div>
            <textarea value={item.description} onChange={(e) => mutateProject(items, index, { description: e.target.value }, onChange)} rows={3} placeholder="description" className="input-cms w-full" />
            <input
              value={item.tags.join(', ')}
              onChange={(e) => mutateProject(items, index, { tags: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) }, onChange)}
              placeholder="tag1, tag2"
              className="input-cms w-full"
            />
            <label className="inline-flex items-center gap-2 text-sm text-white/65">
              <input
                type="checkbox"
                checked={item.featured}
                onChange={(e) => mutateProject(items, index, { featured: e.target.checked }, onChange)}
              />
              Featured project
            </label>
            <div>
              <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70">
                Remove Project
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              id: '',
              title: '',
              description: '',
              tags: [],
              gradient: '',
              accentColor: '#5B8EFF',
              coverImage: '/projects/covers/placeholder.svg',
              link: '/projects/',
              featured: false,
              year: '2026',
              metrics: '',
            },
          ])
        }
        className="mt-3 px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70"
      >
        Add Project
      </button>
    </div>
  )
}

function mutateProject(items: Project[], index: number, patch: Partial<Project>, onChange: (items: Project[]) => void) {
  const next = [...items]
  next[index] = { ...next[index], ...patch }
  onChange(next)
}

function ResourceEditor({ title, items, onChange }: { title: string; items: ResourceItem[]; onChange: (items: ResourceItem[]) => void }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/25 mb-3">{title}</p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.slug}-${index}`} className="rounded-xl border border-white/[0.08] p-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <input value={item.slug} onChange={(e) => mutateResource(items, index, { slug: e.target.value }, onChange)} placeholder="slug" className="input-cms" />
              <input value={item.title} onChange={(e) => mutateResource(items, index, { title: e.target.value }, onChange)} placeholder="title" className="input-cms" />
              <input value={item.category} onChange={(e) => mutateResource(items, index, { category: e.target.value }, onChange)} placeholder="category" className="input-cms" />
              <input value={item.cta} onChange={(e) => mutateResource(items, index, { cta: e.target.value }, onChange)} placeholder="CTA" className="input-cms" />
              <input value={item.href} onChange={(e) => mutateResource(items, index, { href: e.target.value }, onChange)} placeholder="href" className="input-cms" />
              <input value={item.accentColor} onChange={(e) => mutateResource(items, index, { accentColor: e.target.value }, onChange)} placeholder="#hex" className="input-cms" />
            </div>
            <textarea value={item.description} onChange={(e) => mutateResource(items, index, { description: e.target.value }, onChange)} rows={3} placeholder="description" className="input-cms w-full" />
            <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70">
              Remove Item
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              slug: '',
              title: '',
              description: '',
              category: '',
              cta: '',
              href: '/',
              accentColor: '#5B8EFF',
            },
          ])
        }
        className="mt-3 px-3 py-2 rounded-lg text-xs border border-white/[0.14] text-white/70"
      >
        Add Item
      </button>
    </div>
  )
}

function mutateResource(items: ResourceItem[], index: number, patch: Partial<ResourceItem>, onChange: (items: ResourceItem[]) => void) {
  const next = [...items]
  next[index] = { ...next[index], ...patch }
  onChange(next)
}
