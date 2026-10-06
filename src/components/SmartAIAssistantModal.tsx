import React, { useState } from 'react';
import {
  Sparkles,
  X,
  ChefHat,
  ShoppingBag,
  Plus,
  CheckCircle2,
  Leaf,
  Clock,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SmartAIAssistantModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { products, addToCart, showToast } = useApp();

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<{
    title: string;
    description: string;
    prepTime: string;
    servings: string;
    ingredients: string[];
    matchingProducts: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerateRecipe = (userQuery?: string) => {
    setLoading(true);
    const query = userQuery || prompt || 'Jantar saudável e rápido com itens frescos da fazenda';

    setTimeout(() => {
      setLoading(false);
      setRecipe({
        title: 'Risoto de Arroz Cateto com Tomates Confitados & Queijo da Canastra',
        description: 'Receita artesanal agroecológica que valoriza o arroz integral biodinâmico e o dulçor natural dos tomates uva colhidos no ponto ideal.',
        prepTime: '30 minutos',
        servings: '2 a 3 porções',
        ingredients: [
          'Arroz Cateto Integral Orgânico (250g)',
          'Tomate Grape Sweet Orgânico (350g)',
          'Queijo Minas Artesanal da Canastra ralado (100g)',
          'Azeite de oliva e alecrim fresco a gosto',
        ],
        matchingProducts: ['prod-1', 'prod-7', 'prod-10'],
      });
    }, 900);
  };

  const handleAddRecipeIngredientsToCart = () => {
    if (!recipe) return;
    recipe.matchingProducts.forEach((pid) => {
      const prod = products.find((p) => p.id === pid);
      if (prod) {
        addToCart(prod, 1);
      }
    });
    showToast('Ingredientes da receita adicionados à cesta com sucesso!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-900">
                Chef & Nutrição Agro KMFood
              </h3>
              <p className="text-[11px] text-stone-500">
                Recomendações de receitas saudáveis com produtos frescos da colheita
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Query Input */}
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: Jantar leve para 2 pessoas, churrasco gourmet, almoço vegetariano..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateRecipe()}
              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
            <button
              onClick={() => handleGenerateRecipe()}
              disabled={loading}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{loading ? 'Criando...' : 'Sugerir'}</span>
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="text-stone-400 self-center">Sugestões rápidas:</span>
            <button
              onClick={() => handleGenerateRecipe('Almoço saudável e rápido com hortaliças e grãos')}
              className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 rounded-full"
            >
              🥗 Almoço Leve Orgânico
            </button>
            <button
              onClick={() => handleGenerateRecipe('Corte nobre Angus com café e acompanhamentos')}
              className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 rounded-full"
            >
              🥩 Picanha Angus Grelhada
            </button>
          </div>
        </div>

        {/* Recipe Result Card */}
        {recipe && (
          <div className="mt-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 text-xs animate-in fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  Receita da Safra
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base text-emerald-950 mt-0.5">
                  {recipe.title}
                </h4>
              </div>
              <span className="text-[11px] text-stone-500 font-mono-numbers flex items-center gap-1 shrink-0">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {recipe.prepTime}
              </span>
            </div>

            <p className="text-stone-600 leading-relaxed">
              {recipe.description}
            </p>

            <div>
              <p className="font-bold text-stone-900 mb-1">Ingredientes Necessários:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-stone-700">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-emerald-200 flex items-center justify-between">
              <span className="text-[11px] text-emerald-900 font-medium">
                Todos os ingredientes estão disponíveis para entrega imediata!
              </span>
              <button
                onClick={handleAddRecipeIngredientsToCart}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Adicionar Todos à Cesta</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
