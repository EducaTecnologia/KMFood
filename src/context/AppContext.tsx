import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  Banner,
  DeliveryZone,
  FinancialTransaction,
  ChatMessage,
  PushNotification,
  Address,
  InventoryLot,
  ProductReview,
  ShoppingList,
  ContextChatMessage,
  GoogleMapsRoute
} from '../types';
import { Language, TranslationDictionary, translations } from '../data/translations';
import {
  INITIAL_USERS,
  CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_BANNERS,
  DELIVERY_ZONES,
  INITIAL_ORDERS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT,
  INITIAL_REVIEWS,
  INITIAL_SHOPPING_LISTS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  login: (emailOrPhone: string, role?: UserRole) => void;
  logout: () => void;
  
  // Internationalization (i18n)
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  
  // Catalog & Products CRUD
  products: Product[];
  categories: Category[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  addInventoryLot: (productId: string, lotData: Omit<InventoryLot, 'id' | 'receivedAt'>) => void;
  deleteInventoryLot: (productId: string, lotId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;
  cartCount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: { paymentMethod: 'pix' | 'credit_card' | 'money'; address: Address; notes?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, courierId?: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;

  // Views & Navigation
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  activeInstitutionalSlug: string | null;
  openInstitutional: (slug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Delivery & Address & Zones CRUD
  currentAddress: Address;
  setCurrentAddress: (address: Address) => void;
  deliveryZones: DeliveryZone[];
  addZone: (zone: Omit<DeliveryZone, 'id'>) => void;
  updateZone: (zone: DeliveryZone) => void;
  deleteZone: (id: string) => void;

  // Banners & CMS
  banners: Banner[];
  updateBanner: (banner: Banner) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  deleteBanner: (id: string) => void;

  // Finance & Transactions CRUD
  financialTransactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id' | 'date'>) => void;
  cancelTransaction: (id: string) => void;

  // Real-time Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, orderId?: string) => void;

  // Notifications
  notifications: PushNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  toastMessage: { text: string; type: 'success' | 'info' | 'warning' } | null;

  // Reviews System
  reviews: ProductReview[];
  addReview: (review: { productId: string; rating: number; comment: string }) => void;
  getProductReviews: (productId: string) => ProductReview[];

  // Shopping Lists System ("Listas de Compras")
  shoppingLists: ShoppingList[];
  createShoppingList: (title: string, icon?: string, color?: string) => ShoppingList;
  deleteShoppingList: (id: string) => void;
  addItemToShoppingList: (listId: string, productId: string, quantity?: number) => void;
  removeItemFromShoppingList: (listId: string, productId: string) => void;
  addListToCart: (listId: string) => void;

  // Collapsible Admin Sidebar
  adminSidebarCollapsed: boolean;
  setAdminSidebarCollapsed: (collapsed: boolean) => void;
  toggleAdminSidebar: () => void;

  // Context-Aware Chatbot
  botOpen: boolean;
  setBotOpen: (open: boolean) => void;
  botMessages: ContextChatMessage[];
  sendBotMessage: (text: string, forceThinking?: boolean) => void;

  // Google Maps Route & Places Agent
  mapsModalOpen: boolean;
  setMapsModalOpen: (open: boolean) => void;
  activeRoute: GoogleMapsRoute | null;
  calculateRoute: (destinationAddress: string) => void;

  // PDF Reports Modal
  activeReportModal: { title: string; subtitle: string; profile: string; data: any } | null;
  openReportModal: (title: string, subtitle: string, profile: string, data: any) => void;
  closeReportModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe localStorage helper
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`kmfood_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`kmfood_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage write error for ${key}:`, e);
    }
  };

  const [currentUser, setCurrentUser] = useState<User>(() => getStored('user', INITIAL_USERS[0]));
  const [language, setLanguageState] = useState<Language>(() => getStored('lang', 'pt'));

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStored('lang', lang);
  };

  const t = translations[language] || translations.pt;
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = getStored<Product[]>('products', INITIAL_PRODUCTS);
    // Keep updated images from mockData
    return stored.map((p) => {
      const init = INITIAL_PRODUCTS.find((ip) => ip.id === p.id);
      return init ? { ...p, image: init.image } : p;
    });
  });
  const [categories] = useState<Category[]>(CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>(() => getStored('cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => getStored('orders', INITIAL_ORDERS));
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [activeView, setActiveView] = useState<string>('ecommerce');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInstitutionalSlug, setActiveInstitutionalSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentAddress, setCurrentAddress] = useState<Address>(INITIAL_USERS[0].address!);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(() => getStored('zones', DELIVERY_ZONES));
  const [banners, setBanners] = useState<Banner[]>(() => getStored('banners', INITIAL_BANNERS));
  const [financialTransactions, setFinancialTransactions] = useState<FinancialTransaction[]>(() => getStored('transactions', INITIAL_TRANSACTIONS));
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => getStored('chat', INITIAL_CHAT));
  const [notifications, setNotifications] = useState<PushNotification[]>(() => getStored('notifications', INITIAL_NOTIFICATIONS));
  const [reviews, setReviews] = useState<ProductReview[]>(() => getStored('reviews', INITIAL_REVIEWS));
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>(() => getStored('lists', INITIAL_SHOPPING_LISTS));
  const [adminSidebarCollapsed, setAdminSidebarCollapsed] = useState<boolean>(() => getStored('sidebar_collapsed', false));
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Bot states
  const [botOpen, setBotOpen] = useState(false);
  const [botMessages, setBotMessages] = useState<ContextChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: 'Olá! Sou o Assistente Inteligente KMFood. Conheço os produtos frescos de hoje, seus pedidos em andamento e posso ajudar com listas de compras, receitas e dúvidas sobre entrega.',
      timestamp: 'Agora',
      suggestedActions: [
        { label: 'Onde está meu pedido?', action: 'track_order' },
        { label: 'O que tem fresco hoje?', action: 'fresh_today' },
        { label: 'Criar lista de compras', action: 'create_list' },
        { label: 'Calcular frete no mapa', action: 'calc_route' },
      ],
    },
  ]);

  // Google Maps state
  const [mapsModalOpen, setMapsModalOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<GoogleMapsRoute | null>({
    origin: 'Centro de Distribuição Agro Jaguaré - São Paulo, SP',
    destination: 'Av. Brigadeiro Faria Lima, 2232 - Jardim Paulistano, São Paulo, SP',
    distanceKm: 4.2,
    durationMinutes: 28,
    trafficStatus: 'leve',
    ecoFriendly: true,
    co2SavedKg: 0.85,
    steps: [
      'Saia da Av. Jaguaré em direção à Marginal Pinheiros',
      'Siga pela pista expressa da Marginal Pinheiros por 2.8 km',
      'Pegue a saída 14B para a Av. Rebouças / Faria Lima',
      'Vire à direita na Av. Brigadeiro Faria Lima até o número 2232',
      'Destino à direita (Portaria e Interfone apto 84)',
    ],
  });

  // PDF Report Modal state
  const [activeReportModal, setActiveReportModal] = useState<{ title: string; subtitle: string; profile: string; data: any } | null>(null);

  const openReportModal = (title: string, subtitle: string, profile: string, data: any) => {
    setActiveReportModal({ title, subtitle, profile, data });
  };

  const closeReportModal = () => {
    setActiveReportModal(null);
  };

  // Sync to localStorage
  useEffect(() => { setStored('products', products); }, [products]);
  useEffect(() => { setStored('cart', cart); }, [cart]);
  useEffect(() => { setStored('orders', orders); }, [orders]);
  useEffect(() => { setStored('reviews', reviews); }, [reviews]);
  useEffect(() => { setStored('lists', shoppingLists); }, [shoppingLists]);
  useEffect(() => { setStored('zones', deliveryZones); }, [deliveryZones]);
  useEffect(() => { setStored('banners', banners); }, [banners]);
  useEffect(() => { setStored('transactions', financialTransactions); }, [financialTransactions]);
  useEffect(() => { setStored('sidebar_collapsed', adminSidebarCollapsed); }, [adminSidebarCollapsed]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleAdminSidebar = () => {
    setAdminSidebarCollapsed((prev) => !prev);
  };

  const switchRole = (role: UserRole) => {
    const userMatch = INITIAL_USERS.find(u => u.role === role) || {
      id: `user-${role}-test`,
      name: `Usuário ${role.toUpperCase()}`,
      email: `${role}@kmfood.com.br`,
      phone: '(11) 99999-0000',
      role,
    };
    setCurrentUser(userMatch);
    setStored('user', userMatch);

    switch (role) {
      case 'customer':
        setActiveView('ecommerce');
        break;
      case 'admin':
        setActiveView('admin_dashboard');
        break;
      case 'operator':
        setActiveView('operator_orders');
        break;
      case 'stock':
        setActiveView('stock_management');
        break;
      case 'finance':
        setActiveView('finance_dashboard');
        break;
      case 'delivery':
        setActiveView('delivery_logistics');
        break;
      case 'courier':
        setActiveView('courier_panel');
        break;
      default:
        setActiveView('ecommerce');
    }

    showToast(`Perfil alterado para: ${role.toUpperCase()}`, 'info');
  };

  const login = (emailOrPhone: string, role?: UserRole) => {
    const targetRole = role || 'customer';
    switchRole(targetRole);
    showToast(`Bem-vindo(a) ao KMFood!`, 'success');
  };

  const logout = () => {
    switchRole('customer');
    showToast('Você saiu da sua conta', 'info');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartDiscount = appliedCoupon === 'KMFRETEGRATIS'
    ? 7.90
    : appliedCoupon === 'BEMVINDO15'
    ? Math.round(cartSubtotal * 0.15 * 100) / 100
    : 0;

  const cartDeliveryFee = appliedCoupon === 'KMFRETEGRATIS' || cartSubtotal >= 120 ? 0 : 7.90;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BEMVINDO15') {
      setAppliedCoupon('BEMVINDO15');
      showToast('Cupom de 15% OFF aplicado com sucesso!');
      return { success: true, message: 'Cupom de 15% aplicado!' };
    }
    if (clean === 'KMFRETEGRATIS') {
      setAppliedCoupon('KMFRETEGRATIS');
      showToast('Frete Grátis aplicado ao seu pedido!');
      return { success: true, message: 'Frete Grátis ativado!' };
    }
    return { success: false, message: 'Cupom inválido ou expirado.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupom removido');
  };

  // Orders creation
  const createOrder = ({
    paymentMethod,
    address,
    notes,
  }: {
    paymentMethod: 'pix' | 'credit_card' | 'money';
    address: Address;
    notes?: string;
  }) => {
    const newCode = `KM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrderId = `ord-${Date.now()}`;

    // FEFO Stock deduction
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const cartItem = cart.find(ci => ci.product.id === p.id);
        if (!cartItem) return p;

        let needed = cartItem.quantity;
        const updatedLots = p.lots.map(lot => {
          if (needed <= 0) return lot;
          const take = Math.min(lot.quantity, needed);
          needed -= take;
          return { ...lot, quantity: lot.quantity - take };
        });

        const newTotalStock = Math.max(0, p.stock - cartItem.quantity);
        return {
          ...p,
          stock: newTotalStock,
          lots: updatedLots,
        };
      })
    );

    const newOrder: Order = {
      id: newOrderId,
      code: newCode,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerEmail: currentUser.email,
      address,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        unit: item.product.unit,
        unitPrice: item.product.salePrice ?? item.product.price,
        quantity: item.quantity,
        total: (item.product.salePrice ?? item.product.price) * item.quantity,
        lotNumber: item.product.lots[0]?.lotNumber || 'LT-PADRAO',
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      status: 'pago',
      paymentMethod,
      paymentStatus: 'paid',
      couponCode: appliedCoupon || undefined,
      distanceKm: 3.2,
      estimatedDeliveryMinutes: 35,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes,
      timeline: [
        {
          status: 'novo',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          label: 'Pedido Realizado',
          description: 'Seu pedido foi registrado no sistema KMFood.',
        },
        {
          status: 'pago',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          label: paymentMethod === 'pix' ? 'Pagamento Pix Aprovado' : 'Pagamento Aprovado',
          description: 'Transação confirmada. Iniciando preparo da colheita.',
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      orderId: newOrderId,
      type: 'receita_venda',
      description: `Venda Pedido #${newCode} (${paymentMethod})`,
      amount: cartTotal,
      fee: paymentMethod === 'pix' ? Math.round(cartTotal * 0.0099 * 100) / 100 : Math.round(cartTotal * 0.0299 * 100) / 100,
      netAmount: cartTotal - (paymentMethod === 'pix' ? Math.round(cartTotal * 0.0099 * 100) / 100 : Math.round(cartTotal * 0.0299 * 100) / 100),
      paymentMethod,
      status: 'concluido',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setFinancialTransactions(prev => [newTx, ...prev]);

    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `Pedido ${newCode} Aprovado!`,
      message: `Seus produtos frescos estão sendo preparados com controle FEFO. Tempo estimado: 35 min.`,
      type: 'order',
      timestamp: 'Agora mesmo',
      read: false,
      link: '#rastreio',
    };
    setNotifications(prev => [newNotif, ...prev]);

    clearCart();
    setActiveView('order_tracking');
    showToast(`Pedido ${newCode} confirmado com sucesso!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, courierId?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let label = 'Status Atualizado';
        let description = 'O status do seu pedido mudou.';

        if (status === 'separacao') {
          label = 'Em Separação no CD Agro';
          description = 'Itens frescos colhidos e embalados para despacho térmico.';
        } else if (status === 'em_entrega') {
          label = 'Saiu para Entrega';
          description = 'Entregador parceiro a caminho do seu endereço.';
        } else if (status === 'entregue') {
          label = 'Pedido Entregue';
          description = 'Entrega concluída com sucesso. Bom apetite!';
        } else if (status === 'cancelado') {
          label = 'Pedido Cancelado';
          description = 'O pedido foi cancelado e o estorno processado.';
        }

        const newTimeline = [
          ...ord.timeline,
          { status, timestamp: timeStr, label, description },
        ];

        return {
          ...ord,
          status,
          courierId: courierId || ord.courierId,
          courierName: courierId ? 'Tiago Santos (Honda CG Cargo)' : ord.courierName,
          timeline: newTimeline,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    showToast(`Status do pedido atualizado para: ${status.toUpperCase()}`, 'info');
  };

  const cancelOrder = (orderId: string, reason: string) => {
    updateOrderStatus(orderId, 'cancelado');
    showToast(`Pedido cancelado: ${reason}`, 'warning');
  };

  // Products CRUD
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Produto "${updated.name}" atualizado.`);
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const prod: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts(prev => [prod, ...prev]);
    showToast(`Novo produto "${prod.name}" cadastrado!`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Produto excluído com sucesso.');
  };

  const addInventoryLot = (productId: string, lotData: Omit<InventoryLot, 'id' | 'receivedAt'>) => {
    const newLot: InventoryLot = {
      ...lotData,
      id: `lot-${Date.now()}`,
      receivedAt: new Date().toISOString().slice(0, 10),
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const newLots = [...p.lots, newLot];
        const newStock = p.stock + lotData.quantity;
        return {
          ...p,
          stock: newStock,
          lots: newLots,
        };
      })
    );

    showToast(`Lote ${lotData.lotNumber} recebido (+${lotData.quantity} unidades)!`);
  };

  const deleteInventoryLot = (productId: string, lotId: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const removedLot = p.lots.find(l => l.id === lotId);
        const qtyToReduce = removedLot ? removedLot.quantity : 0;
        return {
          ...p,
          stock: Math.max(0, p.stock - qtyToReduce),
          lots: p.lots.filter(l => l.id !== lotId),
        };
      })
    );
    showToast('Lote removido com sucesso.', 'info');
  };

  // Delivery Zones CRUD
  const addZone = (zoneData: Omit<DeliveryZone, 'id'>) => {
    const newZone: DeliveryZone = {
      ...zoneData,
      id: `zone-${Date.now()}`,
    };
    setDeliveryZones(prev => [...prev, newZone]);
    showToast(`Zona "${newZone.name}" cadastrada!`);
  };

  const updateZone = (updated: DeliveryZone) => {
    setDeliveryZones(prev => prev.map(z => (z.id === updated.id ? updated : z)));
    showToast(`Zona "${updated.name}" atualizada.`);
  };

  const deleteZone = (id: string) => {
    setDeliveryZones(prev => prev.filter(z => z.id !== id));
    showToast('Zona de entrega excluída.');
  };

  // Banners CRUD
  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...bannerData,
      id: `banner-${Date.now()}`,
    };
    setBanners(prev => [...prev, newBanner]);
    showToast('Novo banner cadastrado!');
  };

  const updateBanner = (updated: Banner) => {
    setBanners(prev => prev.map(b => (b.id === updated.id ? updated : b)));
    showToast('Banner promocional atualizado com sucesso.');
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    showToast('Banner excluído.');
  };

  // Financial Transactions CRUD
  const addTransaction = (txData: Omit<FinancialTransaction, 'id' | 'date'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setFinancialTransactions(prev => [newTx, ...prev]);
    showToast('Lançamento financeiro registrado!');
  };

  const cancelTransaction = (id: string) => {
    setFinancialTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'cancelado' } : t))
    );
    showToast('Lançamento cancelado.');
  };

  // Chat
  const sendChatMessage = (text: string, orderId?: string) => {
    if (!text.trim()) return;
    const isCustomer = currentUser.role === 'customer';
    const msg: ChatMessage = {
      id: `chat-${Date.now()}`,
      orderId: orderId || activeOrder?.id,
      sender: isCustomer ? 'customer' : 'operator',
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setChatMessages(prev => [...prev, msg]);

    if (isCustomer) {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `chat-${Date.now() + 1}`,
          orderId: orderId || activeOrder?.id,
          sender: 'operator',
          senderName: 'Lucas (Atendente KMFood)',
          text: 'Entendido! Nossa equipe do centro de distribuição já registrou sua mensagem e está priorizando sua solicitação.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        };
        setChatMessages(prev => [...prev, reply]);
        showToast('Nova mensagem do suporte KMFood', 'info');
      }, 1500);
    }
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Todas as notificações foram marcadas como lidas.');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Reviews System
  const addReview = ({ productId, rating, comment }: { productId: string; rating: number; comment: string }) => {
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      productId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);

    // Update product rating and reviewsCount
    const prodReviews = updated.filter(r => r.productId === productId);
    const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, rating: Math.round(avg * 10) / 10, reviewsCount: prodReviews.length }
          : p
      )
    );

    showToast('Avaliação publicada com sucesso! Obrigado pelo feedback.');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  // Shopping Lists System
  const createShoppingList = (title: string, icon = 'ShoppingBag', color = '#047857') => {
    const newList: ShoppingList = {
      id: `list-${Date.now()}`,
      userId: currentUser.id,
      title,
      icon,
      color,
      items: [],
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setShoppingLists(prev => [newList, ...prev]);
    showToast(`Lista "${title}" criada com sucesso!`);
    return newList;
  };

  const deleteShoppingList = (id: string) => {
    setShoppingLists(prev => prev.filter(l => l.id !== id));
    showToast('Lista de compras excluída.');
  };

  const addItemToShoppingList = (listId: string, productId: string, quantity = 1) => {
    setShoppingLists(prev =>
      prev.map(l => {
        if (l.id !== listId) return l;
        const existing = l.items.find(i => i.productId === productId);
        let newItems;
        if (existing) {
          newItems = l.items.map(i =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          newItems = [...l.items, { productId, quantity }];
        }
        return {
          ...l,
          items: newItems,
          updatedAt: new Date().toISOString().slice(0, 10),
        };
      })
    );
    showToast('Item adicionado à lista de compras!');
  };

  const removeItemFromShoppingList = (listId: string, productId: string) => {
    setShoppingLists(prev =>
      prev.map(l => {
        if (l.id !== listId) return l;
        return {
          ...l,
          items: l.items.filter(i => i.productId !== productId),
          updatedAt: new Date().toISOString().slice(0, 10),
        };
      })
    );
    showToast('Item removido da lista.');
  };

  const addListToCart = (listId: string) => {
    const list = shoppingLists.find(l => l.id === listId);
    if (!list) return;

    list.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity);
      }
    });
    showToast(`Todos os itens da lista "${list.title}" foram adicionados à cesta!`);
  };

  // Context Chatbot
  const sendBotMessage = (text: string, forceThinking = false) => {
    if (!text.trim()) return;

    const userMsg: ContextChatMessage = {
      id: `bot-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setBotMessages(prev => [...prev, userMsg]);

    const lower = text.toLowerCase();
    const isComplex = forceThinking || lower.includes('receita') || lower.includes('orçamento') || lower.includes('nutri') || lower.includes('cardápio') || lower.includes('compar') || lower.includes('por que');

    setTimeout(() => {
      let botReply = '';
      let thinkingSteps: string[] | undefined = undefined;

      if (isComplex) {
        thinkingSteps = [
          'Identificando intenção de alto nível e preferências alimentares do usuário.',
          'Consultando base de safras colhidas hoje e saldo de estoque com regra FEFO.',
          'Calculando harmonização de ingredientes agroecológicos com produtos em promoção.',
          'Verificando restrições de distância e tempo hábil de entrega expressa pelo CD Jaguaré.',
          'Sintetizando resposta assertiva e estruturada para máxima conversão e utilidade prática.',
        ];
      }

      if (lower.includes('pedido') || lower.includes('rastre') || lower.includes('onde')) {
        const latest = orders[0];
        botReply = `Seu pedido mais recente é o **#${latest?.code || 'KM-8921'}** no status **${latest?.status?.toUpperCase() || 'EM ENTREGA'}** para entrega em **${latest?.address?.neighborhood || 'seu endereço'}**. Prazo estimado: ~${latest?.estimatedDeliveryMinutes || 25} min. Você pode acompanhar a rota ao vivo no mapa!`;
      } else if (lower.includes('fresco') || lower.includes('safra') || lower.includes('hortifruti')) {
        botReply = `Hoje recebemos safra fresquíssima de **Tomate Grape Sweet Orgânico** (Holambra), **Alface Hidropônica**, **Bananas Prata de Encosta** e **Cenouras Baby**. Todos com inspeção de lote FEFO ativa e certificados de rastreabilidade!`;
      } else if (lower.includes('frete') || lower.includes('mapa') || lower.includes('distancia') || lower.includes('rota')) {
        botReply = `Nosso centro de distribuição fica no Jaguaré. Atendemos a sua região com taxa base de R$ 7,90 e frete grátis para compras acima de R$ 120,00! O agente Google Maps calcula o trajeto considerando tráfego leve e rotas de baixa emissão de carbono.`;
      } else if (lower.includes('lista') || lower.includes('compras')) {
        botReply = `Você possui **${shoppingLists.length} listas salvas** (como "${shoppingLists[0]?.title || 'Feira Semanal'}"). Você pode adicionar todos os itens de uma lista diretamente à cesta com 1 clique ou criar novas listas temáticas!`;
      } else if (lower.includes('receita') || lower.includes('cardápio') || lower.includes('jantar')) {
        botReply = `Com base nos produtos frescos de hoje, sugiro um **Risoto de Arroz Cateto com Tomates Confitados e Queijo da Canastra**! Tempo de preparo: 30 minutos. Os itens principais já estão disponíveis em nosso catálogo com colheita recente.`;
      } else {
        botReply = `Entendi perfeitamente! Como seu assistente agro KMFood, posso ajudar a calcular fretes, consultar lotes e validade FEFO, recomendar receitas balanceadas ou adicionar produtos diretamente à sua cesta de compras. Como posso te auxiliar agora?`;
      }

      const replyMsg: ContextChatMessage = {
        id: `bot-${Date.now() + 1}`,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingProcess: thinkingSteps,
        modelUsed: isComplex ? 'gemini-3.1-pro-preview (ThinkingLevel.HIGH)' : 'gemini-3.8-flash',
      };

      setBotMessages(prev => [...prev, replyMsg]);
    }, isComplex ? 1100 : 700);
  };

  // Google Maps calculate route
  const calculateRoute = (destination: string) => {
    setActiveRoute({
      origin: 'Centro de Distribuição Agro Jaguaré - São Paulo, SP',
      destination,
      distanceKm: 5.6,
      durationMinutes: 32,
      trafficStatus: 'moderado',
      ecoFriendly: true,
      co2SavedKg: 1.1,
      steps: [
        'Saída do Hub Logístico Jaguaré na Av. das Nações Unidas',
        'Acesso à Marginal Pinheiros sentido Ponte Estaiada',
        'Desvio inteligente por vias secundárias de baixa emissão',
        `Chegada prevista ao destino: ${destination}`,
      ],
    });
    showToast(`Rota calculada no Google Maps para: ${destination}`);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const openInstitutional = (slug: string) => {
    setActiveInstitutionalSlug(slug);
    setActiveView('institutional');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        login,
        logout,
        language,
        setLanguage,
        t,
        products,
        categories,
        updateProduct,
        addProduct,
        deleteProduct,
        addInventoryLot,
        deleteInventoryLot,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        cartCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        activeOrder,
        setActiveOrder,
        activeView,
        setActiveView,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        activeInstitutionalSlug,
        openInstitutional,
        searchQuery,
        setSearchQuery,
        currentAddress,
        setCurrentAddress,
        deliveryZones,
        addZone,
        updateZone,
        deleteZone,
        banners,
        updateBanner,
        addBanner,
        deleteBanner,
        financialTransactions,
        addTransaction,
        cancelTransaction,
        chatMessages,
        sendChatMessage,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        showToast,
        toastMessage,
        reviews,
        addReview,
        getProductReviews,
        shoppingLists,
        createShoppingList,
        deleteShoppingList,
        addItemToShoppingList,
        removeItemFromShoppingList,
        addListToCart,
        adminSidebarCollapsed,
        setAdminSidebarCollapsed,
        toggleAdminSidebar,
        botOpen,
        setBotOpen,
        botMessages,
        sendBotMessage,
        mapsModalOpen,
        setMapsModalOpen,
        activeRoute,
        calculateRoute,
        activeReportModal,
        openReportModal,
        closeReportModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
