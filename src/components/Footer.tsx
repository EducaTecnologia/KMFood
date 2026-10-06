import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { openInstitutional, setActiveView, t } = useApp();

  const [col1Open, setCol1Open] = useState(false);
  const [col2Open, setCol2Open] = useState(false);
  const [col3Open, setCol3Open] = useState(false);

  return (
    <footer className="hidden lg:block bg-stone-900 text-stone-300 pt-12 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Column 1: Institucional */}
          <div>
            <div
              onClick={() => setCol1Open(!col1Open)}
              className="flex items-center justify-between font-display font-bold text-white text-sm uppercase tracking-wider mb-3 cursor-pointer md:cursor-default"
            >
              <span>{t.institutional}</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${col1Open ? 'rotate-180' : ''}`} />
            </div>
            <ul className={`space-y-2.5 ${col1Open ? 'block' : 'hidden md:block'}`}>
              <li>
                <button
                  onClick={() => openInstitutional('institucional')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('fale-conosco')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.contactSac}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('contas-e-seguranca')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.accountSecurity}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('carreiras')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Carreiras & Trabalhe Conosco
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('entregadores')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Seja um Entregador Parceiro
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Ética */}
          <div>
            <div
              onClick={() => setCol2Open(!col2Open)}
              className="flex items-center justify-between font-display font-bold text-white text-sm uppercase tracking-wider mb-3 cursor-pointer md:cursor-default"
            >
              <span>Legal & Conduta</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${col2Open ? 'rotate-180' : ''}`} />
            </div>
            <ul className={`space-y-2.5 ${col2Open ? 'block' : 'hidden md:block'}`}>
              <li>
                <button
                  onClick={() => openInstitutional('termos-e-condicoes')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.privacyTerms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('codigo-de-conduta')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Código de Conduta & Ética Agro
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('privacidade')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Política de Privacidade (LGPD / GDPR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('dicas-de-seguranca')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Dicas de Segurança contra Fraudes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Para Você */}
          <div>
            <div
              onClick={() => setCol3Open(!col3Open)}
              className="flex items-center justify-between font-display font-bold text-white text-sm uppercase tracking-wider mb-3 cursor-pointer md:cursor-default"
            >
              <span>{t.account}</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${col3Open ? 'rotate-180' : ''}`} />
            </div>
            <ul className={`space-y-2.5 ${col3Open ? 'block' : 'hidden md:block'}`}>
              <li>
                <button
                  onClick={() => setActiveView('order_tracking')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.orders} & Rastreamento
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('login')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.account} / {t.login}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInstitutional('fale-conosco')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.helpSupport}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('ecommerce')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {t.allHarvests}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Redes Sociais & Marca */}
          <div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                KM<span className="text-emerald-400">Food</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" />
            </div>
            <p className="text-stone-400 text-xs leading-relaxed mb-4">
              {t.sustainableAgro}
            </p>

            {/* Social handles */}
            <p className="text-white font-semibold mb-2">Redes Sociais Oficiais</p>
            <div className="space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">Instagram:</span>
                <span className="hover:text-white transition-colors cursor-pointer">@kmfood.agro</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">WhatsApp:</span>
                <span className="hover:text-white transition-colors cursor-pointer">(11) 98765-4321</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">YouTube:</span>
                <span className="hover:text-white transition-colors cursor-pointer">/KMFoodAgroBrasil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">LinkedIn:</span>
                <span className="hover:text-white transition-colors cursor-pointer">/company/kmfood</span>
              </div>
            </div>
          </div>

        </div>

        {/* Base: Payment methods, Security Seals and Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-stone-400 text-[11px] font-semibold">Formas de Pagamento / Payment:</span>
            <div className="flex items-center gap-2 text-stone-300">
              <span className="px-2 py-1 bg-stone-800 rounded text-[11px] font-bold">PIX BACEN</span>
              <span className="px-2 py-1 bg-stone-800 rounded text-[11px] font-bold">VISA</span>
              <span className="px-2 py-1 bg-stone-800 rounded text-[11px] font-bold">MASTERCARD</span>
              <span className="px-2 py-1 bg-stone-800 rounded text-[11px] font-bold">ELO</span>
              <span className="px-2 py-1 bg-stone-800 rounded text-[11px] font-bold">DINHEIRO</span>
            </div>
          </div>

          {/* Security Seals */}
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SSL 256 Bits Criptografado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>PCI-DSS Certificado</span>
            </div>
          </div>
        </div>

        {/* Corporate Legal Footer */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 text-center text-stone-400 text-[11px] space-y-1">
          <p>
            KMFood Comércio de Alimentos e Logística Ltda. — CNPJ: 42.189.540/0001-92
          </p>
          <p>
            Centro de Distribuição & Matriz: Av. Jaguaré, 1485 - Galpão 04 - Jaguaré, São Paulo - SP - CEP 05346-000
          </p>
          <p className="text-stone-400 pt-1">
            © 2026 KMFood. {t.allRightsReserved}
          </p>
        </div>

      </div>
    </footer>
  );
};
