import React from 'react'

export type AdminTab = 'hero' | 'about' | 'projects' | 'contact'

interface AdminSidebarProps {
  activeTab: AdminTab
  lang: 'tr' | 'en'
  onSelectTab: (tab: AdminTab) => void
}

export default function AdminSidebar({ activeTab, lang, onSelectTab }: AdminSidebarProps) {
  const tabs: { id: AdminTab; labelTr: string; labelEn: string }[] = [
    { id: 'hero', labelTr: '01. HERO BÖLÜMÜ', labelEn: '01. HERO SECTION' },
    { id: 'about', labelTr: '02. HAKKIMDA BÖLÜMÜ', labelEn: '02. ABOUT SECTION' },
    { id: 'projects', labelTr: '03. PROJELER LİSTESİ', labelEn: '03. PROJECTS LIST' },
    { id: 'contact', labelTr: '04. İLETİŞİM BÖLÜMÜ', labelEn: '04. CONTACT SECTION' },
  ]

  return (
    <aside className="lg:col-span-3 space-y-3">
      <span className="block text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 mb-2">
        // {lang === 'tr' ? 'BÖLÜMLER' : 'SECTIONS'}
      </span>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onSelectTab(tab.id)
          }}
          className={`w-full text-left p-4 font-mono text-xs uppercase tracking-widest border transition-all cursor-pointer ${
            activeTab === tab.id
              ? 'bg-(--color-bg-card) text-(--color-text-card) border-(--color-bg-card) font-bold'
              : 'border-border-page hover:border-(--color-text-page)'
          }`}
        >
          {lang === 'tr' ? tab.labelTr : tab.labelEn}
        </button>
      ))}
    </aside>
  )
}