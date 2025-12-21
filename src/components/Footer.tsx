import React from 'react';
import { Moon, Instagram, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils';

interface FooterProps {
  whatsappNumber: string;
}

const Footer = ({ whatsappNumber }: FooterProps) => {
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
        <div className="text-gray-600 text-xs">
          © {new Date().getFullYear()} ExclusiveMoon. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
