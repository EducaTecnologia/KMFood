import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  X,
  Check,
  Search,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const CategoryPageView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategorySlug,
    setSelectedCategorySlug,
    setActiveView
  } = useApp();

  const [sortOption, setSortOption] = useState<'relevance' | 'price_asc' | 'price_desc' | 'discount'>('relevance');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentCategory = categories.find((c) => c.slug === selectedCategorySlug) || categories[0];

  // Subcategories available in this category
  const subcategories = useMemo(() => {
    const list = products
      .filter((p) => p.categoryId === currentCategory.id)
      .map((p) => p.subcategory);
    return Array.from(new Set(list));
  }, [products, currentCategory.id]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.categoryId === currentCategory.id);

    if (selectedSubcategory) {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
    }
    if (onlyOrganic) {
      list = list.filter((p) => p.isOrganic);
    }
    if (onlyPromo) {
      list = list.filter((p) => p.isPromo);
    }
    if (onlyInStock) {
      list = list.filter((p) => p.stock > 0);
    }

    if (sortOption === 'price_asc') {
      list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (sortOption === 'price_desc') {
      list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    } else if (sortOption === 'discount') {
      list.sort((a, b) => (b.isPromo ? 1 : 0) - (a.isPromo ? 1 : 0));
    }

    return list;
  }, [products, currentCategory.id, selectedSubcategory, onlyOrganic, onlyPromo, onlyInStock, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
        <button
          onClick={() => {
            setSelectedCategorySlug(null);
            setActiveView('ecommerce');
          }}
          className="hover:text-emerald-800 transition-colors"
        >
          Início
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-400">Mercados & Agro</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-semibold text-stone-900">{currentCategory.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 mb-6 shadow-md">
        <div className="relative z-10 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
            Departamento Oficial
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            {currentCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            {currentCategory.description}
          </p>
          <div className="mt-3 text-xs text-emerald-200">
            <strong>{filteredProducts.length}</strong> produtos disponíveis para entrega rápida.
          </div>
        </div>
      </div>

      {/* Layout: Sidebar Filter (Desktop) + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-display font-bold text-sm text-stone-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                Filtros do Campo
              </h3>
              {(selectedSubcategory || onlyOrganic || onlyPromo) && (
                <button
                  onClick={() => {
                    setSelectedSubcategory(null);
                    setOnlyOrganic(false);
                    setOnlyPromo(false);
                  }}
                  className="text-[11px] text-emerald-700 hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Subcategories */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-stone-700 mb-2">Subcategorias</p>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedSubcategory === null
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Todas</span>
                  <span className="text-[10px] text-stone-400 font-mono-numbers">
                    {products.filter((p) => p.categoryId === currentCategory.id).length}
                  </span>
                </button>
                {subcategories.map((sub) => {
                  const count = products.filter(
                    (p) => p.categoryId === currentCategory.id && p.subcategory === sub
                  ).length;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub === selectedSubcategory ? null : sub)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedSubcategory === sub
                          ? 'bg-emerald-50 text-emerald-900 font-semibold'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      <span className="text-[10px] text-stone-400 font-mono-numbers">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyOrganic}
                  onChange={(e) => setOnlyOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500 accent-emerald-700"
                />
                <span>Apenas Alimentos Orgânicos</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyPromo}
                  onChange={(e) => setOnlyPromo(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500 accent-emerald-700"
                />
                <span>Apenas Ofertas & Promoções</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500 accent-emerald-700"
                />
                <span>Em estoque imediato</span>
              </label>
            </div>

            {/* Other categories shortcut */}
            <div className="mt-6 pt-4 border-t border-stone-100">
              <p className="text-xs font-semibold text-stone-700 mb-2">Outros Departamentos</p>
              <div className="space-y-1">
                {categories
                  .filter((c) => c.id !== currentCategory.id)
                  .slice(0, 5)
                  .map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategorySlug(cat.slug)}
                      className="w-full text-left text-xs px-2 py-1 text-stone-500 hover:text-emerald-800 hover:bg-stone-50 rounded transition-colors truncate"
                    >
                      {cat.name}
                    </button>
                  ))}
              </div>
            </div>

          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <main className="col-span-1 lg:col-span-3">
          
          {/* Controls Bar: Mobile filter button + sorting selector */}
          <div className="flex items-center justify-between gap-2 mb-4 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-xs font-semibold text-stone-800 hover:bg-stone-200"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrar</span>
              {(selectedSubcategory || onlyOrganic || onlyPromo) && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>

            {/* Product count display */}
            <span className="hidden sm:inline text-xs text-stone-500">
              Mostrando <strong className="text-stone-900 font-mono-numbers">{filteredProducts.length}</strong> produtos
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 hidden sm:inline">Ordenar por:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-stone-100 border border-stone-200 text-xs rounded-xl px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="discount">Maior Desconto</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {(selectedSubcategory || onlyOrganic || onlyPromo) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs text-stone-400">Filtros ativos:</span>
              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                  {selectedSubcategory}
                  <button onClick={() => setSelectedSubcategory(null)}>
                    <X className="w-3 h-3 hover:text-emerald-700" />
                  </button>
                </span>
              )}
              {onlyOrganic && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                  Orgânicos
                  <button onClick={() => setOnlyOrganic(false)}>
                    <X className="w-3 h-3 hover:text-emerald-700" />
                  </button>
                </span>
              )}
              {onlyPromo && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                  Em Promoção
                  <button onClick={() => setOnlyPromo(false)}>
                    <X className="w-3 h-3 hover:text-emerald-700" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid: 2 cols on mobile, 3 cols tablet, 3-4 on desktop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center my-6">
              <Search className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-display font-bold text-base text-stone-800">
                Nenhum produto encontrado com estes filtros
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Tente desmarcar alguns filtros como orgânicos ou promoções para ver todos os itens da colheita.
              </p>
              <button
                onClick={() => {
                  setSelectedSubcategory(null);
                  setOnlyOrganic(false);
                  setOnlyPromo(false);
                }}
                className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}

        </main>
      </div>

      {/* MOBILE BOTTOM SHEET FOR FILTERS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="bg-white w-full rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-stone-900">Filtros do Campo</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-stone-800 mb-2">Subcategorias</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      selectedSubcategory === null
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    Todas
                  </button>
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub === selectedSubcategory ? null : sub)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        selectedSubcategory === sub
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-3">
                <label className="flex items-center gap-3 text-xs text-stone-800">
                  <input
                    type="checkbox"
                    checked={onlyOrganic}
                    onChange={(e) => setOnlyOrganic(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
                  />
                  <span>Apenas Alimentos Orgânicos</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-stone-800">
                  <input
                    type="checkbox"
                    checked={onlyPromo}
                    onChange={(e) => setOnlyPromo(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
                  />
                  <span>Apenas Ofertas & Promoções</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl"
              >
                Ver {filteredProducts.length} Produtos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
