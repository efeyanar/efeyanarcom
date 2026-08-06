import React, { type FormEvent } from 'react'

export interface ContactData {
  title: string
  email: string
  githubUrl: string
  linkedinUrl: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  buttonText: string
}

interface ContactFormProps {
  data: ContactData
  lang: 'tr' | 'en'
  saving: boolean
  statusMsg: { type: 'success' | 'error'; text: string } | null
  onChange: (field: keyof ContactData, value: string) => void
  onSave: (e: FormEvent<HTMLFormElement>) => void
}

export default function ContactForm({
  data,
  lang,
  saving,
  statusMsg,
  onChange,
  onSave,
}: ContactFormProps) {
  return (
    <form onSubmit={onSave} className="space-y-8">
      {statusMsg && (
        <div
          className={`p-4 border text-xs font-mono uppercase tracking-widest ${
            statusMsg.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
              : 'border-red-500/30 bg-red-500/10 text-red-500'
          }`}
        >
          {statusMsg.text}
        </div>
      )}
      <div className="space-y-4">
        <span className="block text-xs font-mono uppercase tracking-widest opacity-40">
          // {lang === 'tr' ? 'GENEL BİLGİLER & LİNKLER' : 'GENERAL INFO & LINKS'}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'BÖLÜM BAŞLIĞI' : 'SECTION TITLE'}
            </label>
            <input
              type="text"
              value={data?.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-black text-xl uppercase focus:outline-none focus:border-(--color-text-page)"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              E-POSTA ADRESİ
            </label>
            <input
              type="email"
              value={data?.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm focus:outline-none focus:border-(--color-text-page)"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              GITHUB URL
            </label>
            <input
              type="url"
              value={data?.githubUrl || ''}
              onChange={(e) => onChange('githubUrl', e.target.value)}
              className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs focus:outline-none focus:border-(--color-text-page)"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              LINKEDIN URL
            </label>
            <input
              type="url"
              value={data?.linkedinUrl || ''}
              onChange={(e) => onChange('linkedinUrl', e.target.value)}
              className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs focus:outline-none focus:border-(--color-text-page)"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-border-page">
        <span className="block text-xs font-mono uppercase tracking-widest opacity-40">
          // {lang === 'tr' ? 'FORM METİNLERİ' : 'FORM LABELS & PLACEHOLDERS'}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'İSİM LABEL' : 'NAME LABEL'}
            </label>
            <input
              type="text"
              value={data?.nameLabel || ''}
              onChange={(e) => onChange('nameLabel', e.target.value)}
              className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'İSİM PLACEHOLDER' : 'NAME PLACEHOLDER'}
            </label>
            <input
              type="text"
              value={data?.namePlaceholder || ''}
              onChange={(e) => onChange('namePlaceholder', e.target.value)}
              className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'E-POSTA LABEL' : 'EMAIL LABEL'}
            </label>
            <input
              type="text"
              value={data?.emailLabel || ''}
              onChange={(e) => onChange('emailLabel', e.target.value)}
              className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'E-POSTA PLACEHOLDER' : 'EMAIL PLACEHOLDER'}
            </label>
            <input
              type="text"
              value={data?.emailPlaceholder || ''}
              onChange={(e) => onChange('emailPlaceholder', e.target.value)}
              className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'MESAJ LABEL' : 'MESSAGE LABEL'}
            </label>
            <input
              type="text"
              value={data?.messageLabel || ''}
              onChange={(e) => onChange('messageLabel', e.target.value)}
              className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
              {lang === 'tr' ? 'MESAJ PLACEHOLDER' : 'MESSAGE PLACEHOLDER'}
            </label>
            <input
              type="text"
              value={data?.messagePlaceholder || ''}
              onChange={(e) => onChange('messagePlaceholder', e.target.value)}
              className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'GÖNDER BUTON METNİ' : 'SUBMIT BUTTON TEXT'}
          </label>
          <input
            type="text"
            value={data?.buttonText || ''}
            onChange={(e) => onChange('buttonText', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm uppercase focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border-page">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-4 bg-(--color-bg-card) text-(--color-text-card) font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 active:scale-98 transition cursor-pointer disabled:opacity-50"
        >
          {saving
            ? (lang === 'tr' ? 'KAYDEDİLİYOR...' : 'SAVING...')
            : (lang === 'tr' ? 'KAYDET VE YAYINLA (TR)' : 'SAVE AND PUBLISH (EN)')}
        </button>
      </div>
    </form>
  )
}