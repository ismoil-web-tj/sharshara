import { useState } from 'react'
import Header from './components/header/header'
import { DishCard, DishModal } from './components/hero/hero'
import Footer from './components/footer/footer'

// Пример массива блюд (можете заменить на свои данные или API)
const MOCK_DISHES = [
  {
    id: 1,
    name: 'ПЛОВ ПРАЗДНИЧНЫЙ',
    description: 'Рис, баранина, морковь, нут',
    price: 450,
    weight: '350 г',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80',
    category: 'main'
  },
  {
    id: 2,
    name: 'ПЛОВ ПРАЗДНИЧНЫЙ',
    description: 'Рис, баранина, изюм, специи',
    price: 450,
    weight: '350 г',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80',
    category: 'main'
  },
  {
    id: 3,
    name: 'ШАШЛЫК АССОРТИ',
    description: 'Люля-кебаб, баранина, курица, овощи гриль',
    price: 790,
    weight: '450 г',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    category: 'main'
  },
  {
    id: 4,
    name: 'САЛАТ АЧИЧУК',
    description: 'Свежие томаты, лук, острый перец',
    price: 220,
    weight: '180 г',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    category: 'starters'
  }
]

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState([]) // Массив ID избранных товаров
  const [selectedDish, setSelectedDish] = useState(null) // Блюдо для модального окна

  // Переключение избранного (лайк / дизлайк)
  const handleToggleFavorite = (dishId) => {
    setFavorites((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    )
  }

  // Фильтрация блюд по категории и поиску
  const filteredDishes = MOCK_DISHES.filter((dish) => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#071719] text-[#F5F1E8]">
      {/* Шапка с передачей количества избранных */}
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        favoritesCount={favorites.length}
        onSearchChange={setSearchQuery}
        onOpenFavorites={() => {
          // Здесь можно сделать фильтрацию по избранному или открыть шторку избранного
          setActiveCategory('all')
        }}
      />

      {/* Основной контент (каталог блюд) */}
      <main className="mx-auto max-w-[1000px] px-3 py-4">
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={handleToggleFavorite}
                onClick={() => setSelectedDish(dish)} // Открытие модалки по клику на карточку
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-[#91A5A5]">
            Блюда не найдены
          </div>
        )}
      </main>

      {/* Модальное окно детального просмотра блюда */}
      <DishModal
        dish={selectedDish}
        isOpen={Boolean(selectedDish)}
        isFavorite={selectedDish ? favorites.includes(selectedDish.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(dish) => {
          console.log('Добавлено в корзину:', dish)
        }}
      />
      <Footer/>
    </div>
  )
}