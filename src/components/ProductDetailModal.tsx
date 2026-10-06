import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  Layers,
  Leaf,
  MessageSquare,
  ListChecks,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    cart,
    updateCartQuantity,
    setActiveView,
    getProductReviews,
    addReview,
    shoppingLists,
    addItemToShoppingList,
    showToast
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [cepInput, setCepInput] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // New review form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!selectedProduct) return null;

  const currentPrice = selectedProduct.salePrice ?? selectedProduct.price;
  const hasDiscount = selectedProduct.salePrice !== undefined && selectedProduct.salePrice < selectedProduct.price;
  const activeLot = selectedProduct.lots[0];
  const reviews = getProductReviews(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    closeProductDetail();
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    closeProductDetail();
    setActiveView('cart');
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepInput.length >= 8) {
      setShippingCalculated(true);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview({
      productId: selectedProduct.id,
      rating: newRating,
      comment: newComment.trim(),
    });
    setNewComment('');
  };

  const handleAddToList = (listId: string) => {
    addItemToShoppingList(listId, selectedProduct.id, quantity);
    showToast(`Adicionado à lista de compras!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors border border-stone-200 cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Media Gallery */}
          <div className="bg-stone-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/80">
            <div>
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-stone-200/60 relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover object-center"
                />
                {selectedProduct.isOrganic && (
                  <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    <span>Selo Orgânico</span>
                  </div>
                )}
              </div>

              {/* Agro Traceability badge */}
              <div className="w-full mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-950">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Rastreabilidade de Safra KMFood</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-tight">
                  Origem: <strong className="text-stone-800">{selectedProduct.originLocation}</strong> · Produtor: <strong className="text-stone-800">{selectedProduct.producer}</strong>.
                </p>
              </div>
            </div>

            {/* Quick Add to Shopping List Dropdown */}
            {shoppingLists.length > 0 && (
              <div className="mt-4 pt-3 border-t border-stone-200">
                <label className="text-[11px] font-semibold text-stone-600 mb-1 block">
                  Salvar na Lista de Compras:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {shoppingLists.map((list) => (
                    <button
                      key={list.id}
                      onClick={() => handleAddToList(list.id)}
                      className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg text-[11px] font-medium text-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ListChecks className="w-3 h-3 text-emerald-700" />
                      <span>{list.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase Module & Tabs */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Tabs: Details vs Reviews */}
              <div className="flex items-center gap-4 border-b border-stone-200 pb-2 mb-3 text-xs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`font-bold pb-1 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-emerald-800 border-b-2 border-emerald-700'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Detalhes do Produto
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`font-bold pb-1 transition-colors flex items-center gap-1 cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'text-emerald-800 border-b-2 border-emerald-700'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Avaliações ({reviews.length})</span>
                </button>
              </div>

              {activeTab === 'details' ? (
                <>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[11px]">
                      {selectedProduct.categoryName}
                    </span>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="flex items-center gap-1 text-stone-700 font-mono-numbers hover:text-emerald-800"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <strong>{selectedProduct.rating}</strong> ({selectedProduct.reviewsCount} avaliações)
                    </button>
                  </div>

                  {/* Title */}
                  <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                    {selectedProduct.name}
                  </h2>

                  <p className="text-xs text-stone-500 mt-1">
                    Embalagem / Porção: <strong className="text-stone-700">{selectedProduct.weightValue}</strong>
                  </p>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-mono-numbers">
                      R$ {currentPrice.toFixed(2).replace('.', ',')}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-stone-400 line-through font-mono-numbers">
                        R$ {selectedProduct.price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <span className="text-xs text-stone-500 font-medium">/{selectedProduct.unit}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* FEFO Lot inspection info */}
                  {activeLot && (
                    <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                      <div className="flex items-center justify-between font-semibold text-stone-800 mb-1">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-emerald-700" />
                          Lote Ativo (FEFO): {activeLot.lotNumber}
                        </span>
                        <span className="text-emerald-700 font-mono-numbers">
                          {selectedProduct.stock} un em estoque
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          Validade: <strong className="text-stone-700">{activeLot.expirationDate}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Shipping Estimator */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <form onSubmit={handleCalculateShipping} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Digite seu CEP (ex: 01451-000)"
                        value={cepInput}
                        onChange={(e) => setCepInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-emerald-600"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Calcular
                      </button>
                    </form>
                    {shippingCalculated && (
                      <p className="mt-2 text-[11px] text-emerald-800 flex items-center gap-1 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Entrega Expressa KMFood em <strong>35 a 45 min</strong> por R$ 7,90 (Grátis &gt; R$ 120).</span>
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* REVIEWS TAB */
                <div className="space-y-4">
                  {/* Reviews Summary */}
                  <div className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                    <div className="text-center shrink-0">
                      <span className="font-extrabold text-3xl font-mono-numbers text-stone-900 block">
                        {selectedProduct.rating}
                      </span>
                      <div className="flex items-center justify-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= Math.round(selectedProduct.rating)
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-0.5 block">
                        {reviews.length} avaliações
                      </span>
                    </div>

                    <div className="flex-1 text-xs text-stone-600 border-l border-stone-200 pl-4">
                      <p className="font-semibold text-stone-900">Satisfação Comprovada</p>
                      <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                        100% dos compradores recomendam este produto agroecológico colhido fresco.
                      </p>
                    </div>
                  </div>

                  {/* Leave a review form */}
                  <form onSubmit={handleSubmitReview} className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                    <span className="font-bold text-emerald-950 block">Deixe sua Avaliação:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-600 text-[11px]">Sua nota:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-0.5 cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Escreva seu comentário sobre o sabor e frescor..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 p-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                      >
                        Avaliar
                      </button>
                    </div>
                  </form>

                  {/* Reviews list */}
                  <div className="max-h-52 overflow-y-auto space-y-2.5 divide-y divide-stone-100 pr-1">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="pt-2 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900">{rev.userName}</span>
                          <span className="text-[10px] text-stone-400 font-mono-numbers">{rev.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= rev.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                              }`}
                            />
                          ))}
                          {rev.verifiedPurchase && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold ml-1">
                              Compra Verificada
                            </span>
                          )}
                        </div>
                        <p className="text-stone-600 text-[11px] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-xl p-1 bg-stone-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold font-mono-numbers text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  Adicionar ao Carrinho
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Comprar Agora</span>
                <span className="font-mono-numbers font-medium text-emerald-200">
                  (R$ {(currentPrice * quantity).toFixed(2).replace('.', ',')})
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
