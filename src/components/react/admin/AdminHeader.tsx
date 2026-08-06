import React from 'react'

interface AdminHeaderProps {
  lang: 'tr' | 'en'
  isDark: boolean
  onToggleLang: () => void
  onToggleTheme: () => void
  onLogout?: () => void
  isLogin?: boolean
}

export default function AdminHeader({
  lang,
  isDark,
  onToggleLang,
  onToggleTheme,
  onLogout,
  isLogin = false,
}: AdminHeaderProps) {
  return (
    <header className="w-full border-b border-border-page px-4 sm:px-12 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-bg-page transition-colors duration-300">
      
      <div className="flex items-center justify-between w-full sm:w-auto">
        <a href="/" className="text-lg font-black uppercase tracking-tighter text-text-page hover:opacity-70 transition-opacity">
          EFEYANAR<span className="text-red-500">.</span>COM
        </a>
        <span className="text-xs font-mono uppercase tracking-widest opacity-40 pl-2">
          / {isLogin ? 'AUTH' : 'PANEL'}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto border-t sm:border-t-0 border-border-page/40 pt-3 sm:pt-0">

        {isLogin && (
          <a
            href="/"
            className="text-[10px] sm:text-xs font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
          >
            [ {lang === 'tr' ? '← SİTEYE DÖN' : '← BACK TO SITE'} ]
          </a>
        )}
        
        <button
          type="button"
          onClick={onToggleLang}
          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-border-page text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest hover:bg-bg-card hover:text-text-card transition-all cursor-pointer"
        >
          {lang === 'tr' ? 'EN' : 'TR'}
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-border-page text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest hover:bg-bg-card hover:text-text-card transition-all cursor-pointer"
        >
          {isDark ? (lang === 'tr' ? 'LIGHT ☀️' : 'LIGHT ☀️') : (lang === 'tr' ? 'DARK 🌙' : 'DARK 🌙')}
        </button>

        {!isLogin && (
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              [ {lang === 'tr' ? 'SİTEYİ GÖR' : 'LIVE SITE'} ]
            </a>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-red-500 font-bold hover:underline cursor-pointer"
              >
                [ {lang === 'tr' ? 'ÇIKIŞ' : 'LOGOUT'} ]
              </button>
            )}
          </div>
        )}
      </div>

    </header>
  )
}