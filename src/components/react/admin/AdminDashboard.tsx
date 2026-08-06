import React, { useState, useEffect, type FormEvent } from 'react'
import { createClient } from '../../../lib/supabase/client'
import AdminHeader from './AdminHeader'
import AdminSidebar, { type AdminTab } from './AdminSidebar'
import HeroForm, { type HeroData } from './forms/HeroForm'
import AboutForm, { type AboutData } from './forms/AboutForm'
import ProjectsForm, { type ProjectsData } from './forms/ProjectsForm'
import ContactForm, { type ContactData } from './forms/ContactForm'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('hero')
  const [lang, setLang] = useState<'tr' | 'en'>('tr')
  const [isDark, setIsDark] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [heroData, setHeroData] = useState<Record<'tr' | 'en', HeroData>>({
    tr: { name: 'EFE', surname: 'YANAR', job: 'FRONTEND DEVELOPER', exploreText: 'KEŞFET' },
    en: { name: 'EFE', surname: 'YANAR', job: 'FRONTEND DEVELOPER', exploreText: 'EXPLORE' },
  })

  const [aboutData, setAboutData] = useState<Record<'tr' | 'en', AboutData>>({
    tr: {
      title: 'HAKKIMDA',
      text: 'Frontend geliştirme alanında çalışan, modern web arayüzleri geliştiren bir yazılım geliştiricisiyim. Component tabanlı mimari, design system yaklaşımı ve kullanıcı deneyimi odaklı geliştirme süreçlerine önem veriyorum.',
      locationTitle: 'LOKASYON',
      location: 'İstanbul, TR',
      specializationTitle: 'UZMANLIK ALANLARI',
      expertise: ['Frontend Mimarisi', 'Tasarım Sistemleri', 'Bileşen Tabanlı UI', 'Web Otomasyonu', 'UX / Mikro Etkileşimler'],
    },
    en: {
      title: 'ABOUT ME',
      text: 'I am a software developer specializing in frontend development and modern web interfaces. I focus on component-based architecture, design system approaches, and user experience-oriented development processes.',
      locationTitle: 'LOCATION',
      location: 'Istanbul, TR',
      specializationTitle: 'SPECIALIZATION',
      expertise: ['Frontend Architecture', 'Design Systems', 'Component-Based UI', 'Web Automation', 'UX / Micro-interactions'],
    },
  })

  const [projectsData, setProjectsData] = useState<Record<'tr' | 'en', ProjectsData>>({
    tr: {
      title: 'SEÇİLİ PROJELER',
      nextBtnText: 'SIRADAKİ',
      projects: [
        {
          title: 'EFEYANAR.COM',
          tags: ['Astro', 'React', 'Tailwind CSS'],
          status: 'active',
          statusText: 'AKTİF',
          desc: 'Çoklu dil desteği, özel karanlık mod mimarisi, sıfır harici kütüphane yaklaşımı ve akışkan animasyonlara sahip, performansı ön planda tutan kişisel portfolyo web sitesi.',
        },
        {
          title: 'ÜNİVERSİTE OBS TAKİP SİSTEMİ',
          tags: ['Node.js', 'Playwright', 'Telegram'],
          status: 'processing',
          statusText: 'GÜNCELLENİYOR',
          desc: 'Öğrenci Bilgi Sistemi\'ni (OBS) arka planda anlık olarak tarayan, not değişikliklerini saliseler içinde tespit edip Telegram üzerinden otomatik bildirim gönderen yüksek performanslı otomasyon sistemi.',
        },
        {
          title: 'DİNAMİK PORTFOLYO & .NET ADMIN PANEL',
          tags: ['.NET', 'C#'],
          status: 'active',
          statusText: 'AKTİF',
          desc: 'Dinamik içerik ve proje yönetimi için .NET mimarisiyle geliştirilmiş, gelişmiş bir admin paneline sahip web platformu. Veri akışı ve arayüz entegrasyonu modern frontend prensipleriyle optimize edilmiştir.',
        },
      ],
    },
    en: {
      title: 'SELECTED PROJECTS',
      nextBtnText: 'NEXT',
      projects: [
        {
          title: 'EFEYANAR.COM',
          tags: ['Astro', 'React', 'Tailwind CSS'],
          status: 'active',
          statusText: 'ACTIVE',
          desc: 'A high-performance personal portfolio website featuring native multi-language support, custom dark mode, a zero-external-library approach, and fluid animations.',
        },
        {
          title: 'UNIVERSITY SIS TRACKER',
          tags: ['Node.js', 'Playwright', 'Telegram'],
          status: 'processing',
          statusText: 'UPDATING',
          desc: 'An advanced automation system that tracks the Student Information System (SIS) in real-time, instantly detecting grade changes and delivering automated alerts via a Telegram bot.',
        },
        {
          title: 'DYNAMIC PORTFOLIO & .NET ADMIN PANEL',
          tags: ['.NET', 'C#'],
          status: 'active',
          statusText: 'ACTIVE',
          desc: 'A dynamic web platform featuring an advanced admin panel built with .NET architecture for full content management, with data flow and UI rendering fully optimized using modern frontend principles.',
        },
      ],
    },
  })

  const [contactData, setContactData] = useState<Record<'tr' | 'en', ContactData>>({
    tr: {
      title: 'İLETİŞİM',
      email: 'hello@efeyanar.com',
      githubUrl: 'https://github.com/efeyanar',
      linkedinUrl: 'https://linkedin.com/in/efe-yanar',
      nameLabel: 'İSİM',
      namePlaceholder: 'ADINIZ',
      emailLabel: 'E-POSTA',
      emailPlaceholder: 'EMAIL@ADRES.COM',
      messageLabel: 'MESAJINIZ',
      messagePlaceholder: 'PROJENİZDEN BAHSEDİN...',
      buttonText: 'MESAJI GÖNDER →',
    },
    en: {
      title: 'CONTACT',
      email: 'hello@efeyanar.com',
      githubUrl: 'https://github.com/efeyanar',
      linkedinUrl: 'https://linkedin.com/in/efe-yanar',
      nameLabel: 'NAME',
      namePlaceholder: 'YOUR NAME',
      emailLabel: 'E-MAIL',
      emailPlaceholder: 'EMAIL@ADDRESS.COM',
      messageLabel: 'YOUR MESSAGE',
      messagePlaceholder: 'TELL ME ABOUT YOUR PROJECT...',
      buttonText: 'SEND MESSAGE →',
    },
  })

  const supabase = createClient()

  useEffect(() => {
    async function initDashboard() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          window.location.replace('/admin/login')
          return
        }

        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .in('key', [
            'hero_data_tr',
            'hero_data_en',
            'about_data_tr',
            'about_data_en',
            'projects_data_tr',
            'projects_data_en',
            'contact_data_tr',
            'contact_data_en',
          ])

        if (error) throw error

        if (data && data.length > 0) {
          const fetchedHero = { ...heroData }
          const fetchedAbout = { ...aboutData }
          const fetchedProjects = { ...projectsData }
          const fetchedContact = { ...contactData }

          data.forEach((item) => {
            if (item.key === 'hero_data_tr') fetchedHero.tr = item.content
            if (item.key === 'hero_data_en') fetchedHero.en = item.content
            if (item.key === 'about_data_tr') fetchedAbout.tr = item.content
            if (item.key === 'about_data_en') fetchedAbout.en = item.content
            if (item.key === 'projects_data_tr') fetchedProjects.tr = item.content
            if (item.key === 'projects_data_en') fetchedProjects.en = item.content
            if (item.key === 'contact_data_tr') fetchedContact.tr = item.content
            if (item.key === 'contact_data_en') fetchedContact.en = item.content
          })

          setHeroData(fetchedHero)
          setAboutData(fetchedAbout)
          setProjectsData(fetchedProjects)
          setContactData(fetchedContact)
        }
      } catch (err: any) {
        console.error('SUPABASE İŞLEM HATASI:', err)
      } finally {
        setLoading(false)
      }
    }

    initDashboard()
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) || document.documentElement.classList.contains('dark')

    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDark
    setIsDark(nextTheme)
    if (nextTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
    window.location.replace('/admin/login')
  }

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setStatusMsg(null)

    let dbKey = `hero_data_${lang}`
    let contentToSave: any = heroData[lang]

    if (activeTab === 'about') {
      dbKey = `about_data_${lang}`
      contentToSave = aboutData[lang]
    } else if (activeTab === 'projects') {
      dbKey = `projects_data_${lang}`
      contentToSave = projectsData[lang]
    } else if (activeTab === 'contact') {
      dbKey = `contact_data_${lang}`
      contentToSave = contactData[lang]
    }

    try {
      const { error } = await supabase.from('site_content').upsert(
        {
          key: dbKey,
          content: contentToSave,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )

      if (error) throw error

      setStatusMsg({
        type: 'success',
        text: lang === 'tr' ? `[${lang.toUpperCase()}] BİLGİLERİ BAŞARIYLA KAYDEDİLDİ!` : `[${lang.toUpperCase()}] DATA SAVED SUCCESSFULLY!`,
      })

      setTimeout(() => setStatusMsg(null), 4000)
    } catch (err: any) {
      console.error('KAYIT HATASI:', err)
      setStatusMsg({
        type: 'error',
        text: (lang === 'tr' ? 'KAYIT BAŞARISIZ: ' : 'SAVE FAILED: ') + (err.message || 'Hata oluştu'),
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-(--color-bg-page) text-(--color-text-page) flex items-center justify-center font-mono text-xs uppercase tracking-[0.3em] p-4 text-center">
        {lang === 'tr' ? 'OTURUM VE VERİLER KONTROL EDİLİYOR...' : 'CHECKING AUTH & DATA...'}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-(--color-bg-page) text-(--color-text-page) transition-colors duration-300">
      <AdminHeader
        lang={lang}
        isDark={isDark}
        onToggleLang={() => {
          setLang((prev) => (prev === 'tr' ? 'en' : 'tr'))
          setStatusMsg(null)
        }}
        onToggleTheme={toggleTheme}
        onLogout={handleLogout}
        isLogin={false}
      />

      <div className="px-4 sm:px-6 md:px-12 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
        <AdminSidebar 
          activeTab={activeTab} 
          lang={lang}
          onSelectTab={(tab) => { 
            setActiveTab(tab)
            setStatusMsg(null)
          }} 
        />

        <main className="lg:col-span-9">
          <div className="border border-border-page p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-border-page pb-4">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider">
                  {activeTab === 'hero' && (lang === 'tr' ? 'HERO BÖLÜMÜ AYARLARI' : 'HERO SECTION CONFIG')}
                  {activeTab === 'about' && (lang === 'tr' ? 'HAKKIMDA BÖLÜMÜ AYARLARI' : 'ABOUT SECTION CONFIG')}
                  {activeTab === 'projects' && (lang === 'tr' ? 'PROJELER AYARLARI' : 'PROJECTS CONFIG')}
                  {activeTab === 'contact' && (lang === 'tr' ? 'İLETİŞİM BÖLÜMÜ AYARLARI' : 'CONTACT SECTION CONFIG')}
                </h2>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest opacity-50 mt-1">
                  {lang === 'tr' ? 'DÜZENLENEN DİL: ' : 'EDITING LANGUAGE: '}
                  <span className="font-bold underline">{lang === 'tr' ? 'TÜRKÇE (TR)' : 'ENGLISH (EN)'}</span>
                </p>
              </div>
              <span className="self-start sm:self-auto text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-border-page">
                ACTIVE LANG: {lang.toUpperCase()}
              </span>
            </div>

            {activeTab === 'hero' && (
              <HeroForm
                data={heroData[lang]}
                lang={lang}
                saving={saving}
                statusMsg={statusMsg}
                onChange={(field, val) =>
                  setHeroData((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: val } }))
                }
                onSave={handleSave}
              />
            )}

            {activeTab === 'about' && (
              <AboutForm
                data={aboutData[lang]}
                lang={lang}
                saving={saving}
                statusMsg={statusMsg}
                onChange={(field, val) =>
                  setAboutData((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: val } }))
                }
                onSave={handleSave}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsForm
                data={projectsData[lang]}
                lang={lang}
                saving={saving}
                statusMsg={statusMsg}
                onChange={(field, val) =>
                  setProjectsData((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: val } }))
                }
                onSave={handleSave}
              />
            )}

            {activeTab === 'contact' && (
              <ContactForm
                data={contactData[lang]}
                lang={lang}
                saving={saving}
                statusMsg={statusMsg}
                onChange={(field, val) =>
                  setContactData((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: val } }))
                }
                onSave={handleSave}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}