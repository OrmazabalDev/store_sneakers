import React from 'react';
import { Moon, Instagram, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils';


interface FooterProps {
  whatsappNumber: string;
  onAdminLogin?: () => void;
}

const Footer = ({ whatsappNumber, onAdminLogin }: FooterProps) => {
  return (
    <footer className="bg-[#050505] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
             <Moon size={14} className="text-[#D4AF37] fill-current" />
             <span className="text-white font-bold tracking-widest text-lg">EXCLUSIVE<span className="font-light text-gray-400">MOON</span></span>
           </div>
           <p className="text-gray-600 text-xs tracking-wide uppercase">Importado desde USA · Stock Limitado · Chile</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href={getWhatsAppLink(whatsappNumber, "Hola ExclusiveMoon!")} className="text-gray-500 hover:text-white transition-colors">
            <MessageCircle size={20} />
          </a>
        </div>
        <div className="text-gray-600 text-xs flex flex-col md:flex-row items-center gap-4">
          <span>© {new Date().getFullYear()} ExclusiveMoon.</span>
          {onAdminLogin && (
            <button onClick={onAdminLogin} className="text-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors text-[10px] uppercase tracking-widest border border-[#D4AF37]/10 px-2 py-1 rounded-sm">Admin Login</button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
