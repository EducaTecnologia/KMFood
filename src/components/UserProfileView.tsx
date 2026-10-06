import React, { useState } from 'react';
import {
  User as UserIcon,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CreditCard,
  Ticket,
  Clock,
  Sparkles,
  Award,
  Wallet,
  Coins,
  ShieldCheck,
  Bell,
  Heart,
  ListChecks,
  Headphones,
  FileText,
  LogOut,
  Edit3,
  Plus,
  CheckCircle2,
  Trash2,
  Copy,
  ExternalLink,
  Leaf,
  ArrowRight,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address, UserPaymentMethod, UserCoupon } from '../types';

export const UserProfileView: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    logout,
    setActiveView,
    orders,
    currentAddress,
    setCurrentAddress,
    showToast,
    shoppingLists,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wallet' | 'coupons' | 'settings'>('overview');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Edit profile state
  const [editName, setEditName] = useState(currentUser.name || 'Plácide');
  const [editFullName, setEditFullName] = useState(currentUser.fullName || 'Plácide M. Silva');
  const [editEmail, setEditEmail] = useState(currentUser.email || 'placide@kmfood.com.br');
  const [editPhone, setEditPhone] = useState(currentUser.phone || '(11) 98123-4567');

  // New Address form state
  const [newLabel, setNewLabel] = useState('Casa');
  const [newStreet, setNewStreet] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newComplement, setNewComplement] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newCity, setNewCity] = useState('São Paulo');
  const [newState, setNewState] = useState('SP');
  const [newCep, setNewCep] = useState('');

  // New Card form state
  const [cardHolder, setCardHolder] = useState('Plácide M. Silva');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const savedAddresses = currentUser.savedAddresses || [
    currentUser.address || {
      id: 'addr-default',
      label: 'Casa (Principal)',
      street: 'Rua Oscar Freire',
      number: '1420',
      complement: 'Apto 102 - Bloco B',
      neighborhood: 'Cerqueira César / Jardins',
      city: 'São Paulo',
      state: 'SP',
      cep: '01426-001',
      isDefault: true,
    }
  ];

  const paymentMethods: UserPaymentMethod[] = currentUser.paymentMethods || [
    { id: 'pay-1', type: 'credit', brand: 'Mastercard Black', last4: '4829', label: 'Cartão Principal (Crédito)' },
    { id: 'pay-2', type: 'pix', label: 'Chave Pix (CPF Cadastrado)' },
    { id: 'pay-3', type: 'wallet', label: 'Carteira KMFood Pay' },
  ];

  const coupons: UserCoupon[] = currentUser.coupons || [
    { id: 'coup-1', code: 'KMAGRO10', discount: 10, type: 'percent', description: '10% OFF em toda a colheita fresca', minOrder: 50, validUntil: '31/12/2026' },
    { id: 'coup-2', code: 'FRETEGRATIS', discount: 100, type: 'percent', description: 'Frete Grátis acima de R$ 80', minOrder: 80, validUntil: '31/12/2026' },
    { id: 'coup-3', code: 'VIPOURO20', discount: 20, type: 'fixed', description: 'R$ 20 OFF exclusivo para membros VIP Clube Ouro', minOrder: 100, validUntil: '31/12/2026' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      name: editName,
      fullName: editFullName,
      email: editEmail,
      phone: editPhone,
    };
    setCurrentUser(updated);
    setIsEditingProfile(false);
    showToast('Dados do perfil atualizados com sucesso!', 'success');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newNumber || !newNeighborhood) {
      showToast('Por favor, preencha os campos obrigatórios do endereço.', 'warning');
      return;
    }
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      street: newStreet,
      number: newNumber,
      complement: newComplement,
      neighborhood: newNeighborhood,
      city: newCity,
      state: newState,
      cep: newCep || '01000-000',
      isDefault: false,
    };
    const updatedAddresses = [...savedAddresses, newAddr];
    setCurrentUser({
      ...currentUser,
      savedAddresses: updatedAddresses,
    });
    setShowAddressModal(false);
    // Reset form
    setNewStreet('');
    setNewNumber('');
    setNewComplement('');
    setNewNeighborhood('');
    setNewCep('');
    showToast('Novo endereço adicionado com sucesso!');
  };

  const handleSetDefaultAddress = (addr: Address) => {
    const updated = savedAddresses.map(a => ({
      ...a,
      isDefault: a.id === addr.id,
    }));
    setCurrentUser({
      ...currentUser,
      address: addr,
      savedAddresses: updated,
    });
    setCurrentAddress(addr);
    showToast(`Endereço "${addr.label}" definido como principal.`);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || cardNumber.length < 4) {
      showToast('Informe os 16 dígitos do cartão.', 'warning');
      return;
    }
    const last4Digits = cardNumber.replace(/\D/g, '').slice(-4) || '1234';
    const newCard: UserPaymentMethod = {
      id: `pay-${Date.now()}`,
      type: 'credit',
      brand: 'Visa Infinite',
      last4: last4Digits,
      label: `Cartão final ${last4Digits} (Crédito)`,
    };
    setCurrentUser({
      ...currentUser,
      paymentMethods: [...paymentMethods, newCard],
    });
    setShowCardModal(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    showToast('Cartão de crédito adicionado à sua carteira com segurança!');
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Cupom ${code} copiado para a área de transferência!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
        <button
          onClick={() => setActiveView('ecommerce')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-800 transition-colors p-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar para a Loja</span>
        </button>

        <h1 className="font-display font-extrabold text-base sm:text-lg text-stone-900">
          Minha Conta KMFood
        </h1>

        <button
          onClick={() => logout()}
          className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold p-1 transition-colors"
          title="Sair da Conta"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>

      {/* Profile Header Card (iFood inspired) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 rounded-3xl text-white p-6 sm:p-8 shadow-xl relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="relative">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-800 text-emerald-100 flex items-center justify-center font-display font-extrabold text-2xl border-2 border-emerald-400">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-stone-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 fill-current" /> VIP
              </span>
            </div>

            {/* Name & Metadata */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  {currentUser.name}
                </h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="p-1 text-emerald-300 hover:text-white transition-colors"
                  title="Editar perfil"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-emerald-200/90 mt-0.5 font-medium">
                {currentUser.email} · {currentUser.phone}
              </p>

              {/* VIP Badge */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>{currentUser.vipStatus || 'Clube KMFood Ouro · Frete Grátis Ativo'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('wallet')}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-emerald-500/40 shadow-sm"
          >
            <Wallet className="w-4 h-4" />
            <span>KMFood Pay</span>
          </button>
        </div>

        {/* Quick Wallet Stats (iFood Strip) */}
        <div className="mt-6 pt-5 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-white">
          <div
            onClick={() => setActiveTab('wallet')}
            className="bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-700/50 rounded-2xl p-3 cursor-pointer transition-colors"
          >
            <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Wallet className="w-3 h-3 text-emerald-400" /> Saldo em Carteira
            </p>
            <p className="text-base sm:text-lg font-extrabold font-mono-numbers text-white mt-0.5">
              R$ {(currentUser.walletBalance || 125.50).toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div
            onClick={() => setActiveTab('wallet')}
            className="bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-700/50 rounded-2xl p-3 cursor-pointer transition-colors"
          >
            <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Coins className="w-3 h-3 text-amber-300" /> Cashback Acumulado
            </p>
            <p className="text-base sm:text-lg font-extrabold font-mono-numbers text-amber-300 mt-0.5">
              R$ {(currentUser.cashback || 34.80).toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div
            onClick={() => setActiveTab('overview')}
            className="bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-700/50 rounded-2xl p-3 cursor-pointer transition-colors"
          >
            <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Pontos Fidelidade
            </p>
            <p className="text-base sm:text-lg font-extrabold font-mono-numbers text-white mt-0.5">
              {(currentUser.kmPoints || 1420).toLocaleString()} pts
            </p>
          </div>

          <div
            onClick={() => setActiveTab('coupons')}
            className="bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-700/50 rounded-2xl p-3 cursor-pointer transition-colors"
          >
            <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Ticket className="w-3 h-3 text-emerald-400" /> Cupons Ativos
            </p>
            <p className="text-base sm:text-lg font-extrabold font-mono-numbers text-emerald-200 mt-0.5">
              {coupons.length} cupons disponíveis
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile inline drawer */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-lg mb-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-stone-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-600" /> Editar Dados Cadastrais
            </h3>
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="text-xs text-stone-400 hover:text-stone-700 font-semibold"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nome de Exibição</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nome Completo</label>
              <input
                type="text"
                required
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">E-mail</label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Telefone com WhatsApp</label>
              <input
                type="text"
                required
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      )}

      {/* Navigation Pills (Overview, Pedidos, Endereços, Carteira, Cupons) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        {[
          { id: 'overview', label: 'Visão Geral', icon: UserIcon },
          { id: 'orders', label: 'Meus Pedidos', icon: Clock },
          { id: 'addresses', label: 'Endereços', icon: MapPin },
          { id: 'wallet', label: 'Carteira & Pagamentos', icon: CreditCard },
          { id: 'coupons', label: 'Meus Cupons', icon: Ticket },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & IFOOD MENU CATEGORIES */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Active Order Quick Track Card */}
          {orders.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Pedido em Andamento #{orders[0].code}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {orders[0].items.length} itens · Previsão de entrega em ~25 min
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveView('order_tracking')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Acompanhar Rota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Grouped Actions (iFood Structure) */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm divide-y divide-stone-100 overflow-hidden">
            {/* Section 1: Pedidos */}
            <div className="p-2">
              <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Compras & Pedidos
              </p>
              
              <button
                onClick={() => setActiveTab('orders')}
                className="w-full px-4 py-3 hover:bg-stone-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Histórico de Pedidos</p>
                    <p className="text-[11px] text-stone-500">Consulte suas compras anteriores e repita pedidos com 1 clique</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveView('shopping_lists')}
                className="w-full px-4 py-3 hover:bg-stone-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <ListChecks className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Minhas Listas Inteligentes</p>
                    <p className="text-[11px] text-stone-500">{shoppingLists.length} listas personalizadas salvas</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Section 2: Carteira & Benefícios */}
            <div className="p-2">
              <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Pagamentos & Vantagens
              </p>

              <button
                onClick={() => setActiveTab('wallet')}
                className="w-full px-4 py-3 hover:bg-stone-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Carteira KMFood & Cartões Salvos</p>
                    <p className="text-[11px] text-stone-500">Gerencie cartões de crédito e saldo Pix</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className="w-full px-4 py-3 hover:bg-stone-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Ticket className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Cupons de Desconto</p>
                    <p className="text-[11px] text-stone-500">{coupons.length} cupons disponíveis para uso</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className="w-full px-4 py-3 hover:bg-stone-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Endereços de Entrega</p>
                    <p className="text-[11px] text-stone-500">{savedAddresses.length} endereços cadastrados ({currentAddress.street})</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Section 3: Sustentabilidade & Clube */}
            <div className="p-2">
              <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Sustentabilidade & Impacto
              </p>

              <div className="p-4 bg-emerald-50/70 rounded-2xl mx-2 my-1 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-950">Seu Impacto Agro KMFood</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800">Nível Ouro</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-white p-2 rounded-xl border border-emerald-200/60">
                    <p className="text-sm font-extrabold text-emerald-800 font-mono-numbers">14</p>
                    <p className="text-[10px] text-stone-500 leading-tight">Famílias apoiadas</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-200/60">
                    <p className="text-sm font-extrabold text-emerald-800 font-mono-numbers">3</p>
                    <p className="text-[10px] text-stone-500 leading-tight">Árvores plantadas</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-200/60">
                    <p className="text-sm font-extrabold text-emerald-800 font-mono-numbers">18.4 kg</p>
                    <p className="text-[10px] text-stone-500 leading-tight">CO₂ evitado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Ajuda & Termos */}
            <div className="p-2">
              <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Suporte & Segurança
              </p>

              <button
                onClick={() => {
                  const botBtn = document.querySelector('[data-bot-trigger]') as HTMLElement;
                  botBtn?.click();
                }}
                className="w-full px-4 py-3 hover:bg-stone-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Ajuda & Assistente Agro 24h</p>
                    <p className="text-[11px] text-stone-500">Tire dúvidas sobre entregas, pagamentos e produtos</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => logout()}
                className="w-full px-4 py-3 hover:bg-rose-50 rounded-2xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-rose-700">Desconectar da Conta</p>
                    <p className="text-[11px] text-rose-500">Encerrar sessão com segurança</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEUS PEDIDOS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-stone-900">
              Histórico de Pedidos ({orders.length})
            </h3>
          </div>

          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-stone-900">Pedido #{order.code}</span>
                  <p className="text-[11px] text-stone-400">Realizado em {order.address?.city || 'São Paulo'}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                  {order.status}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 font-mono-numbers">{item.quantity}x</span>
                      <span>{item.productName}</span>
                    </div>
                    <span className="font-mono-numbers font-medium">R$ {item.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <div>
                  <span className="text-[11px] text-stone-500">Total do Pedido</span>
                  <p className="text-sm font-extrabold font-mono-numbers text-stone-900">
                    R$ {order.items.reduce((acc, i) => acc + i.total, 0).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveView('order_tracking')}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    Rastrear Pedido
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ENDEREÇOS */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-stone-900">
              Endereços Salvos
            </h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Endereço</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {savedAddresses.map((addr) => {
              const isSelected = currentAddress.id === addr.id || addr.isDefault;
              return (
                <div
                  key={addr.id}
                  className={`bg-white rounded-3xl p-5 border transition-all ${
                    isSelected
                      ? 'border-emerald-600 shadow-md ring-1 ring-emerald-600/30'
                      : 'border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                      <h4 className="font-display font-bold text-xs text-stone-900">{addr.label}</h4>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Principal
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-700 mt-2 font-medium">
                    {addr.street}, {addr.number}
                  </p>
                  {addr.complement && (
                    <p className="text-[11px] text-stone-500">{addr.complement}</p>
                  )}
                  <p className="text-[11px] text-stone-500">
                    {addr.neighborhood} · {addr.city} - {addr.state} · CEP {addr.cep}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    {!isSelected ? (
                      <button
                        onClick={() => handleSetDefaultAddress(addr)}
                        className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                      >
                        Definir como Principal
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Endereço Atual de Entrega
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CARTEIRA & PAGAMENTOS */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">
                  Carteira Digital KMFood Pay
                </p>
                <h3 className="font-display font-extrabold text-3xl font-mono-numbers mt-1">
                  R$ {(currentUser.walletBalance || 125.50).toFixed(2).replace('.', ',')}
                </h3>
              </div>
              <button
                onClick={() => showToast('Chave Pix copiada para recarga imediata!')}
                className="px-4 py-2 bg-white text-emerald-950 font-bold text-xs rounded-xl shadow transition-all hover:bg-emerald-50 cursor-pointer"
              >
                + Recarregar Saldo
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-700/60 flex items-center justify-between text-xs text-emerald-100">
              <span>Cashback acumulado: R$ {(currentUser.cashback || 34.80).toFixed(2).replace('.', ',')}</span>
              <span>100% protegido por criptografia de ponta a ponta</span>
            </div>
          </div>

          {/* Saved Cards */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h4 className="font-display font-bold text-xs text-stone-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                Formas de Pagamento Salvas
              </h4>
              <button
                onClick={() => setShowCardModal(true)}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Cartão</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {paymentMethods.map((pay) => (
                <div key={pay.id} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700">
                      {pay.type === 'pix' ? <Coins className="w-4 h-4 text-emerald-600" /> : <CreditCard className="w-4 h-4 text-stone-700" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-800">{pay.label}</p>
                      <p className="text-[10px] text-stone-400 uppercase">{pay.brand || pay.type}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Ativo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MEUS CUPONS */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-stone-900">
              Cupons de Desconto Disponíveis ({coupons.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-extrabold text-sm text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300">
                      {coupon.code}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">
                      Válido até {coupon.validUntil}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-stone-900 mt-1">{coupon.description}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Pedido mínimo: R$ {coupon.minOrder.toFixed(2).replace('.', ',')}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </button>

                  <button
                    onClick={() => {
                      handleCopyCoupon(coupon.code);
                      setActiveView('cart');
                    }}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Usar na Cesta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Adicionar Novo Endereço */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <h4 className="font-display font-bold text-base text-stone-900 mb-1">
              Adicionar Novo Endereço
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Informe os dados de entrega para agilizar suas compras no KMFood.
            </p>

            <form onSubmit={handleAddAddress} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Apelido do Local</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Casa, Trabalho, Casa de Praia"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Logradouro / Rua</label>
                  <input
                    type="text"
                    required
                    placeholder="Rua / Av"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Número</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Complemento / Apto</label>
                  <input
                    type="text"
                    placeholder="Apto 42"
                    value={newComplement}
                    onChange={(e) => setNewComplement(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    required
                    placeholder="Bairro"
                    value={newNeighborhood}
                    onChange={(e) => setNewNeighborhood(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">CEP</label>
                  <input
                    type="text"
                    placeholder="01451-000"
                    value={newCep}
                    onChange={(e) => setNewCep(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
                >
                  Salvar Endereço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Adicionar Novo Cartão */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <h4 className="font-display font-bold text-base text-stone-900 mb-1">
              Adicionar Cartão de Crédito
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Transações criptografadas com padrão PCI-DSS.
            </p>

            <form onSubmit={handleAddCard} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nome no Cartão</label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Número do Cartão</label>
                <input
                  type="text"
                  required
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Validade (MM/AA)</label>
                  <input
                    type="text"
                    required
                    placeholder="12/28"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    placeholder="123"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCardModal(false)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
                >
                  Cadastrar Cartão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
