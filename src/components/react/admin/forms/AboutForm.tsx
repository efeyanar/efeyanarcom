import React, { type FormEvent } from 'react'

export interface AboutData {
  title: string
  text: string
  locationTitle: string
  location: string
  specializationTitle: string
  expertise: string[]
  navAboutLabel?: string 
}

interface AboutFormProps {
  data: AboutData
  lang: 'tr' | 'en'
  saving: boolean
  statusMsg: { type: 'success' | 'error'; text: string } | null
  onChange: (field: keyof AboutData, value: any) => void
  onSave: (e: FormEvent<HTMLFormElement>) => void
}

export default function AboutForm({
  data,
  lang,
  saving,
  statusMsg,
  onChange,
  onSave,
}: AboutFormProps) {
  const handleExpertiseChange = (index: number, val: string) => {
    const updated = [...(data?.expertise || [])]
    updated[index] = val
    onChange('expertise', updated)
  }

  const addExpertiseItem = () => {
    onChange('expertise', [...(data?.expertise || []), ''])
  }

  const removeExpertiseItem = (index: number) => {
    const updated = (data?.expertise || []).filter((_, i) => i !== index)
    onChange('expertise', updated)
  }

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
            {lang === 'tr' ? 'SİTE İÇİ BÖLÜM BAŞLIĞI' : 'SECTION TITLE'}
          </label>
          <input
            type="text"
            value={data?.title || ''}
            onChange={(e) => {
              const val = e.target.value
              onChange('title', val)
              if (!data.navAboutLabel) {
                onChange('navAboutLabel', val)
              }
            }}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-black text-xl uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'NAVBAR MENÜ ADI' : 'NAVBAR MENU LABEL'}
          </label>
          <input
            type="text"
            value={data?.navAboutLabel || data?.title || ''}
            onChange={(e) => onChange('navAboutLabel', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-base uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
          {lang === 'tr' ? 'HAKKIMDA AÇIKLAMA METNİ' : 'ABOUT DESCRIPTION TEXT'}
        </label>
        <textarea
          rows={4}
          value={data?.text || ''}
          onChange={(e) => onChange('text', e.target.value)}
          className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-medium text-sm focus:outline-none focus:border-(--color-text-page) transition leading-relaxed resize-y uppercase"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'LOKASYON BAŞLIĞI' : 'LOCATION TITLE'}
          </label>
          <input
            type="text"
            value={data?.locationTitle || ''}
            onChange={(e) => onChange('locationTitle', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'LOKASYON DEĞERİ' : 'LOCATION VALUE'}
          </label>
          <input
            type="text"
            value={data?.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border-page">
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'UZMANLIK ALANLARI BAŞLIĞI' : 'SPECIALIZATION TITLE'}
          </label>
          <input
            type="text"
            value={data?.specializationTitle || ''}
            onChange={(e) => onChange('specializationTitle', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-50">
            {lang === 'tr' ? '// UZMANLIK MADDELERİ' : '// SPECIALIZATION ITEMS'}
          </label>

          {(data?.expertise || []).map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input
                type="text"
                value={item}
                onChange={(e) => handleExpertiseChange(idx, e.target.value)}
                placeholder={`Madde #${idx + 1}`}
                className="flex-1 p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none focus:border-(--color-text-page) transition"
                required
              />
              <button
                type="button"
                onClick={() => removeExpertiseItem(idx)}
                className="px-4 py-3 border border-red-500/30 text-red-500 hover:bg-red-500/10 font-mono text-xs uppercase transition cursor-pointer"
              >
                {lang === 'tr' ? 'SİL' : 'DELETE'}
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addExpertiseItem}
            className="px-4 py-3 border border-dashed border-border-page hover:border-(--color-text-page) font-mono text-xs uppercase tracking-widest transition cursor-pointer mt-2 block"
          >
            + {lang === 'tr' ? 'YENİ UZMANLIK MADDESİ EKLE' : 'ADD NEW ITEM'}
          </button>
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