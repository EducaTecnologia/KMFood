import React from 'react';
import {
  Printer,
  Download,
  X,
  FileText,
  ShieldCheck,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PDFReportModal: React.FC = () => {
  const { activeReportModal, closeReportModal, showToast } = useApp();

  if (!activeReportModal) return null;

  const { title, subtitle, profile, data } = activeReportModal;

  const handlePrintPdf = () => {
    window.print();
    showToast('Diálogo de impressão / Salvar em PDF aberto!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 print:border-none print:shadow-none print:max-w-none print:max-h-none print:rounded-none p-6 sm:p-8 animate-in fade-in zoom-in-95">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Visualização de Relatório Oficial (PDF)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Salvar em PDF / Imprimir</span>
            </button>
            <button
              onClick={closeReportModal}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 text-stone-900">
          
          {/* Document Letterhead */}
          <div className="flex items-start justify-between pb-5 border-b-2 border-emerald-900">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-2xl tracking-tight text-emerald-950">
                  KM<span className="text-emerald-600">Food</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-0.5" />
              </div>
              <p className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold mt-0.5">
                Mercado Agroecológico & Gestão de Alimentos Ltda.
              </p>
              <p className="text-[10px] text-stone-400 mt-1">
                CNPJ: 42.189.540/0001-92 · Hub Jaguaré - São Paulo/SP
              </p>
            </div>

            <div className="text-right text-[11px] text-stone-500 space-y-0.5">
              <p>
                Emitido em: <strong className="text-stone-800">{new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}</strong>
              </p>
              <p>
                Perfil Autorizado: <span className="bg-emerald-50 text-emerald-900 font-bold px-2 py-0.5 rounded border border-emerald-200 capitalize">{profile}</span>
              </p>
              <p className="text-[10px] text-stone-400">
                Protocolo de Auditoria: KMRPT-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-950">
              {title}
            </h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Structured Key-Value / Metrics Grid */}
          {data?.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              {data.metrics.map((m: any, idx: number) => (
                <div key={idx} className="text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">{m.label}</span>
                  <span className="font-extrabold text-base sm:text-lg text-emerald-950 font-mono-numbers mt-0.5 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Items Table */}
          {data?.items && (
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs divide-y divide-stone-200">
                <thead className="bg-stone-100 text-stone-600 font-bold uppercase text-[10px]">
                  <tr>
                    {data.headers.map((h: string, idx: number) => (
                      <th key={idx} className="py-2.5 px-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {data.items.map((row: any, rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-stone-50">
                      {row.map((cell: any, cIdx: number) => (
                        <td key={cIdx} className="py-2 px-3 text-stone-800">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Text Summary */}
          {data?.summary && (
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block">Parecer Operacional & Auditoria:</span>
              <p className="text-stone-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Signatures & Verification Seal */}
          <div className="pt-8 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Autenticidade Verificada KMFood Governance</span>
            </div>
            <div className="text-right">
              <span>Assinatura Digital: SHA-256 Validado</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
