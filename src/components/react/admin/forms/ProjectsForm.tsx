import React, { type FormEvent } from 'react'

export interface ProjectItem {
  title: string
  tags: string[]
  desc: string
  status?: string
  statusText?: string
}

export interface ProjectsData {
  title: string
  nextBtnText: string
  projects: ProjectItem[]
}

interface ProjectsFormProps {
  data: ProjectsData
  lang: 'tr' | 'en'
  saving: boolean
  statusMsg: { type: 'success' | 'error'; text: string } | null
  onChange: (field: keyof ProjectsData, value: any) => void
  onSave: (e: FormEvent<HTMLFormElement>) => void
}

export default function ProjectsForm({
  data,
  lang,
  saving,
  statusMsg,
  onChange,
  onSave,
}: ProjectsFormProps) {
  const updateProjectField = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...(data?.projects || [])]
    updated[index] = { ...updated[index], [field]: value }
    onChange('projects', updated)
  }

  const handleTagsChange = (index: number, rawString: string) => {
    const tagsArray = rawString.split(',').map((t) => t.trimStart())
    updateProjectField(index, 'tags', tagsArray)
  }

  const addProject = () => {
    const newProject: ProjectItem = {
      title: lang === 'tr' ? 'YENİ PROJE' : 'NEW PROJECT',
      tags: ['React', 'Tailwind CSS'],
      desc: lang === 'tr' ? 'Proje açıklaması buraya gelecek.' : 'Project description goes here.',
      status: 'active',
      statusText: lang === 'tr' ? 'AKTİF' : 'ACTIVE',
    }
    onChange('projects', [...(data?.projects || []), newProject])
  }

  const removeProject = (index: number) => {
    const updated = (data?.projects || []).filter((_, i) => i !== index)
    onChange('projects', updated)
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-border-page pb-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'BÖLÜM BAŞLIĞI' : 'SECTION TITLE'}
          </label>
          <input
            type="text"
            value={data?.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-black text-xl uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-70">
            {lang === 'tr' ? 'SONRAKİ SLİDE BUTON METNİ' : 'NEXT SLIDE BUTTON TEXT'}
          </label>
          <input
            type="text"
            value={data?.nextBtnText || ''}
            onChange={(e) => onChange('nextBtnText', e.target.value)}
            className="w-full p-4 bg-transparent border border-border-page text-(--color-text-page) font-bold text-sm uppercase focus:outline-none focus:border-(--color-text-page) transition"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-mono uppercase tracking-widest opacity-50">
            // {lang === 'tr' ? 'MERCURIAL PROJELER LİSTESİ' : 'PROJECTS LIST'} ({data?.projects?.length || 0})
          </label>
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 border border-border-page hover:border-(--color-text-page) font-mono text-xs uppercase tracking-widest transition cursor-pointer"
          >
            + {lang === 'tr' ? 'YENİ PROJE EKLE' : 'ADD NEW PROJECT'}
          </button>
        </div>

        {(data?.projects || []).map((project, idx) => (
          <div
            key={idx}
            className="p-6 border border-border-page bg-transparent space-y-6 relative group"
          >
            <div className="flex justify-between items-center border-b border-border-page pb-3">
              <span className="font-mono text-xs font-black uppercase opacity-60">
                PROJE #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeProject(idx)}
                className="px-3 py-1 border border-red-500/30 text-red-500 hover:bg-red-500/10 font-mono text-[10px] uppercase transition cursor-pointer"
              >
                {lang === 'tr' ? 'PROJEYİ SİL' : 'DELETE PROJECT'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 space-y-1">
                <label className="block text-[10px] font-mono uppercase opacity-60">PROJE BAŞLIĞI</label>
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => updateProjectField(idx, 'title', e.target.value)}
                  className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-black text-lg uppercase focus:outline-none focus:border-(--color-text-page)"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="block text-[10px] font-mono uppercase opacity-60">STATUS TYPE</label>
                <select
                  value={project.status || 'active'}
                  onChange={(e) => updateProjectField(idx, 'status', e.target.value)}
                  className="w-full p-3 bg-(--color-bg-page) border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
                >
                  <option value="active">Active (Yeşil)</option>
                  <option value="processing">Processing (Turuncu)</option>
                  <option value="none">Yok / Gizli</option>
                </select>
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="block text-[10px] font-mono uppercase opacity-60">STATUS TEXT</label>
                <input
                  type="text"
                  value={project.statusText || ''}
                  onChange={(e) => updateProjectField(idx, 'statusText', e.target.value)}
                  placeholder="Örn: AKTİF / UPDATING"
                  className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase opacity-60">
                ETİKETLER (Virgülle ayırın: Astro, React, Tailwind CSS)
              </label>
              <input
                type="text"
                value={(project.tags || []).join(', ')}
                onChange={(e) => handleTagsChange(idx, e.target.value)}
                className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-mono text-xs uppercase focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase opacity-60">PROJE AÇIKLAMASI</label>
              <textarea
                rows={3}
                value={project.desc || ''}
                onChange={(e) => updateProjectField(idx, 'desc', e.target.value)}
                className="w-full p-3 bg-transparent border border-border-page text-(--color-text-page) font-medium text-xs uppercase focus:outline-none resize-y"
                required
              />
            </div>
          </div>
        ))}
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