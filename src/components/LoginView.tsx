import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Clock,
  Sparkles,
  ChevronLeft,
  User as UserIcon,
  Crown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginView: React.FC = () => {
  const { login, switchRole, setActiveView, showToast } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Form fields (Defaulting to Plácide for instant testing and presentation)
  const [emailOrPhone, setEmailOrPhone] = useState('placide@kmfood.com.br');
  const [password, setPassword] = useState('senhaSegura123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      if (!termsAccepted) {
        showToast('É necessário aceitar os Termos de Uso e Política de Privacidade.', 'warning');
        return;
      }
      showToast('Cadastro realizado com sucesso! Bem-vindo ao KMFood.');
      login(emailOrPhone, 'customer');
    } else {
      login(emailOrPhone, 'customer');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      showToast(`Link de recuperação enviado para: ${forgotEmail}`, 'success');
      setForgotPasswordOpen(false);
    }
  };

  const demoRoles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'customer', title: 'Cliente Final', desc: 'E-commerce, compras, checkout e rastreio' },
    { role: 'admin', title: 'Administrador Geral', desc: 'Gestão completa, KPIs, CMS e relatórios' },
    { role: 'operator', title: 'Operador de Pedidos', desc: 'Kanban operacional e atendimento ao cliente' },
    { role: 'stock', title: 'Gestão de Estoque', desc: 'Controle de saldo, lotes FEFO e validade' },
    { role: 'finance', title: 'Financeiro', desc: 'Fluxo de caixa, conciliação e repasses' },
    { role: 'delivery', title: 'Logística de Entregas', desc: 'Gestão de frotas, zonas e despacho' },
    { role: 'courier', title: 'Entregador Parceiro', desc: 'Painel mobile com rota, status e ganhos' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden lg:grid lg:grid-cols-2 flex flex-col">
        
        {/* LEFT: BRAND PANEL (SHOWN ONLY ON DESKTOP - HIDDEN ON MOBILE & TABLET PER USER SPECIFICATION) */}
        <div className="hidden lg:flex relative bg-emerald-950 text-white p-8 sm:p-10 flex-col justify-between overflow-hidden min-h-[580px]">
          {/* Background Photography with Scrim */}
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80"
            alt="Colheita sustentável KMFood"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&auto=format&fit=crop&q=80';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />

          {/* Top Wordmark */}
          <div className="relative z-10">
            <button
              onClick={() => setActiveView('ecommerce')}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-100 transition-colors mb-6 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar para a Loja</span>
            </button>

            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-3xl tracking-tight text-white">
                KM<span className="text-emerald-400">Food</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1" />
            </div>

            <p className="text-xs uppercase tracking-widest text-emerald-300 font-semibold mt-1">
              Mercado Agro & Sustentável
            </p>
          </div>

          {/* Center Headline & Bullets */}
          <div className="relative z-10 my-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
              Seu mercado completo em um só lugar.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
              Direto do pequeno produtor para a sua casa com frescor garantido e entrega expressa em até 45 minutos.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alimentos orgânicos e artesanais com rastreio de lote</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gestão inteligente com estoque FEFO em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pagamento seguro via Pix ou Cartão com confirmação ágil</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 pt-4 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-200">
            <span>Rede de 140+ cooperativas</span>
            <span>Versão 2.0 Oficial</span>
          </div>
        </div>

        {/* RIGHT: ACCESS CARD (LOGIN / REGISTRATION) - LOADS FULL WIDTH ON MOBILE & TABLET */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between w-full">
          <div>
            {/* Mobile/Tablet Compact Brand Header */}
            <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
              <button
                onClick={() => setActiveView('ecommerce')}
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-emerald-800 font-semibold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Loja</span>
              </button>
              <div className="flex items-baseline gap-0.5">
                <span className="font-display font-extrabold text-lg text-emerald-950">
                  KM<span className="text-emerald-600">Food</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5" />
              </div>
            </div>

            {/* Title */}
            <div className="mb-5">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-stone-900">
                {isRegisterMode ? 'Criar Nova Conta' : 'Entrar no KMFood'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {isRegisterMode
                  ? 'Preencha seus dados para começar a receber alimentos frescos'
                  : 'Acesse suas compras, carteira e acompanhe entregas em tempo real'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Plácide Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  E-mail ou Telefone
                </label>
                <input
                  type="text"
                  required
                  placeholder="placide@kmfood.com.br ou (11) 98123-4567"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>

              {/* Password with Eye Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-700">Senha</label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-[11px] text-emerald-700 hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Sua senha secreta"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              {!isRegisterMode && (
                <div className="flex items-center justify-between text-xs text-stone-600 pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 accent-emerald-700"
                    />
                    <span>Manter conectado</span>
                  </label>
                </div>
              )}

              {/* Terms of Service Checkbox */}
              {isRegisterMode && (
                <div className="pt-0.5">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-600 select-none">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-emerald-700 accent-emerald-700"
                    />
                    <span className="text-[11px] leading-tight">
                      Li e concordo com os <strong>Termos de Uso</strong> e <strong>Política de Privacidade</strong>.
                    </span>
                  </label>
                </div>
              )}

              {/* Main Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer mt-2"
              >
                {isRegisterMode ? 'Criar Minha Conta no KMFood' : 'Entrar na Plataforma'}
              </button>
            </form>

            {/* Fast 1-Click Plácide VIP Login Account Card */}
            <div className="mt-4 p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    Plácide (Cliente VIP) <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
                  </p>
                  <p className="text-[10px] text-emerald-700">Conta com carteira, cashback e dados carregados</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => login('placide@kmfood.com.br', 'customer')}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg shadow-xs transition-all cursor-pointer"
              >
                Entrar
              </button>
            </div>

            {/* Toggle Login <-> Register */}
            <div className="mt-4 text-center">
              {isRegisterMode ? (
                <p className="text-xs text-stone-600">
                  Já possui conta?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(false)}
                    className="font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Fazer Login
                  </button>
                </p>
              ) : (
                <p className="text-xs text-stone-600">
                  Não tem conta?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(true)}
                    className="font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Cadastre-se grátis
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* QUICK ROLE SELECTOR (DEMO 7 ROLES COMPLIANCE) */}
          <div className="mt-5 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Acesso Rápido por Perfil (7 Perfis)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {demoRoles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => switchRole(r.role)}
                  className="p-1.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg text-left text-[11px] transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-stone-800 block truncate">{r.title}</span>
                  <span className="text-[9px] text-stone-400 uppercase">{r.role}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-stone-200">
            <h4 className="font-display font-bold text-base text-stone-900">
              Recuperar Senha
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Informe seu e-mail cadastrado e enviaremos um token seguro para redefinição (válido por 15 min).
            </p>
            <form onSubmit={handleForgotPassword} className="mt-4 space-y-3">
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Enviar Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
