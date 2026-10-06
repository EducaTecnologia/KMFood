import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
  Clock,
  HeartHandshake,
  Mail,
  QrCode
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroCarousel } from './HeroCarousel';
import { CategoryBar } from './CategoryBar';
import { ProductCard } from './ProductCard';
import { SmartAIAssistantModal } from './SmartAIAssistantModal';

export const HomeView: React.FC = () => {
  const { products, setSelectedCategorySlug, setActiveView, showToast, t } = useApp();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Shelves
  const newProducts = products.filter((p) => p.isNew);
  const promoProducts = products.filter((p) => p.isPromo);
  const featuredProducts = products.filter((p) => p.rating >= 4.9);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('E-mail cadastrado com sucesso! Você receberá ofertas da safra em primeira mão.');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
      
      {/* SEÇÃO 1: HERO BANNER (CARROSSEL) */}
      <HeroCarousel />

      {/* SEÇÃO 2: CARDS DE CATEGORIAS */}
      <CategoryBar />

      {/* AI ASSISTANT PROMO CALLOUT */}
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white">
              {t.aiChefTitle}
            </h3>
            <p className="text-xs text-emerald-200/80">
              {t.aiChefSub}
            </p>
          </div>
        </div>

        <button
          onClick={() => setAiAssistantOpen(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
        >
          <span>{t.openAiChef}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SEÇÃO 3: PRATELEIRA "NOVIDADES DA SAFRA" */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 tracking-tight flex items-center gap-2">
              <span>{t.harvestNews}</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full uppercase">
                {t.recentHarvestBadge}
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              {t.recentHarvestSub}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setActiveView('category');
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SEÇÃO 4: PRATELEIRA "DESTAQUES & MAIS VENDIDOS" */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 tracking-tight">
              {t.highlightsTitle}
            </h2>
            <p className="text-xs text-stone-500">
              {t.highlightsSub}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setActiveView('category');
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SEÇÃO 5: PRATELEIRA "OFERTAS & PROMOÇÕES DO DIA" */}
      <section id="ofertas-section" className="my-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 tracking-tight flex items-center gap-2">
              <span>{t.offersWeekTitle}</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full uppercase">
                {t.upToDiscount}
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              {t.offersWeekSub}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setActiveView('category');
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>{t.viewAllOffers}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {promoProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SEÇÃO 6: FAIXA DE BENEFÍCIOS */}
      <section className="my-10 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">{t.expressDelivery}</h4>
            <p className="text-[11px] text-stone-500 mt-1 max-w-[170px]">
              {t.expressDeliverySub}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">{t.directFromProducer}</h4>
            <p className="text-[11px] text-stone-500 mt-1 max-w-[170px]">
              {t.directFromProducerSub}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">{t.fefoQuality}</h4>
            <p className="text-[11px] text-stone-500 mt-1 max-w-[170px]">
              {t.fefoQualitySub}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">{t.securePayment}</h4>
            <p className="text-[11px] text-stone-500 mt-1 max-w-[170px]">
              {t.securePaymentSub}
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: CARDS GRANDES DE DEPARTAMENTOS */}
      <section className="my-10">
        <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 mb-4 px-1">
          {t.bigDepartmentsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div
            onClick={() => {
              setSelectedCategorySlug('hortifruti');
              setActiveView('category');
            }}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-emerald-950 text-white cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80"
              alt={t.freshProduce}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Frescor Diário</span>
              <h3 className="font-display font-bold text-base text-white">{t.freshProduce}</h3>
              <p className="text-[11px] text-emerald-100/80">Tomates, verduras e frutas orgânicas</p>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedCategorySlug('carnes-acougue');
              setActiveView('category');
            }}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-emerald-950 text-white cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80"
              alt={t.meatButcher}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Cortes Nobres</span>
              <h3 className="font-display font-bold text-base text-white">{t.meatButcher}</h3>
              <p className="text-[11px] text-emerald-100/80">Angus e aves caipiras a pasto</p>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedCategorySlug('graos-cereais');
              setActiveView('category');
            }}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-emerald-950 text-white cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
              alt={t.grainsCereals}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Safra Nova</span>
              <h3 className="font-display font-bold text-base text-white">{t.grainsCereals}</h3>
              <p className="text-[11px] text-emerald-100/80">Feijões especiais e arrozes biodinâmicos</p>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedCategorySlug('limpeza');
              setActiveView('category');
            }}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-emerald-950 text-white cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80"
              alt={t.ecoCleaning}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">100% Biodegradável</span>
              <h3 className="font-display font-bold text-base text-white">{t.ecoCleaning}</h3>
              <p className="text-[11px] text-emerald-100/80">Ativos botânicos e cuidados sem química</p>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO 8: NEWSLETTER & PWA */}
      <section className="my-10 bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md">
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
            Clube Agro KMFood
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
            {t.newsletterTitle}
          </h3>
          <p className="text-xs text-emerald-100/80 mt-2">
            {t.newsletterSub}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
            <input
              type="email"
              required
              placeholder={t.newsletterPlaceholder}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder:text-emerald-200/60 focus:outline-none focus:bg-white/20"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
            >
              {t.subscribe}
            </button>
          </form>
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center text-xs flex flex-col items-center">
          <QrCode className="w-16 h-16 text-emerald-300 mb-2" />
          <span className="font-bold text-white">Instale o App KMFood (PWA)</span>
          <span className="text-[11px] text-emerald-200 mt-0.5">Disponível para iOS e Android</span>
        </div>
      </section>

      {/* AI Assistant Modal */}
      <SmartAIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

    </div>
  );
};
