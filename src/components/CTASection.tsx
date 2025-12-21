import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import Button from './Button';
import { getWhatsAppLink } from '../utils';

interface CTASectionProps {
  onOpenClub: () => void;
  whatsappNumber: string;
}

const CTASection = ({ onOpenClub, whatsappNumber }: CTASectionProps) => {
  return (
    <section className="py-32 md:py-40 bg-gradient-to-br from-zinc-900 via-[#0B0B0B] to-black relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 animate-pulse" />
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          ¿Buscas un modelo específico?
        </h2>
        <p className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Si existe en el planeta, lo conseguimos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onOpenClub}
            className="bg-[#D4AF37] hover:bg-[#c4a02e] text-black border-none text-base md:text-lg px-12 py-5 shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 font-bold rounded transition-colors"
          >
            ASEGURAR MI CUPO EN EL CLUB
          </button>
          <Button 
            href={getWhatsAppLink(whatsappNumber, 'Hola, estoy buscando un modelo específico que no veo en la web.')}
            className="text-base md:text-lg px-12 py-5"
            icon={MessageCircle}
            variant="secondary"
          >
            CONTACTAR POR WHATSAPP
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-6">*El Club Preferente cerrará su registro público pronto.</p>
      </div>
    </section>
  );
};

export default CTASection;
