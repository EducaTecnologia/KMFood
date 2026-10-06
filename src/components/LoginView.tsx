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
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginView: React.FC = () => {
  const { login, switchRole, setActiveView, showToast } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Form fields
  const [emailOrPhone, setEmailOrPhone] = useState('cliente@kmfood.com.br');
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
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT: BRAND PANEL (DESKTOP / TABLET SPLIT SCREEN) */}
        <div className="relative bg-emerald-950 text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[380px] md:min-h-[580px]">
          {/* Background Photography with Scrim */}
          <img
            src="/src/assets/images/login_agro_harvest_1791242955030.jpg"
            alt="Colheita sustentável KMFood"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />

          {/* Top Wordmark */}
          <div className="relative z-10">
            <button
              onClick={() => setActiveView('ecommerce')}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-100 transition-colors mb-6"
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

        {/* RIGHT: ACCESS CARD (LOGIN / REGISTRATION) */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-stone-900">
                  {isRegisterMode ? 'Criar Nova Conta' : 'Entrar no KMFood'}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {isRegisterMode
                    ? 'Preencha seus dados para começar a receber alimentos frescos'
                    : 'Acesse suas compras, acompanhe entregas e gerencie pedidos'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carolina Mendes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  E-mail ou Telefone com DDD
                </label>
                <input
                  type="text"
                  required
                  placeholder="seuemail@exemplo.com ou (11) 98765-4321"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>

              {/* Password with Eye Toggle (Mandatory Requirement) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-700">Senha</label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-[11px] text-emerald-700 hover:underline"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              {!isRegisterMode && (
                <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
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

              {/* Terms of Service Checkbox (for Registration) */}
              {isRegisterMode && (
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-600 select-none">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-emerald-700 accent-emerald-700"
                    />
                    <span className="text-[11px] leading-tight">
                      Li e concordo com os <strong>Termos e Condições de Uso</strong> e com a <strong>Política de Privacidade (LGPD)</strong> do KMFood.
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

            {/* Social Login Options */}
            <div className="mt-5 text-center">
              <div className="relative flex items-center justify-center mb-3">
                <div className="border-t border-stone-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-stone-400 uppercase tracking-wider shrink-0">
                  ou continue com
                </span>
                <div className="border-t border-stone-200 w-full" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    login('cliente.google@gmail.com', 'customer');
                    showToast('Autenticado com Google');
                  }}
                  className="py-2 px-3 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold text-stone-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    login('cliente.apple@icloud.com', 'customer');
                    showToast('Autenticado com Apple ID');
                  }}
                  className="py-2 px-3 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold text-stone-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.55 2.79-1.28"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>
            </div>

            {/* Toggle Login <-> Register */}
            <div className="mt-4 text-center">
              {isRegisterMode ? (
                <p className="text-xs text-stone-600">
                  Já possui conta?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(false)}
                    className="font-bold text-emerald-700 hover:underline"
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
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    Cadastre-se grátis
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* QUICK ROLE SELECTOR (DEMO 7 ROLES COMPLIANCE) */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Acesso Rápido por Perfil (7 Perfis)
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mb-2">
              Clique em qualquer perfil abaixo para acessar e avaliar seu dashboard dedicado:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {demoRoles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => switchRole(r.role)}
                  className="p-1.5 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg text-left text-[11px] transition-colors"
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
                  className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl"
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
