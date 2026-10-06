import React from 'react';
import { Home, Compass, ShoppingBag, Clock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView, cartCount, setSelectedCategorySlug, t } = useApp();

  const navItems = [
    {
      id: 'ecommerce',
      label: t.home,
      icon: Home,
      action: () => {
        setSelectedCategorySlug(null);
        setActiveView('ecommerce');
      },
    },
    {
      id: 'category',
      label: t.categories,
      icon: Compass,
      action: () => {
        setActiveView('category');
      },
    },
    {
      id: 'order_tracking',
      label: t.orders,
      icon: Clock,
      action: () => {
        setActiveView('order_tracking');
      },
    },
    {
      id: 'cart',
      label: t.cart,
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
      action: () => {
        setActiveView('cart');
      },
    },
    {
      id: 'login',
      label: t.account,
      icon: User,
      action: () => {
        setActiveView('login');
      },
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeView === item.id ||
            (item.id === 'ecommerce' && activeView === 'ecommerce');

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-colors relative ${
                isActive ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center font-mono-numbers shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
