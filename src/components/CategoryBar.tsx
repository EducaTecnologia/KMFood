import React from 'react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

export const CategoryBar: React.FC = () => {
  const { categories, selectedCategorySlug, setSelectedCategorySlug, setActiveView } = useApp();

  const handleSelectCategory = (category: Category) => {
    setSelectedCategorySlug(category.slug);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 tracking-tight">
            Departamentos do Campo & Mercado
          </h2>
          <p className="text-xs text-stone-500">
            Navegue pelas safras de produtores agroecológicos e itens essenciais
          </p>
        </div>
      </div>

      {/* Responsive Horizontal Slider / Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategorySlug === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat)}
              className={`group flex flex-col items-center text-center p-2.5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                  : 'bg-white hover:bg-stone-50 border-stone-200/80 hover:border-emerald-300 shadow-xs'
              }`}
            >
              {/* Category Thumbnail */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-stone-100 mb-2 relative shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Category Name */}
              <span className="text-[11px] sm:text-xs font-semibold text-stone-800 group-hover:text-emerald-900 line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">
                {cat.itemCount} itens
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
