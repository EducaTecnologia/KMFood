import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Leaf,
  ShieldCheck,
  Search,
  X,
  Truck,
  Building,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GoogleMapsAgentModal: React.FC = () => {
  const {
    mapsModalOpen,
    setMapsModalOpen,
    activeRoute,
    calculateRoute,
    currentAddress
  } = useApp();

  const [destInput, setDestInput] = useState(
    `${currentAddress.street}, ${currentAddress.number} - ${currentAddress.neighborhood}, ${currentAddress.city}`
  );

  if (!mapsModalOpen) return null;

  const handleSearchRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (destInput.trim()) {
      calculateRoute(destInput.trim());
    }
  };

  const partnerHubs = [
    { name: 'Sítio Boa Esperança (Hortifrúti)', city: 'Holambra - SP', dist: '124 km', time: '1h 40m' },
    { name: 'Fazenda Santa Cecília (Cafés Alta Mogiana)', city: 'Franca - SP', dist: '390 km', time: '4h 15m' },
    { name: 'Queijaria Serra da Canastra', city: 'São Roque de Minas - MG', dist: '480 km', time: '5h 30m' },
    { name: 'Hortas Hidropônicas do Mogi', city: 'Mogi das Cruzes - SP', dist: '62 km', time: '55m' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-900">
                Agente Google Maps & Rotas Agro
              </h3>
              <p className="text-[11px] text-stone-500">
                Cálculo de distâncias em tempo real, rotas eco-friendly e rastreio de cooperativas
              </p>
            </div>
          </div>

          <button
            onClick={() => setMapsModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Route Calculation Search */}
        <form onSubmit={handleSearchRoute} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite o endereço de destino (ex: Av. Paulista, 1000)..."
              value={destInput}
              onChange={(e) => setDestInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Calcular Rota
          </button>
        </form>

        {/* Route Details Card */}
        {activeRoute && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-500 block">Distância Total</span>
                <span className="font-extrabold text-sm text-stone-900 font-mono-numbers">
                  {activeRoute.distanceKm} km
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-500 block">Tempo Previsto</span>
                <span className="font-extrabold text-sm text-emerald-800 font-mono-numbers">
                  {activeRoute.durationMinutes} min
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-500 block">Trânsito em Tempo Real</span>
                <span className="font-extrabold text-sm text-emerald-700 capitalize">
                  {activeRoute.trafficStatus}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-500 block">Emissão de CO2</span>
                <span className="font-extrabold text-sm text-emerald-600 flex items-center justify-center gap-1 font-mono-numbers">
                  <Leaf className="w-3 h-3" />
                  -{activeRoute.co2SavedKg} kg
                </span>
              </div>
            </div>

            {/* Turn by turn directions */}
            <div>
              <p className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>Instruções Passo a Passo da Rota:</span>
              </p>
              <div className="space-y-1.5 bg-white p-3 rounded-xl border border-emerald-100">
                {activeRoute.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-stone-700">
                    <span className="font-mono text-emerald-800 font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Nearby Agro Hubs & Farms */}
        <div className="mt-5 pt-4 border-t border-stone-200">
          <h4 className="font-display font-bold text-xs text-stone-900 mb-2 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-emerald-700" />
            <span>Rede de Cooperativas e Produtores Rurais Conectados</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {partnerHubs.map((hub, idx) => (
              <div key={idx} className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-stone-900 truncate max-w-[180px]">{hub.name}</p>
                  <p className="text-[10px] text-stone-500">{hub.city}</p>
                </div>
                <div className="text-right text-[11px] font-mono-numbers text-stone-600 shrink-0">
                  <span>{hub.dist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
