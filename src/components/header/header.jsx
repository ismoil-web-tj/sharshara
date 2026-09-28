import { useEffect, useRef, useState } from 'react'

const LANGS = [
  { code: 'tj', name: 'Тоҷикӣ' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
]

const TEXTS = {
  tj: { menu: 'Меню', fav: 'Интихобшуда', search: 'Ҷустуҷӯ', searchPlaceholder: 'Ҷустуҷӯи хӯрок', clear: 'Пок кардан', language: 'Забон' },
  ru: { menu: 'Меню', fav: 'Избранное', search: 'Поиск', searchPlaceholder: 'Поиск блюда', clear: 'Очистить', language: 'Язык' },
  en: { menu: 'Menu', fav: 'Favorites', search: 'Search', searchPlaceholder: 'Search dishes', clear: 'Clear', language: 'Language' },
}

/* Иконка бургера */
function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path
        d="M12 20.5S3 15 3 8.9C3 6.2 5 4.5 7.3 4.5c1.8 0 3.5 1 4.7 2.7 1.2-1.7 2.9-2.7 4.7-2.7C19 4.5 21 6.2 21 8.9 21 15 12 20.5 12 20.5z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  )
}

function SearchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function Emblem() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6.5c2.4 3 3.6 4.9 3.6 6.6a3.6 3.6 0 0 1-7.2 0c0-1.7 1.2-3.6 3.6-6.6z" fill="#D4AF37" stroke="none" />
    </svg>
  )
}

export default function Header({
  title = 'ШАРШАРА',
  defaultLang = 'ru',
  categories = [
    { id: 'all', name: 'Все' },
    { id: 'starters', name: 'Закуски' },
    { id: 'main', name: 'Горячие' },
    { id: 'desserts', name: 'Десерты' },
    { id: 'drinks', name: 'Напитки' },
  ],
  activeCategory = 'all',
  favoritesCount = 0, // Количество товаров в избранном
  onCategoryChange,
  onLangChange,
  onOpenFavorites, // Функция при клике на избранное в меню
  onSearchChange,
}) {
  const [lang, setLang] = useState(defaultLang)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // Состояние для бургера
  
  const inputRef = useRef(null)
  const langRef = useRef(null)
  const menuRef = useRef(null)
  const t = TEXTS[lang]

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  // Закрытие выпадающих списков при клике вне их области
  useEffect(() => {
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-[#0B1312]/95 backdrop-blur-md pt-[env(safe-area-inset-top)] border-b border-[#26393A]/50">
      <div className="mx-auto max-w-[1000px] px-3 py-2">
        <div className="grid h-[48px] grid-cols-[auto_1fr_auto] items-center gap-2">
          
          {/* Слева: Кнопка Бургер с выпадающим меню */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.menu}
              className="flex h-9 items-center gap-1.5 rounded-full border border-[#26393A] bg-[#111C1B] px-3 text-[13px] font-semibold text-[#D6DCD9] transition-colors hover:border-[#D4AF37] hover:text-[#FFFFFF]"
            >
              <BurgerIcon />
              <span className="hidden min-[420px]:inline">{t.menu}</span>
            </button>

            {/* Выпадающее меню бургера */}
            {menuOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 z-40 w-[200px] overflow-hidden rounded-2xl border border-[#26393A] bg-[#111C1B] p-1.5 shadow-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onOpenFavorites?.()
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14px] text-[#D6DCD9] transition-colors hover:bg-[#182827] hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <HeartIcon filled={favoritesCount > 0} />
                    {t.fav}
                  </span>
                  {favoritesCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[11px] font-bold text-[#0B1312]">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* По центру: Золотое название и эмблема */}
          <div className="relative justify-self-center px-2">
            <h1
              className="m-0 bg-[linear-gradient(180deg,#F3E5AB_0%,#D4AF37_55%,#B08D2B_100%)] bg-clip-text text-center text-[18px] sm:text-[20px] leading-none font-bold tracking-[0.12em] whitespace-nowrap text-transparent uppercase"
              style={{ fontFamily: '"Noto Serif", Georgia, serif' }}
            >
              {title}
            </h1>
            <span className="absolute -top-[5px] -right-[10px]">
              <Emblem />
            </span>
          </div>

          {/* Справа: Поиск и Язык */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => { setSearchOpen(!searchOpen); if(searchOpen) { setQuery(''); onSearchChange?.(''); }}}
              aria-label={t.search}
              className={
                'flex h-9 w-9 items-center justify-center rounded-full border border-[#26393A] bg-[#111C1B] transition-colors ' +
                (searchOpen ? 'border-[#D4AF37] text-[#D4AF37]' : 'text-[#D6DCD9] hover:text-[#FFFFFF]')
              }
            >
              <SearchIcon size={18} />
            </button>

            {/* Выпадающий язык */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex h-9 items-center gap-1 rounded-full border border-[#26393A] bg-[#111C1B] px-2.5 text-[12px] font-semibold text-[#D6DCD9] uppercase hover:border-[#D4AF37] hover:text-[#FFFFFF]"
              >
                {lang}
                <ChevronIcon />
              </button>

              {langOpen && (
                <ul className="absolute top-[calc(100%+6px)] right-0 z-40 min-w-[120px] overflow-hidden rounded-xl border border-[#26393A] bg-[#111C1B] p-1 shadow-2xl">
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        onClick={() => { setLang(l.code); onLangChange?.(l.code); setLangOpen(false); }}
                        className={
                          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] ' +
                          (l.code === lang ? 'font-bold text-[#D4AF37]' : 'text-[#D6DCD9] hover:bg-[#182827] hover:text-white')
                        }
                      >
                        {l.name}
                        <span className="text-[10px] text-[#9FB0AD] uppercase">{l.code}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Строка поиска (выдвижная) */}
        {searchOpen && (
          <div className="relative pt-1 pb-2">
            <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9FB0AD]">
              <SearchIcon size={16} />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); onSearchChange?.(e.target.value); }}
              placeholder={t.searchPlaceholder}
              className="h-10 w-full rounded-full border border-[#26393A] bg-[#111C1B] pr-10 pl-10 text-sm text-white placeholder:text-[#9FB0AD] outline-none focus:border-[#D4AF37]"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); onSearchChange?.(''); inputRef.current?.focus(); }}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 text-[#9FB0AD] hover:text-white"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Горизонтальный скролл категорий */}
        {categories && categories.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto pt-1 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange?.(cat.id)}
                  className={
                    'shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all ' +
                    (isActive
                      ? 'bg-[#D4AF37] text-[#0B1312] font-semibold shadow-sm'
                      : 'border border-[#26393A] bg-[#111C1B] text-[#D6DCD9] hover:border-[#D4AF37] hover:text-white')
                  }
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}