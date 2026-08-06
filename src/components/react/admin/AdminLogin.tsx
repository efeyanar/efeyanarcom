import React, { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase/client'
import AdminHeader from './AdminHeader'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)
  
  const [lang, setLang] = useState<'tr' | 'en'>('tr')
  const [isDark, setIsDark] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function checkAlreadyLoggedIn() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        window.location.replace('/admin')
      }
    }
    checkAlreadyLoggedIn()
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

  const checkCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const capsLockState = e.getModifierState && e.getModifierState('CapsLock')
    setIsCapsLockOn(capsLockState)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('SUPABASE AUTH HATA DETAYI:', error)
      setErrorMsg(lang === 'tr' ? `Hata: ${error.message}` : `Error: ${error.message}`)
      setLoading(false)
    } else {
      window.location.replace('/admin')
    }
  }

  return (
    <div className="min-h-dvh bg-(--color-bg-page) text-(--color-text-page) flex flex-col justify-between transition-colors duration-300">
      
      <AdminHeader
        lang={lang}
        isDark={isDark}
        onToggleLang={() => setLang((prev) => (prev === 'tr' ? 'en' : 'tr'))}
        onToggleTheme={toggleTheme}
        isLogin={true}
      />

      <main className="w-full max-w-xl mx-auto my-auto px-6 py-8 sm:py-12">
        
        <div className="space-y-3 mb-8 sm:mb-10 text-left">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            ADMIN<span className="text-red-500">.</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] opacity-70 leading-relaxed">
            {lang === 'tr' 
              ? 'KONTROL PANELİNE ERİŞİM İÇİN YETKİLİ GİRİŞİ YAPIN' 
              : 'AUTHENTICATE FOR CONTROL PANEL ACCESS'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-xs sm:text-sm font-mono uppercase tracking-widest break-words">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest opacity-90">
              {lang === 'tr' ? 'E-POSTA' : 'EMAIL ADDRESS'}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ADMIN@MAIL.COM"
              autoComplete="username"
              className="w-full p-4 sm:p-5 bg-transparent border border-border-page text-(--color-text-page) text-base font-medium placeholder:opacity-30 focus:outline-none focus:border-(--color-text-page) transition-all rounded-none"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest opacity-90">
                {lang === 'tr' ? 'ŞİFRE' : 'PASSWORD'}
              </label>

              {isCapsLockOn && (
                <span className="text-xs uppercase tracking-wider text-amber-500 font-bold animate-pulse">
                  ⚠️ CAPS LOCK {lang === 'tr' ? 'AÇIK' : 'ON'}
                </span>
              )}
            </div>

            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={checkCapsLock}
              onKeyDown={checkCapsLock}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className={`w-full p-4 sm:p-5 bg-transparent border text-(--color-text-page) text-base font-medium placeholder:opacity-30 focus:outline-none transition-all rounded-none ${
                isCapsLockOn 
                  ? 'border-amber-500/60 focus:border-amber-500' 
                  : 'border-border-page focus:border-(--color-text-page)'
              }`}
              required
            />

            {isCapsLockOn && (
              <p className="text-xs text-amber-500/90 tracking-wide mt-1 font-medium">
                {lang === 'tr' 
                  ? 'Dikkat: Klavyenizde Caps Lock açık durumda.' 
                  : 'Warning: Caps Lock is active on your keyboard.'}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 sm:py-6 bg-(--color-bg-card) text-(--color-text-card) font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer mt-6 disabled:opacity-50"
          >
            {loading 
              ? (lang === 'tr' ? 'KONTROL EDİLİYOR...' : 'AUTHENTICATING...') 
              : (lang === 'tr' ? 'SİSTEME GİRİŞ YAP →' : 'LOG IN TO SYSTEM →')}
          </button>
        </form>
      </main>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-border-page px-6 sm:px-12 py-5 text-xs font-mono uppercase tracking-widest opacity-50 text-center sm:text-left">
        <span>RESTRICTED ACCESS</span>
        <span>EFE YANAR © 2026</span>
      </footer>

    </div>
  )
}