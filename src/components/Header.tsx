import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  MapPin,
  ChevronDown,
  X,
  HelpCircle,
  Globe,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../data/translations';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = () => {
  const {
    currentUser,
    cartCount,
    cartTotal,
    currentAddress,
    setCurrentAddress,
    searchQuery,
    setSearchQuery,
    setActiveView,
    setSelectedCategorySlug,
    openInstitutional,
    activeView,
    language,
    setLanguage,
    t
  } = useApp();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const searchShortcuts = t.terms;

  // Vector Country Flags SVG components for crisp display across all OS and browsers
  const FlagBrazil = () => (
    <svg className="w-5 h-3.5 rounded-xs shadow-xs shrink-0 object-cover" viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="504" fill="#009b3a"/>
      <polygon points="360,42 678,252 360,462 42,252" fill="#fedf00"/>
      <circle cx="360" cy="252" r="126" fill="#002776"/>
      <path d="M234,252 a126,126 0 0,0 248,32 a126,126 0 0,1 -248,-32" fill="#ffffff"/>
    </svg>
  );

  const FlagUSA = () => (
    <svg className="w-5 h-3.5 rounded-xs shadow-xs shrink-0 object-cover" viewBox="0 0 741 390" xmlns="http://www.w3.org/2000/svg">
      <rect width="741" height="390" fill="#b22234"/>
      <path d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741" stroke="#ffffff" strokeWidth="30"/>
      <rect width="296.4" height="210" fill="#3c3b6e"/>
      <circle cx="50" cy="40" r="10" fill="#ffffff"/>
      <circle cx="100" cy="40" r="10" fill="#ffffff"/>
      <circle cx="150" cy="40" r="10" fill="#ffffff"/>
      <circle cx="200" cy="40" r="10" fill="#ffffff"/>
      <circle cx="250" cy="40" r="10" fill="#ffffff"/>
      <circle cx="75" cy="75" r="10" fill="#ffffff"/>
      <circle cx="125" cy="75" r="10" fill="#ffffff"/>
      <circle cx="175" cy="75" r="10" fill="#ffffff"/>
      <circle cx="225" cy="75" r="10" fill="#ffffff"/>
      <circle cx="50" cy="110" r="10" fill="#ffffff"/>
      <circle cx="100" cy="110" r="10" fill="#ffffff"/>
      <circle cx="150" cy="110" r="10" fill="#ffffff"/>
      <circle cx="200" cy="110" r="10" fill="#ffffff"/>
      <circle cx="250" cy="110" r="10" fill="#ffffff"/>
      <circle cx="75" cy="145" r="10" fill="#ffffff"/>
      <circle cx="125" cy="145" r="10" fill="#ffffff"/>
      <circle cx="175" cy="145" r="10" fill="#ffffff"/>
      <circle cx="225" cy="145" r="10" fill="#ffffff"/>
      <circle cx="50" cy="180" r="10" fill="#ffffff"/>
      <circle cx="100" cy="180" r="10" fill="#ffffff"/>
      <circle cx="150" cy="180" r="10" fill="#ffffff"/>
      <circle cx="200" cy="180" r="10" fill="#ffffff"/>
      <circle cx="250" cy="180" r="10" fill="#ffffff"/>
    </svg>
  );

  const FlagFrance = () => (
    <svg className="w-5 h-3.5 rounded-xs shadow-xs shrink-0 object-cover border border-stone-200" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="600" fill="#0055A5"/>
      <rect x="300" width="300" height="600" fill="#FFFFFF"/>
      <rect x="600" width="300" height="600" fill="#EF4135"/>
    </svg>
  );

  const languages: { code: Language; name: string; country: string; flagComponent: React.FC }[] = [
    {
      code: 'pt',
      name: 'Português',
      country: 'Brasil',
      flagComponent: FlagBrazil
    },
    {
      code: 'en',
      name: 'English',
      country: 'USA',
      flagComponent: FlagUSA
    },
    {
      code: 'fr',
      name: 'Français',
      country: 'France',
      flagComponent: FlagFrance
    }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];
  const CurrentFlagComponent = currentLangObj.flagComponent;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 transition-all">
        {/* Top bar contract: Zone 1 (Brand) — Zone 2 (Search & Categories) — Zone 3 (Actions & RBAC) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* ZONE 1: BRAND WORDMARK & ADDRESS SELECTOR */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setActiveView('ecommerce');
                }}
                className="group text-left cursor-pointer flex items-baseline gap-0.5 sm:gap-1"
                title="KMFood Home"
              >
                {/* Reduced responsive logo sizing strictly adhering to user instructions: mobile (text-lg), tablet (text-xl), desktop (text-2xl) */}
                <span className="font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
                  KM<span className="text-emerald-600">Food</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 self-center ml-0.5" />
              </button>

              {/* Delivery Address Pill */}
              <button
                onClick={() => setShowAddressModal(true)}
                className="hidden lg:flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-800 bg-stone-100 hover:bg-emerald-50/70 px-2.5 py-1.5 rounded-full transition-colors border border-stone-200/60 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate max-w-[170px] font-medium text-stone-800">
                  {currentAddress.street}, {currentAddress.number}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>
            </div>

            {/* ZONE 2: SEARCH BAR WITH RICH AUTOCOMPLETE */}
            <div className="flex-1 max-w-xl relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="w-full pl-9 pr-8 py-2 bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-xs sm:text-sm text-stone-800 rounded-full border border-stone-200 focus:border-emerald-600 focus:outline-none transition-all placeholder:text-stone-400 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showSearchSuggestions && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowSearchSuggestions(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-stone-200 rounded-xl shadow-xl z-40 p-3 text-xs">
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                      {t.searchShortcutsTitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {searchShortcuts.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setShowSearchSuggestions(false);
                            setActiveView('ecommerce');
                          }}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-600 rounded-full transition-colors text-[11px] cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ZONE 3: ACTIONS & LANGUAGE SELECTOR */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Globe Language Selector with Country Flags */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 text-xs font-semibold border border-stone-200 transition-colors cursor-pointer"
                  title={t.selectLanguage}
                  aria-label={t.selectLanguage}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <CurrentFlagComponent />
                  <span className="hidden sm:inline uppercase text-[11px] font-bold text-stone-700">{currentLangObj.code}</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {showLangMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowLangMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 py-2 divide-y divide-stone-100 animate-in fade-in zoom-in-95">
                      <div className="px-3.5 py-2">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                          {t.selectLanguage}
                        </p>
                      </div>

                      <div className="py-1">
                        {languages.map((l) => {
                          const FlagComponent = l.flagComponent;
                          return (
                            <button
                              key={l.code}
                              onClick={() => {
                                setLanguage(l.code);
                                setShowLangMenu(false);
                              }}
                              className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-emerald-50/70 transition-colors cursor-pointer ${
                                language === l.code ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-stone-700'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <FlagComponent />
                                <div>
                                  <p className="text-xs font-semibold text-stone-900">{l.name}</p>
                                  <p className="text-[10px] text-stone-500">{l.country}</p>
                                </div>
                              </div>
                              {language === l.code && (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Shopping Cart Button - Opens Cesta de Compras screen */}
              <button
                onClick={() => setActiveView('cart')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
                title={t.shoppingCart}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center font-mono-numbers shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-mono-numbers">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </button>

              {/* User Avatar / Profile / Login */}
              <button
                onClick={() => {
                  if (currentUser.role === 'customer') {
                    setActiveView('profile');
                  } else {
                    setActiveView('login');
                  }
                }}
                className="hidden sm:flex items-center gap-1.5 p-1 text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                title={`${currentUser.name} (${t.account})`}
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-600 shadow-xs"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <span className="hidden md:inline text-xs font-bold text-stone-800 truncate max-w-[100px]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            </div>

          </div>

          {/* Subheader: Category quick navigation bar */}
          <nav className="mt-2 pt-2 border-t border-stone-100 hidden md:flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setActiveView('ecommerce');
                }}
                className={`font-medium transition-colors hover:text-emerald-800 cursor-pointer ${
                  activeView === 'ecommerce' && !searchQuery ? 'text-emerald-800 font-semibold' : ''
                }`}
              >
                {t.allHarvests}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('hortifruti');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.freshProduce}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('carnes-acougue');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.meatButcher}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('graos-cereais');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.grainsCereals}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('cafe-cacau');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.coffeeCocoa}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('frios-laticinios');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.cheeseDairy}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('limpeza');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.ecoCleaning}
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug('higiene');
                  setActiveView('category');
                }}
                className="hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.naturalHygiene}
              </button>
            </div>

            <div className="flex items-center gap-4 text-stone-500 shrink-0">
              <button
                onClick={() => openInstitutional('fale-conosco')}
                className="hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                {t.helpSupport}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <h3 className="font-display font-bold text-stone-900 text-base">{t.deliveryTo}</h3>
              </div>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2.5">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900">{currentAddress.label}</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-semibold px-1.5 py-0.2 rounded-md">
                      Principal
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {currentAddress.street}, {currentAddress.number} {currentAddress.complement && `(${currentAddress.complement})`}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {currentAddress.neighborhood} · {currentAddress.city}/{currentAddress.state} · CEP {currentAddress.cep}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddressModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Confirmar Endereço
            </button>
          </div>
        </div>
      )}
    </>
  );
};
