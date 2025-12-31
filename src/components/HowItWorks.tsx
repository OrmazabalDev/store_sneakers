import React from 'react';
import SectionTitle from './SectionTitle';
import ProcessStep from './ProcessStep';
import { Box, MessageCircle, ShieldCheck, Star } from 'lucide-react';

interface HowItWorksProps {
  onOpenClub: () => void;
}

const HowItWorks = ({ onOpenClub }: HowItWorksProps) => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-[#0B0B0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="PROTOCOLO DE COMPRA"
          subtitle="Simple. Transparente. Si ves algo en stock, es porque lo tenemos o podemos importarlo ya."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <ProcessStep
            number="01"
            icon={Box}
            title="Radar de Stock"
            description="Revisas el catálogo disponible. Solo publicamos lo que realmente podemos conseguir."
          />
          <ProcessStep
            number="02"
            icon={MessageCircle}
            title="Consulta Directa"
            description="Sin carritos. Hablas directo por WhatsApp para confirmar talla y detalles del pedido."
          />
          <ProcessStep
            number="03"
            icon={ShieldCheck}
            title="Entrega Segura"
            description="Coordinamos el pago y el envío a tu puerta. Garantía absoluta de originalidad."
          />
        </div>
        <div className="relative border border-[#D4AF37]/30 bg-[#0F0F0F] rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10"></div>
          <div className="absolute -left-10 top-0 w-40 h-full bg-gradient-to-r from-[#D4AF37]/10 to-transparent"></div>
          <div className="relative z-10 text-center md:text-left max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Star className="text-[#D4AF37] fill-current" size={16} />
                <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest">Opción Preferente · Cupos Limitados</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">¿Quieres saltarte la fila?</h3>
            <p className="text-gray-400 text-sm md:text-base">
              Únete al <strong>Club Preferente</strong> (Opcional). Nos dices tu talla y te avisamos 
              <span className="text-white font-semibold"> antes</span> de publicar el stock en la web.
              <br className="hidden md:block"/> Actualmente el registro es libre, pero pronto será solo por invitación.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <button 
              type="button"
              className="bg-[#D4AF37] hover:bg-[#b5952f] text-black border-none px-8 py-3 font-bold rounded transition-colors"
              onClick={onOpenClub}
            >
              UNIRME AL CLUB
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
