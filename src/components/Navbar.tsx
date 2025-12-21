import { useState, useEffect } from 'react';
import { Moon, Menu, X, MessageCircle } from 'lucide-react';
import Button from './Button';
import { getWhatsAppLink } from '../utils';

interface NavbarProps {
  whatsappNumber: string;
}

const Navbar = ({ whatsappNumber }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm">
              <Moon size={18} className="fill-current" />
            </div>
            <span className="text-white font-bold tracking-widest text-lg group-hover:text-gray-200 transition-colors">
                EXCLUSIVE<span className="font-light text-gray-400">MOON</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#catalogo" className="text-gray-300 hover:text-white text-sm tracking-widest transition-colors relative group">Colección<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span></a>
            <a href="#como-funciona" className="text-gray-300 hover:text-white text-sm tracking-widest transition-colors relative group">Proceso<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span></a>
            <a href="#confianza" className="text-gray-300 hover:text-white text-sm tracking-widest transition-colors relative group">Garantía<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span></a>
            <Button href={getWhatsAppLink(whatsappNumber, 'Hola, tengo una consulta sobre el stock.')} className="!px-6 !py-2.5 !text-xs bg-[#D4AF37] hover:bg-[#b5952f] text-black border-none shadow-lg shadow-[#D4AF37]/20" variant="primary">WHATSAPP</Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0B0B]/98 border-b border-white/10 backdrop-blur-xl animate-fade-in fixed top-20 left-0 w-full z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-white hover:bg-white/5 tracking-widest text-sm transition-colors"
            >
              STOCK
            </a>
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-white hover:bg-white/5 tracking-widest text-sm transition-colors"
            >
              PROCESO
            </a>
            <a
              href="#confianza"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-white hover:bg-white/5 tracking-widest text-sm transition-colors"
            >
              GARANTÍA
            </a>
            <div className="px-3 py-2">
              <Button
                href={getWhatsAppLink(whatsappNumber, 'Hola, tengo una consulta sobre el stock.')}
                className="w-full !px-6 !py-3 !text-xs bg-[#D4AF37] hover:bg-[#b5952f] text-black border-none"
                variant="primary"
              >
                WHATSAPP
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
