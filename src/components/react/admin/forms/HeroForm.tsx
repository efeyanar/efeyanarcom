import React, { type FormEvent } from 'react'

export interface HeroData {
  name: string
  surname: string
  job: string
  exploreText: string
}

interface HeroFormProps {
  data: HeroData
  lang: 'tr' | 'en'
  saving: boolean
  statusMsg: { type: 'success' | 'error'; text: string } | null
  onChange: (field: keyof HeroData, value: string) => void
  onSave: (e: FormEvent<HTMLFormElement>) => void
}

export default function HeroForm({
  data,
  lang,
  saving,
  statusMsg,
  onChange,
  onSave,
}: HeroFormProps) {
  return (
    <form onSubmit={onSave} className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'İSİM' : 'FIRST NAME'}
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-black text-xl uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'SOYİSİM' : 'LAST NAME'}
          </label>
          <input
            type="text"
            value={data.surname || ''}
            onChange={(e) => onChange('surname', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-black text-xl uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
          {lang === 'tr' ? 'UNVAN (DAKTİLO ANİMASYONU)' : 'JOB TITLE (TYPEWRITER)'}
        </label>
        <input
          type="text"
          value={data.job || ''}
          onChange={(e) => onChange('job', e.target.value)}
          className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-base uppercase tracking-widest focus:outline-none focus:border-(--color-text-page) transition"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
          {lang === 'tr' ? 'KEŞFET BUTON METNİ' : 'EXPLORE BUTTON TEXT'}
        </label>
        <input
          type="text"
          value={data.exploreText || ''}
          onChange={(e) => onChange('exploreText', e.target.value)}
          className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm uppercase tracking-widest focus:outline-none focus:border-(--color-text-page) transition"
          required
        />
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