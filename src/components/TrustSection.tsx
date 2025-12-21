import React from 'react';
import { ShieldCheck } from 'lucide-react';
import TrustFactor from './TrustFactor';

const TrustSection = () => {
  return (
    <section id="confianza" className="py-24 md:py-32 bg-[#0B0B0B] border-t border-white/5 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent opacity-30"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#141414] to-[#0F0F0F] border border-white/10 p-10 md:p-16 rounded-sm shadow-2xl">
          <div className="text-center mb-12">
            <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Garantía Lunar</h3>
            <p className="text-gray-500 text-sm md:text-base tracking-wide">Transparencia total en cada paso</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <TrustFactor text="Productos 100% Originales y Verificados" />
            <TrustFactor text="Importación directa USA - Chile" />
            <TrustFactor text="Atención personalizada por humanos" />
            <TrustFactor text="Stock real o bajo demanda transparente" />
            <TrustFactor text="Sin costos ocultos ni sorpresas en aduana" />
            <TrustFactor text="Entregas coordinadas en Santiago" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
