import React, { useState } from 'react';
import {
  ChevronLeft,
  ShieldCheck,
  Phone,
  Mail,
  Briefcase,
  Truck,
  FileText,
  Lock,
  HelpCircle,
  CheckCircle2,
  Send,
  AlertTriangle,
  Building,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_JOBS } from '../data/mockData';

export const InstitutionalView: React.FC = () => {
  const { activeInstitutionalSlug, openInstitutional, setActiveView, showToast } = useApp();

  const currentSlug = activeInstitutionalSlug || 'institucional';

  // Forms states
  const [contactSubject, setContactSubject] = useState('Dúvida sobre Pedido');
  const [contactMessage, setContactMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Career application
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [jobName, setJobName] = useState('');
  const [jobEmail, setJobEmail] = useState('');
  const [jobResumeNote, setJobResumeNote] = useState('');

  // Courier application
  const [courierName, setCourierName] = useState('');
  const [courierPhone, setCourierPhone] = useState('');
  const [courierVehicle, setCourierVehicle] = useState('Moto');
  const [courierCity, setCourierCity] = useState('São Paulo - SP');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const protocol = `SAC-${Math.floor(100000 + Math.random() * 900000)}`;
    showToast(`Mensagem enviada com sucesso! Protocolo: ${protocol}`, 'success');
    setContactMessage('');
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Candidatura recebida! Nossa equipe de Gente & Gestão entrará em contato.`, 'success');
    setSelectedJobId(null);
  };

  const handleCourierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Cadastro de entregador parceiro recebido com sucesso!`, 'success');
    setCourierName('');
    setCourierPhone('');
  };

  const pages = [
    { slug: 'institucional', label: 'Site Institucional', icon: Building },
    { slug: 'fale-conosco', label: 'Fale Conosco', icon: Phone },
    { slug: 'contas-e-seguranca', label: 'Conta e Segurança', icon: Lock },
    { slug: 'carreiras', label: 'Carreiras', icon: Briefcase },
    { slug: 'entregadores', label: 'Seja Entregador', icon: Truck },
    { slug: 'termos-e-condicoes', label: 'Termos de Uso', icon: FileText },
    { slug: 'codigo-de-conduta', label: 'Código de Conduta', icon: ShieldCheck },
    { slug: 'privacidade', label: 'Privacidade (LGPD)', icon: Lock },
    { slug: 'dicas-de-seguranca', label: 'Dicas de Segurança', icon: AlertTriangle },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
        <button
          onClick={() => setActiveView('ecommerce')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-800 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar ao Mercado</span>
        </button>

        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Central Institucional KMFood
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="md:col-span-1 space-y-1">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-3 shadow-xs">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-2 py-1.5 mb-1">
              Páginas Institucionais
            </p>
            {pages.map((p) => {
              const Icon = p.icon;
              const isActive = currentSlug === p.slug;

              return (
                <button
                  key={p.slug}
                  onClick={() => openInstitutional(p.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span className="truncate">{p.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area (3 cols) */}
        <main className="md:col-span-3 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
          
          {/* 1. INSTITUCIONAL */}
          {currentSlug === 'institucional' && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Quem Somos
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
                Do Campo à Mesa com Respeito à Terra e às Famílias Rurais
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                A <strong>KMFood</strong> nasceu com o propósito de conectar de forma transparente e justa os pequenos produtores agrícolas, cooperativas agroecológicas e consumidores urbanos que valorizam alimentos autênticos, de safra nova e com procedência rastreada.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="font-display font-extrabold text-2xl text-emerald-950 font-mono-numbers block">
                    140+
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold mt-1 block">
                    Cooperativas Parceiras
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="font-display font-extrabold text-2xl text-emerald-950 font-mono-numbers block">
                    35 min
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold mt-1 block">
                    Tempo Médio de Entrega
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="font-display font-extrabold text-2xl text-emerald-950 font-mono-numbers block">
                    100%
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold mt-1 block">
                    Rastreio de Lotes FEFO
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <h3 className="font-display font-bold text-base text-stone-900">Nossa Missão & Valores</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Remuneração Justa:</strong> Pagamos acima do mercado convencional diretamente aos agricultores familiares.</li>
                  <li><strong>Desperdício Zero:</strong> Algoritmos de demanda que evitam o descarte de safras perecíveis.</li>
                  <li><strong>Sustentabilidade Real:</strong> Embalagens 100% biodegradáveis e rotas otimizadas com veículos limpos.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. FALE CONOSCO */}
          {currentSlug === 'fale-conosco' && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Atendimento & SAC
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Fale Conosco — Central de Atendimento
              </h1>
              <p className="text-xs text-stone-600">
                Estamos disponíveis todos os dias das 07h00 às 22h00 para apoiar sua experiência.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">WhatsApp Oficial KMFood</span>
                    <span className="text-xs text-stone-500 font-mono-numbers">(11) 98765-4321</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-stone-200 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">E-mail de Suporte</span>
                    <span className="text-xs text-stone-500">atendimento@kmfood.com.br</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-3 pt-4 border-t border-stone-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Seu Nome</label>
                    <input
                      type="text"
                      required
                      placeholder="Carolina Mendes"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Seu E-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Assunto</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  >
                    <option value="Dúvida sobre Pedido">Dúvida sobre Pedido ou Entrega</option>
                    <option value="Sugestão ou Reclamação">Sugestão sobre Produtos Agro</option>
                    <option value="Parceria de Produtor">Quero fornecer alimentos / Sou produtor rural</option>
                    <option value="Outros">Outros Assuntos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva detalhadamente sua dúvida ou solicitação..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          )}

          {/* 3. CONTA E SEGURANÇA */}
          {currentSlug === 'contas-e-seguranca' && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Privacidade & Segurança
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Conta e Segurança do Usuário
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                No KMFood, seus dados pessoais e transacionais são protegidos por criptografia de ponta a ponta e rígida governança alinhada à LGPD.
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                <h3 className="font-bold text-stone-900">Dispositivos & Sessões Ativas</h3>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <div>
                    <span className="font-semibold text-stone-800 block">Navegador Atual (Chrome no Linux)</span>
                    <span className="text-[11px] text-stone-400">Sessão iniciada hoje às 16h28</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Ativa</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-stone-900">Seus Direitos LGPD</h3>
                <p className="text-stone-600">
                  Você pode solicitar a qualquer momento a exportação integral dos seus dados ou a exclusão da sua conta pelo canal de privacidade: <strong>dpo@kmfood.com.br</strong>.
                </p>
              </div>
            </div>
          )}

          {/* 4. CARREIRAS */}
          {currentSlug === 'carreiras' && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Trabalhe Conosco
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Carreiras no KMFood
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                Junte-se a um time que une tecnologia de ponta, agilidade logística e impacto socioambiental no agronegócio sustentável.
              </p>

              <div className="space-y-3">
                {CAREER_JOBS.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                          {job.area} · {job.modality}
                        </span>
                        <h4 className="font-bold text-sm text-stone-900 mt-0.5">{job.title}</h4>
                        <p className="text-xs text-stone-500">{job.location}</p>
                      </div>
                      <button
                        onClick={() => setSelectedJobId(job.id)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Candidatar-se
                      </button>
                    </div>

                    <p className="text-xs text-stone-600 mt-2">{job.description}</p>
                  </div>
                ))}
              </div>

              {selectedJobId && (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 mt-4 animate-in fade-in">
                  <h3 className="font-bold text-sm text-emerald-950 mb-2">Formulário de Candidatura</h3>
                  <form onSubmit={handleCareerSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                        className="p-2 bg-white border border-stone-200 rounded-lg text-xs"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Seu e-mail"
                        value={jobEmail}
                        onChange={(e) => setJobEmail(e.target.value)}
                        className="p-2 bg-white border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Link do seu LinkedIn ou resumo de experiência..."
                      value={jobResumeNote}
                      onChange={(e) => setJobResumeNote(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-200 rounded-lg text-xs"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Enviar Currículo
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedJobId(null)}
                        className="px-3 py-2 bg-white text-stone-600 rounded-lg text-xs"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* 5. SEJA ENTREGADOR */}
          {currentSlug === 'entregadores' && (
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Parceria de Logística
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Seja um Entregador Parceiro KMFood
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                Trabalhe com flexibilidade, rotas otimizadas na sua região e repasses semanais transparentes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <span className="font-bold text-stone-900 block">Ganhos por Corrida</span>
                  <span className="text-stone-500 mt-1 block">R$ 12 a R$ 28 por entrega + taxa por km</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <span className="font-bold text-stone-900 block">Raio Reduzido</span>
                  <span className="text-stone-500 mt-1 block">Entregas de proximidade em raio até 6km</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <span className="font-bold text-stone-900 block">Repasse Ágil</span>
                  <span className="text-stone-500 mt-1 block">Pagamento toda segunda-feira via Pix</span>
                </div>
              </div>

              {/* Courier Application Form */}
              <form onSubmit={handleCourierSubmit} className="space-y-3 pt-4 border-t border-stone-100">
                <h3 className="font-bold text-sm text-stone-900">Cadastre-se para Entregar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefone / WhatsApp com DDD"
                    value={courierPhone}
                    onChange={(e) => setCourierPhone(e.target.value)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={courierVehicle}
                    onChange={(e) => setCourierVehicle(e.target.value)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  >
                    <option value="Moto">Motocicleta</option>
                    <option value="Bicicleta">Bicicleta / E-bike</option>
                    <option value="Carro / Fiorino">Carro / Utilitário / Fiorino</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Cidade / Bairro de Atuação"
                    value={courierCity}
                    onChange={(e) => setCourierCity(e.target.value)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Enviar Cadastro de Entregador
                </button>
              </form>
            </div>
          )}

          {/* 6. TERMOS DE USO */}
          {currentSlug === 'termos-e-condicoes' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Legal
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Termos e Condições de Uso KMFood
              </h1>
              <p>
                Estes termos regem o uso do aplicativo e da plataforma web KMFood. Ao realizar um pedido, o usuário concorda com as políticas de entrega, cancelamento e precificação aqui descritas.
              </p>
              <h3 className="font-bold text-stone-900">1. Alimentos Perecíveis e Validade</h3>
              <p>
                Todos os produtos perecíveis contam com rígido controle FEFO (First Expired, First Out). Em caso de item que não corresponda ao padrão de frescor, o cliente dispõe de 2 horas após a entrega para solicitar substituição ou estorno via chat.
              </p>
              <h3 className="font-bold text-stone-900">2. Horários e Cancelamento</h3>
              <p>
                O cancelamento sem cobrança pode ser realizado enquanto o pedido se encontrar no estado "Novo" ou "Pago", antes do início da separação física dos alimentos.
              </p>
            </div>
          )}

          {/* 7. CÓDIGO DE CONDUTA */}
          {currentSlug === 'codigo-de-conduta' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Ética Agro
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Código de Conduta & Integridade KMFood
              </h1>
              <p>
                Nosso compromisso é com o comércio ético, o bem-estar animal, a preservação de nascentes e o combate irrestrito a qualquer forma de trabalho degradante no campo.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Respeito mútuo entre clientes, produtores rurais, operadores e entregadores parceiros.</li>
                <li>Tolerância zero para discriminação, assédio ou práticas desleais de mercado.</li>
                <li>Canal confidencial de ética e denúncias: <strong>etica@kmfood.com.br</strong>.</li>
              </ul>
            </div>
          )}

          {/* 8. PRIVACIDADE LGPD */}
          {currentSlug === 'privacidade' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                LGPD
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Política de Privacidade & Proteção de Dados
              </h1>
              <p>
                A KMFood trata os dados dos seus usuários de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </p>
              <h3 className="font-bold text-stone-900">Dados Coletados</h3>
              <p>
                Nome, telefone, endereço de entrega e histórico de pedidos exclusivamente para o processamento de compras e emissão de notas fiscais. Não comercializamos dados com terceiros.
              </p>
            </div>
          )}

          {/* 9. DICAS DE SEGURANÇA */}
          {currentSlug === 'dicas-de-seguranca' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Prevenção
              </span>
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                Dicas de Segurança contra Fraudes
              </h1>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                  <strong className="block font-bold">1. Pagamento Pix Oficial</strong>
                  <span>Nossos códigos Pix têm como beneficiário exclusivo "KMFOOD COMERCIO LTDA". Nunca pague a pessoas físicas não autorizadas.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <strong className="block font-bold">2. Identificação do Entregador</strong>
                  <span>Confira sempre o nome do entregador no app antes de receber sua encomenda na portaria.</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
