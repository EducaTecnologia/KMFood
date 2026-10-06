export type Language = 'pt' | 'en' | 'fr';

export interface TranslationDictionary {
  // Navigation & General
  home: string;
  categories: string;
  orders: string;
  cart: string;
  account: string;
  login: string;
  logout: string;
  searchPlaceholder: string;
  allHarvests: string;
  freshProduce: string;
  meatButcher: string;
  grainsCereals: string;
  coffeeCocoa: string;
  cheeseDairy: string;
  ecoCleaning: string;
  naturalHygiene: string;
  helpSupport: string;
  deliveryTo: string;
  searchShortcutsTitle: string;
  terms: string[];
  
  // Cart & Checkout
  shoppingCart: string;
  continueShopping: string;
  emptyCart: string;
  cartEmptyTitle: string;
  cartEmptySubtitle: string;
  exploreProduce: string;
  freeShippingProgress: string;
  freeShippingEarned: string;
  orderSummary: string;
  couponPlaceholder: string;
  apply: string;
  couponActive: string;
  productsSubtotal: string;
  couponDiscount: string;
  deliveryFee: string;
  free: string;
  totalToPay: string;
  paymentNotice: string;
  proceedToCheckout: string;
  secureEnvironment: string;
  removeProduct: string;
  
  // Checkout Details
  finishOrder: string;
  stepAddress: string;
  stepSchedule: string;
  stepPayment: string;
  stepBack: string;
  backToCart: string;
  deliveryAddress: string;
  selectDeliveryTime: string;
  express35min: string;
  scheduledTime: string;
  paymentMethod: string;
  pixInstant: string;
  creditCard: string;
  cashOnDelivery: string;
  orderNotes: string;
  placeOrder: string;
  orderPlacedSuccess: string;
  
  // Product Card & List
  addToBag: string;
  addedToBag: string;
  organic: string;
  artisan: string;
  perUnit: string;
  reviews: string;
  noReviewsYet: string;
  ratingAverage: string;
  evaluateProduct: string;
  leaveReview: string;
  sendReview: string;
  verifiedPurchase: string;
  
  // Dashboards & Roles
  roleCustomer: string;
  roleAdmin: string;
  roleOperator: string;
  roleStock: string;
  roleFinance: string;
  roleDelivery: string;
  roleCourier: string;
  adminPanel: string;
  ordersManagement: string;
  stockManagement: string;
  financialControl: string;
  deliveryLogistics: string;
  courierApp: string;
  cmsBanners: string;
  exportPdf: string;
  filterByStatus: string;
  
  // Footer
  institutional: string;
  aboutUs: string;
  contactSac: string;
  accountSecurity: string;
  privacyTerms: string;
  organicCert: string;
  sustainableAgro: string;
  allRightsReserved: string;
  
