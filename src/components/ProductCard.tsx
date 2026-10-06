import React from 'react';
import { Plus, Minus, Star, ShieldCheck, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { cart, addToCart, updateCartQuantity, openProductDetail, t } = useApp();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const currentPrice = product.salePrice ?? product.price;
  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Discount / Tag Header */}
      {hasDiscount && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-emerald-700 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs font-mono-numbers">
            -{discountPercent}%
          </span>
        </div>
      )}

      {/* Product Image on Neutral Solid Backdrop */}
      <div
        onClick={() => openProductDetail(product)}
        className="w-full aspect-[4/3] bg-stone-100/70 overflow-hidden relative cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Body Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Metadata: Origin · Unit · Organic */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 mb-1 flex-wrap">
            <span className="text-emerald-800 font-medium truncate max-w-[130px]">{product.producer}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{product.weightValue}</span>
            {product.isOrganic && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-emerald-700 font-medium">{t.organic}</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(product)}
            className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-emerald-900 line-clamp-2 cursor-pointer transition-colors leading-snug min-h-[32px] sm:min-h-[36px]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Location & Rating */}
          <div className="mt-1.5 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500">
            <span className="flex items-center gap-1 truncate max-w-[120px] sm:max-w-[140px]">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="truncate">{product.originLocation}</span>
            </span>
            <span className="flex items-center gap-0.5 text-stone-700 font-mono-numbers font-medium shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              {product.rating}
            </span>
          </div>
        </div>

        {/* Pricing & Cart Action Bar (Optimized for Mobile/Tablet/Desktop) */}
        <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Price Container (Never wraps onto multiple lines) */}
          <div className="flex flex-col justify-center min-w-0">
            {hasDiscount && (
              <span className="text-[10px] sm:text-[11px] text-stone-400 line-through font-mono-numbers block -mb-0.5">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline gap-0.5 sm:gap-1 whitespace-nowrap">
              <span className="text-[10px] sm:text-xs font-bold text-stone-600">R$</span>
              <span className="text-sm sm:text-base lg:text-lg font-extrabold text-stone-950 font-mono-numbers tracking-tight">
                {currentPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Cart Actions */}
          {inCartQty > 0 ? (
            /* Active Stepper */
            <div className="flex items-center bg-emerald-50 border border-emerald-400 rounded-full p-0.5 shadow-xs shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCartQuantity(product.id, inCartQty - 1);
                }}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-emerald-900 hover:bg-emerald-200/70 transition-colors cursor-pointer"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
              </button>
              <span className="w-5 sm:w-6 text-center text-xs font-bold text-emerald-950 font-mono-numbers">
                {inCartQty}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCartQuantity(product.id, inCartQty + 1);
                }}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-emerald-900 hover:bg-emerald-200/70 transition-colors cursor-pointer"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            /* Add to Cart Buttons: Compact circular "+" for mobile/tablet, full button for desktop */
            <>
              {/* Mobile & Tablet Button: Circular "+" icon button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-xs active:scale-90 transition-all shrink-0 cursor-pointer"
                title={t.addToBag}
                aria-label={t.addToBag}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>

              {/* Desktop Button: Full "+ Adicionar" button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="hidden lg:flex px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all items-center gap-1 active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{t.addToBag}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
