import { useState } from 'react'

/* ---------- Иконка сердечка ---------- */
function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform active:scale-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path
        d="M12 20.5S3 15 3 8.9C3 6.2 5 4.5 7.3 4.5c1.8 0 3.5 1 4.7 2.7 1.2-1.7 2.9-2.7 4.7-2.7C19 4.5 21 6.2 21 8.9 21 15 12 20.5 12 20.5z"
        fill={filled ? '#D4AF37' : 'none'}
        stroke={filled ? '#D4AF37' : 'currentColor'}
      />
    </svg>
  )
}

/* ---------- Иконка закрытия модалки ---------- */
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

/**
 * Карточка блюда с поддержкой клика (открытие модалки) и лайка
 */
export function DishCard({ dish, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#26393A]/60 bg-[#111C1B] p-3 cursor-pointer transition-all hover:border-[#D4AF37]/50 shadow-md"
    >
      {/* Кнопка сердечка в правом верхнем углу карточки */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation() // Чтобы при клике на сердечко не открывалась модалка
          onToggleFavorite?.(dish.id)
        }}
        aria-label="Избранное"
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1312]/70 backdrop-blur-sm border border-[#26393A] text-[#D6DCD9] transition-colors hover:text-[#D4AF37]"
      >
        <HeartIcon filled={isFavorite} />
      </button>

      {/* Фото блюда */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0B1312]">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Информация о блюде */}
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-white tracking-wide uppercase line-clamp-1">
            {dish.name}
          </h3>
          <p className="mt-1 text-[12px] text-[#9FB0AD] line-clamp-2">
            {dish.description}
          </p>
        </div>

        {/* Цена и кнопка */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[16px] font-extrabold text-[#D4AF37]">
            {dish.price} ₽
          </span>
          <span className="inline-flex h-8 items-center rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 px-3 text-[12px] font-semibold text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#0B1312]">
            + Купить
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Модальное окно при нажатии на карточку
 */
export function DishModal({ dish, isOpen, isFavorite, onToggleFavorite, onClose, onAddToCart }) {
  if (!isOpen || !dish) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div 
        className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#26393A] bg-[#111C1B] p-5 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#26393A] bg-[#0B1312]/80 text-[#D6DCD9] hover:text-white"
        >
          <CloseIcon />
        </button>

        {/* Сердечко в правом верхнем углу модалки (рядом с крестиком или чуть ниже) */}
        <button
          type="button"
          onClick={() => onToggleFavorite?.(dish.id)}
          aria-label="Избранное"
          className="absolute top-4 right-15 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#26393A] bg-[#0B1312]/80 text-[#D6DCD9] transition-colors hover:text-[#D4AF37]"
        >
          <HeartIcon filled={isFavorite} />
        </button>

        {/* Большое фото в модалке */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0B1312]">
          <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
        </div>

        {/* Детали блюда */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            {dish.name}
          </h2>
          <p className="mt-2 text-sm text-[#D6DCD9] leading-relaxed">
            {dish.description}
          </p>

          {dish.weight && (
            <div className="mt-3 text-xs text-[#9FB0AD]">
              Вес: <span className="text-white font-medium">{dish.weight}</span>
            </div>
          )}
        </div>

        {/* Нижняя панель с ценой и кнопкой заказа */}
        <div className="mt-6 flex items-center justify-between border-t border-[#26393A] pt-4">
          <div>
            <span className="text-xs text-[#9FB0AD] block">Стоимость</span>
            <span className="text-2xl font-extrabold text-[#D4AF37]">
              {dish.price} ₽
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart?.(dish)
              onClose()
            }}
            className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0B1312] transition-all hover:bg-[#F3E5AB] active:scale-95"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}