  // Language Names
  portuguese: string;
  english: string;
  french: string;
  selectLanguage: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  pt: {
    // Navigation & General
    home: 'Início',
    categories: 'Categorias',
    orders: 'Pedidos',
    cart: 'Cesta',
    account: 'Conta',
    login: 'Entrar',
    logout: 'Sair',
    searchPlaceholder: 'Buscar alimentos frescos, hortifrúti, grãos, limpeza...',
    allHarvests: 'Todas as Safras',
    freshProduce: 'Hortifrúti Fresco',
    meatButcher: 'Carnes & Açougue',
    grainsCereals: 'Grãos & Cereais',
    coffeeCocoa: 'Cafés & Cacau',
    cheeseDairy: 'Frios & Queijos',
    ecoCleaning: 'Limpeza Ecológica',
    naturalHygiene: 'Higiene Natural',
    helpSupport: 'Ajuda & SAC',
    deliveryTo: 'Onde você quer receber?',
    searchShortcutsTitle: 'Termos mais buscados hoje',
    terms: ['Tomate Orgânico', 'Picanha Angus', 'Café Especial', 'Feijão Safra', 'Queijo Canastra', 'Detergente Bio'],
    
    // Cart & Checkout
    shoppingCart: 'Cesta de Compras',
    continueShopping: 'Continuar Comprando',
    emptyCart: 'Esvaziar Cesta',
    cartEmptyTitle: 'Sua cesta está vazia',
    cartEmptySubtitle: 'Adicione frutas, verduras colhidas no dia, carnes artesanais e itens agroecológicos para sua casa.',
    exploreProduce: 'Explorar Hortifrúti Fresco',
    freeShippingProgress: 'Faltam R$ {value} para Frete Grátis!',
    freeShippingEarned: 'Parabéns! Você ganhou Frete Grátis nesta compra!',
    orderSummary: 'Resumo do Pedido',
    couponPlaceholder: 'Cupom (ex: BEMVINDO15)',
    apply: 'Aplicar',
    couponActive: 'Cupom ativo:',
    productsSubtotal: 'Subtotal dos produtos',
    couponDiscount: 'Desconto do Cupom',
    deliveryFee: 'Taxa de Entrega Agro',
    free: 'Grátis',
    totalToPay: 'Total a Pagar',
    paymentNotice: 'Em até 3x sem juros ou Pix instantâneo',
    proceedToCheckout: 'Avançar para o Checkout',
    secureEnvironment: 'Ambiente 100% Criptografado & Seguro',
    removeProduct: 'Remover produto',
    
    // Checkout Details
    finishOrder: 'Finalizar Pedido',
    stepAddress: 'Endereço',
    stepSchedule: 'Agendamento',
    stepPayment: 'Pagamento',
    stepBack: 'Voltar Etapa',
    backToCart: 'Voltar à Cesta',
    deliveryAddress: 'Endereço de Entrega',
    selectDeliveryTime: 'Janela de Entrega',
    express35min: 'Entrega Expressa (35 - 45 min)',
    scheduledTime: 'Entrega Agendada',
    paymentMethod: 'Forma de Pagamento',
    pixInstant: 'Pix Instantâneo (Aprovação Imediata)',
    creditCard: 'Cartão de Crédito',
    cashOnDelivery: 'Dinheiro na Entrega',
    orderNotes: 'Observações do Pedido',
    placeOrder: 'Confirmar e Finalizar Pedido',
    orderPlacedSuccess: 'Pedido Realizado com Sucesso!',
    
    // Product Card & List
    addToBag: 'Adicionar',
    addedToBag: 'Na Cesta',
    organic: 'Orgânico',
    artisan: 'Artesanal',
    perUnit: 'por',
    reviews: 'avaliações',
    noReviewsYet: 'Sem avaliações ainda',
    ratingAverage: 'Avaliação Geral',
    evaluateProduct: 'Avaliar Produto',
    leaveReview: 'Deixe seu comentário e nota',
    sendReview: 'Enviar Avaliação',
    verifiedPurchase: 'Compra Verificada',
    
    // Dashboards & Roles
    roleCustomer: 'Cliente (E-commerce)',
    roleAdmin: 'Administrador Geral',
    roleOperator: 'Operador de Pedidos',
    roleStock: 'Gestão de Estoque FEFO',
    roleFinance: 'Financeiro & Conciliação',
    roleDelivery: 'Logística de Entregas',
    roleCourier: 'Entregador Parceiro',
    adminPanel: 'Painel Administrativo',
    ordersManagement: 'Gestão de Pedidos',
    stockManagement: 'Gestão de Estoque',
    financialControl: 'Controle Financeiro',
    deliveryLogistics: 'Logística de Entregas',
    courierApp: 'Área do Entregador',
    cmsBanners: 'Gerenciador CMS',
    exportPdf: 'Exportar Relatório em PDF',
    filterByStatus: 'Filtrar por status',
    
    // Footer
    institutional: 'Institucional',
    aboutUs: 'Site Institucional (Quem Somos)',
    contactSac: 'Fale Conosco & SAC',
    accountSecurity: 'Conta e Segurança',
    privacyTerms: 'Termos de Uso e Privacidade',
    organicCert: 'Certificação Orgânica e Sustentável',
    sustainableAgro: 'Alimentos Direto do Produtor Rural Familiar',
    allRightsReserved: 'Todos os direitos reservados.',
    
    // Languages
    portuguese: 'Português (Brasil)',
    english: 'English (US)',
    french: 'Français (France)',
    selectLanguage: 'Idioma / Language'
  },
  en: {
    // Navigation & General
    home: 'Home',
    categories: 'Categories',
    orders: 'Orders',
    cart: 'Cart',
    account: 'Account',
    login: 'Log In',
    logout: 'Log Out',
    searchPlaceholder: 'Search fresh food, farm produce, grains, cleaning...',
    allHarvests: 'All Harvests',
    freshProduce: 'Fresh Produce',
    meatButcher: 'Meat & Butcher',
    grainsCereals: 'Grains & Cereals',
    coffeeCocoa: 'Coffee & Cocoa',
    cheeseDairy: 'Cheese & Dairy',
    ecoCleaning: 'Eco Cleaning',
    naturalHygiene: 'Natural Hygiene',
    helpSupport: 'Help & SAC',
    deliveryTo: 'Where do you want your delivery?',
    searchShortcutsTitle: 'Top searches today',
    terms: ['Organic Tomato', 'Angus Steak', 'Specialty Coffee', 'Farm Beans', 'Canastra Cheese', 'Bio Detergent'],
    
    // Cart & Checkout
    shoppingCart: 'Shopping Cart',
    continueShopping: 'Continue Shopping',
    emptyCart: 'Empty Cart',
    cartEmptyTitle: 'Your cart is empty',
    cartEmptySubtitle: 'Add fresh farm fruit, daily harvest vegetables, artisan cuts and eco-friendly products for your home.',
    exploreProduce: 'Explore Fresh Produce',
    freeShippingProgress: 'Add R$ {value} more for Free Shipping!',
    freeShippingEarned: 'Congratulations! You unlocked Free Shipping on this order!',
    orderSummary: 'Order Summary',
    couponPlaceholder: 'Coupon code (e.g. WELCOME15)',
    apply: 'Apply',
    couponActive: 'Active coupon:',
    productsSubtotal: 'Products subtotal',
    couponDiscount: 'Coupon discount',
    deliveryFee: 'Farm Delivery Fee',
    free: 'Free',
    totalToPay: 'Total to Pay',
    paymentNotice: 'Up to 3x interest-free or instant Pix',
    proceedToCheckout: 'Proceed to Checkout',
    secureEnvironment: '100% Encrypted & Secure Environment',
    removeProduct: 'Remove product',
    
    // Checkout Details
    finishOrder: 'Complete Order',
    stepAddress: 'Address',
    stepSchedule: 'Schedule',
    stepPayment: 'Payment',
    stepBack: 'Previous Step',
    backToCart: 'Back to Cart',
    deliveryAddress: 'Delivery Address',
    selectDeliveryTime: 'Delivery Time Window',
    express35min: 'Express Delivery (35 - 45 min)',
    scheduledTime: 'Scheduled Delivery',
    paymentMethod: 'Payment Method',
    pixInstant: 'Pix Instant (Instant Confirmation)',
    creditCard: 'Credit Card',
    cashOnDelivery: 'Cash on Delivery',
    orderNotes: 'Order Notes',
    placeOrder: 'Confirm & Place Order',
    orderPlacedSuccess: 'Order Placed Successfully!',
    
    // Product Card & List
    addToBag: 'Add to Cart',
    addedToBag: 'In Cart',
    organic: 'Organic',
    artisan: 'Artisanal',
    perUnit: 'per',
    reviews: 'reviews',
    noReviewsYet: 'No reviews yet',
    ratingAverage: 'Overall Rating',
    evaluateProduct: 'Rate Product',
    leaveReview: 'Leave your comment and rating',
    sendReview: 'Submit Review',
    verifiedPurchase: 'Verified Purchase',
    
    // Dashboards & Roles
    roleCustomer: 'Customer (Storefront)',
    roleAdmin: 'General Administrator',
    roleOperator: 'Order Fulfillment Operator',
    roleStock: 'FEFO Stock Management',
    roleFinance: 'Finance & Reconciliation',
    roleDelivery: 'Delivery Logistics',
    roleCourier: 'Partner Courier',
    adminPanel: 'Admin Dashboard',
    ordersManagement: 'Orders Management',
    stockManagement: 'Stock Management',
    financialControl: 'Financial Control',
    deliveryLogistics: 'Delivery Logistics',
    courierApp: 'Courier Hub',
    cmsBanners: 'CMS Banner Manager',
    exportPdf: 'Export PDF Report',
    filterByStatus: 'Filter by status',
    
    // Footer
    institutional: 'Company',
    aboutUs: 'About KMFood & Mission',
    contactSac: 'Contact Support & Helpdesk',
    accountSecurity: 'Account & Security',
    privacyTerms: 'Terms of Use & Privacy',
    organicCert: 'Certified Organic & Sustainable',
    sustainableAgro: 'Direct from Family Farm Producers',
    allRightsReserved: 'All rights reserved.',
    
    // Languages
    portuguese: 'Portuguese (Brazil)',
    english: 'English (US)',
    french: 'French (France)',
    selectLanguage: 'Language'
  },
  fr: {
    // Navigation & General
    home: 'Accueil',
    categories: 'Catégories',
    orders: 'Commandes',
    cart: 'Panier',
    account: 'Compte',
    login: 'Se Connecter',
    logout: 'Déconnexion',
    searchPlaceholder: 'Rechercher des produits frais, potager, céréales, entretien...',
    allHarvests: 'Toutes les Récoltes',
    freshProduce: 'Fruits & Légumes Frais',
    meatButcher: 'Boucherie & Viandes',
    grainsCereals: 'Grains & Céréales',
    coffeeCocoa: 'Cafés & Cacao',
    cheeseDairy: 'Fromages & Produits Laitiers',
    ecoCleaning: 'Nettoyage Écologique',
    naturalHygiene: 'Hygiène Naturelle',
    helpSupport: 'Aide & Service Client',
    deliveryTo: 'Où souhaitez-vous être livré ?',
    searchShortcutsTitle: 'Recherches populaires aujourd’hui',
    terms: ['Tomate Bio', 'Picanha Angus', 'Café de Spécialité', 'Haricots de Ferme', 'Fromage Artisanal', 'Lessive Éco'],
    
    // Cart & Checkout
    shoppingCart: 'Panier d’Achat',
    continueShopping: 'Continuer les Achats',
    emptyCart: 'Vider le Panier',
    cartEmptyTitle: 'Votre panier est vide',
    cartEmptySubtitle: 'Ajoutez des fruits et légumes cueillis du jour, des viandes artisanales et des produits éco-responsables.',
    exploreProduce: 'Découvrir le Potager Frais',
    freeShippingProgress: 'Plus que R$ {value} pour la Livraison Gratuite !',
    freeShippingEarned: 'Félicitations ! Livraison gratuite débloquée !',
    orderSummary: 'Récapitulatif de Commande',
    couponPlaceholder: 'Code promo (ex: BIENVENUE15)',
    apply: 'Appliquer',
    couponActive: 'Code promo actif :',
    productsSubtotal: 'Sous-total des produits',
    couponDiscount: 'Remise du Coupon',
    deliveryFee: 'Frais de Livraison Fermière',
    free: 'Gratuit',
    totalToPay: 'Total à Payer',
    paymentNotice: 'Paiement sécurisé en 3x sans frais ou Pix instantané',
    proceedToCheckout: 'Passer la Commande',
    secureEnvironment: 'Environnement 100% Chiffré & Sécurisé',
    removeProduct: 'Supprimer l’article',
    
    // Checkout Details
    finishOrder: 'Finaliser la Commande',
    stepAddress: 'Adresse',
    stepSchedule: 'Créneau',
    stepPayment: 'Paiement',
    stepBack: 'Étape Précédente',
    backToCart: 'Retour au Panier',
    deliveryAddress: 'Adresse de Livraison',
    selectDeliveryTime: 'Créneau de Livraison',
    express35min: 'Livraison Express (35 - 45 min)',
    scheduledTime: 'Livraison Programmée',
    paymentMethod: 'Mode de Paiement',
    pixInstant: 'Pix Instantané (Validation Immédiate)',
    creditCard: 'Carte Bancaire',
    cashOnDelivery: 'Paiement à la Livraison',
    orderNotes: 'Instructions de Livraison',
    placeOrder: 'Confirmer la Commande',
    orderPlacedSuccess: 'Commande Confirmée avec Succès !',
    
    // Product Card & List
    addToBag: 'Ajouter',
    addedToBag: 'Au Panier',
    organic: 'Biologique',
    artisan: 'Artisanal',
    perUnit: 'par',
    reviews: 'avis',
    noReviewsYet: 'Aucun avis pour l’instant',
    ratingAverage: 'Note Globale',
    evaluateProduct: 'Évaluer le Produit',
    leaveReview: 'Laissez votre note et commentaire',
    sendReview: 'Publier l’Avis',
    verifiedPurchase: 'Achat Vérifié',
    
    // Dashboards & Roles
    roleCustomer: 'Client (Boutique)',
    roleAdmin: 'Administrateur Général',
    roleOperator: 'Opérateur de Commandes',
    roleStock: 'Gestion des Stocks FEFO',
    roleFinance: 'Finances & Rapprochement',
    roleDelivery: 'Logistique des Livraisons',
    roleCourier: 'Livreur Partenaire',
    adminPanel: 'Tableau de Bord Admin',
    ordersManagement: 'Gestion des Commandes',
    stockManagement: 'Gestion des Stocks',
    financialControl: 'Contrôle Financier',
    deliveryLogistics: 'Logistique de Livraison',
    courierApp: 'Espace Livreur',
    cmsBanners: 'Gestionnaire de Bannières',
    exportPdf: 'Exporter le Rapport en PDF',
    filterByStatus: 'Filtrer par statut',
    
    // Footer
    institutional: 'Institutionnel',
    aboutUs: 'Qui Sommes-Nous ?',
    contactSac: 'Contact & Service Client',
    accountSecurity: 'Compte & Sécurité',
    privacyTerms: 'Conditions Générales & Confidentialité',
    organicCert: 'Certification Biologique et Durable',
    sustainableAgro: 'Aliments Directs des Producteurs Ruraux Familiaux',
    allRightsReserved: 'Tous droits réservés.',
    
    // Languages
    portuguese: 'Portugais (Brésil)',
    english: 'Anglais (États-Unis)',
    french: 'Français (France)',
    selectLanguage: 'Langue'
  }
};
