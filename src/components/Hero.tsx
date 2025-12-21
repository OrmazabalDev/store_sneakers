import React from 'react';
import { Moon, ArrowRight } from 'lucide-react';
import Button from './Button';
import { getWhatsAppLink } from '../utils';

interface HeroProps {
  onOpenClub: () => void;
  whatsappNumber: string;
}

const Hero = ({ onOpenClub, whatsappNumber }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0B] pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1F1F1F] via-[#0B0B0B] to-[#0B0B0B] opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#D4AF37] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in-up">
          <Moon className="w-3 h-3 text-[#D4AF37] fill-current" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-300">Aterrizando en Chile · Venta Directa</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-tight mb-6 animate-fade-in-up animation-delay-100">
          EXCLUSIVE <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-gray-500">MOON.</span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg md:text-xl font-light mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
          Define tu gravedad. Accede a sneakers limitadas y modelos fuera de órbita. Sin precios de retail inflados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-300">
          <Button href="#catalogo" icon={ArrowRight} variant="primary">
            EXPLORAR COLECCIÓN
          </Button>
          <Button
            href={getWhatsAppLink(whatsappNumber, "Hola ExclusiveMoon, quiero saber más.")}
            variant="secondary"
          >
            HABLAR CON UN ASESOR
          </Button>
        </div>
        <div className="mt-16 relative w-full max-w-4xl opacity-90 animate-fade-in-up animation-delay-400">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl border-t border-x border-white/5 flex items-end justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=2000" 
              alt="Exclusive Moon Hero"
              className="w-full h-full object-cover object-center mix-blend-overlay opacity-50 grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
            />
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 md:gap-16 mt-10 animate-fade-in-up animation-delay-600">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Originales</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">USA</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Directo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Atención</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
