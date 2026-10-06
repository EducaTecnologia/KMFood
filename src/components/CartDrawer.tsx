import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Check,
  X,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActiveView,
    setSelectedCategorySlug,
    t
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const freeShippingThreshold = 120;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res.message);
    if (res.success) {
      setCouponCode('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <button
          onClick={() => setActiveView('ecommerce')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 hover:text-emerald-800 font-medium cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.continueShopping}</span>
        </button>

        <h1 className="font-display font-bold text-xl sm:text-2xl text-stone-900 text-center flex-1">
          {t.shoppingCart}
        </h1>

        <div className="w-28 text-right">
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              {t.emptyCart}
            </button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-16 text-center max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-lg text-stone-900">
            {t.cartEmptyTitle}
          </h2>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
            {t.cartEmptySubtitle}
          </p>
          <button
            onClick={() => {
              setSelectedCategorySlug('hortifruti');
              setActiveView('category');
            }}
            className="mt-6 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            {t.exploreProduce}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items List (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress Banner */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-300/70 rounded-2xl">
              <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-950 font-medium mb-2">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  {remainingForFreeShipping > 0
                    ? t.freeShippingProgress.replace('{value}', remainingForFreeShipping.toFixed(2).replace('.', ','))
                    : t.freeShippingEarned}
                </span>
                <span className="font-mono-numbers font-semibold text-stone-700">{freeShippingPercent}%</span>
              </div>
              <div className="w-full h-2 bg-emerald-200/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items Cards */}
            <div className="space-y-3">
              {cart.map((item) => {
                const currentPrice = item.product.salePrice ?? item.product.price;
                const itemTotal = currentPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-5 bg-white rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Details */}
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] text-teal-700 font-semibold uppercase tracking-wider block">
                          {item.product.producer}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {item.product.weightValue} · R$ {currentPrice.toFixed(2).replace('.', ',')} /{item.product.unit}
                        </p>
                      </div>
                    </div>

                    {/* Stepper + Item Total + Trash */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-xl px-2 py-1 bg-stone-50/70">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs sm:text-sm font-semibold text-stone-800 font-mono-numbers">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Price and Remove */}
                      <div className="flex flex-col items-end min-w-[80px]">
                        <span className="font-bold text-sm sm:text-base text-stone-900 font-mono-numbers">
                          R$ {itemTotal.toFixed(2).replace('.', ',')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-300 hover:text-stone-600 transition-colors mt-1 p-0.5 cursor-pointer"
                          title={t.removeProduct}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 sm:p-6 sticky top-24">
              <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 pb-4 border-b border-stone-100">
                {t.orderSummary}
              </h3>

              {/* Coupon Field */}
              <div className="mt-4 pb-4 border-b border-stone-100">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={t.couponPlaceholder}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {t.apply}
                  </button>
                </form>

                {couponFeedback && (
                  <p className="mt-2 text-xs text-stone-500">{couponFeedback}</p>
                )}

                {appliedCoupon && (
                  <div className="mt-2.5 flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {t.couponActive} {appliedCoupon}
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-stone-600">
                  <span>{t.productsSubtotal}</span>
                  <span className="font-mono-numbers text-stone-800">R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>{t.couponDiscount}</span>
                    <span className="font-mono-numbers">- R$ {cartDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-stone-600">
                  <span>{t.deliveryFee}</span>
                  <span className="font-mono-numbers text-stone-800">
                    {cartDeliveryFee === 0 ? (
                      <strong className="text-emerald-700 font-bold uppercase text-[11px]">{t.free}</strong>
                    ) : (
                      `R$ ${cartDeliveryFee.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-stone-900 block">{t.totalToPay}</span>
                    <span className="text-[10px] text-stone-400">{t.paymentNotice}</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-stone-950 font-mono-numbers">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setActiveView('checkout')}
                className="mt-6 w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>{t.proceedToCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.secureEnvironment}</span>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};
