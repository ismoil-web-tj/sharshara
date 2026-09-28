import { useState } from 'react'

/* ---------- Иконки для футера ---------- */
function Emblem() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6.5c2.4 3 3.6 4.9 3.6 6.6a3.6 3.6 0 0 1-7.2 0c0-1.7 1.2-3.6 3.6-6.6z" fill="#D4AF37" stroke="none" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function Footer({ title = 'ШАРШАРА' }) {
  return (
    <footer className="mt-auto border-t border-[#26393A]/50 bg-[#0B1312] text-[#D6DCD9] pt-10 pb-20 sm:pb-10">
      <div className="mx-auto max-w-[1000px] px-4">
        
        {/* Верхняя часть футера */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-[#26393A]/40 pb-8 sm:flex-row sm:items-start">
          
          {/* Бренд и лого */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="relative inline-block">
              <h2
                className="m-0 bg-[linear-gradient(180deg,#F3E5AB_0%,#D4AF37_55%,#B08D2B_100%)] bg-clip-text text-center text-[22px] font-bold tracking-[0.14em] text-transparent uppercase"
                style={{ fontFamily: '"Noto Serif", Georgia, serif' }}
              >
                {title}
              </h2>
              <span className="absolute -top-[5px] -right-[12px]">
                <Emblem />
              </span>
            </div>
            <p className="mt-2 text-center sm:text-left text-[13px] text-[#9FB0AD] max-w-[280px]">
              Премиальная кухня, традиционные рецепты и атмосфера изысканности.
            </p>
          </div>

          {/* Контакты и часы работы */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2.5 text-[#D6DCD9]">
              <span className="text-[#D4AF37]"><ClockIcon /></span>
              <span>Ежедневно с 10:00 до 00:00</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#D6DCD9]">
              <span className="text-[#D4AF37]"><PhoneIcon /></span>
              <a href="tel:+992000000000" className="hover:text-[#D4AF37] transition-colors">
                +992 (00) 000-00-00
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[#D6DCD9]">
              <span className="text-[#D4AF37]"><MapPinIcon /></span>
              <span>г. Худжанд, ул. И. Сомони</span>
            </div>
          </div>
        </div>

        {/* Нижняя строка: копирайт */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-[12px] text-[#9FB0AD] sm:flex-row">
          <p>© {new Date().getFullYear()} {title}. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-[#D4AF37] transition-colors">Политика конфиденциальности</a>
            <a href="#terms" className="hover:text-[#D4AF37] transition-colors">Условия сервиса</a>
          </div>
        </div>

      </div>
    </footer>
  )
}