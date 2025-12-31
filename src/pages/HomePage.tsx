import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Catalog from '../components/Catalog';
import TrustSection from '../components/TrustSection';
import AboutSection from '../components/AboutSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ClubModal from '../components/ClubModal';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const missingEnvVars = !SHEET_ID || !API_KEY || !WHATSAPP_NUMBER;

  interface HomePageProps {
    onAdminLogin?: () => void;
  }

  export default function HomePage({ onAdminLogin }: HomePageProps) {
    const [isClubOpen, setIsClubOpen] = useState(false);
    if (missingEnvVars) {
      return (
        <main className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
          <div className="bg-[#1a1a1a] border border-red-500/30 rounded-lg p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error de configuración</h2>
            <p className="text-gray-300 mb-2">Faltan variables de entorno necesarias para cargar el catálogo.</p>
            <ul className="text-sm text-gray-400 mb-4 text-left list-disc list-inside">
              {!SHEET_ID && <li><span className="text-white">VITE_SHEET_ID</span> no está definida</li>}
              {!API_KEY && <li><span className="text-white">VITE_GOOGLE_API_KEY</span> no está definida</li>}
              {!WHATSAPP_NUMBER && <li><span className="text-white">VITE_WHATSAPP_NUMBER</span> no está definida</li>}
            </ul>
            <p className="text-xs text-gray-500">Agrega estas variables en tu archivo <span className="font-mono">.env</span> y reinicia el servidor.</p>
          </div>
        </main>
      );
    }
    return (
      <main className="min-h-screen bg-[#0B0B0B]">
        <ClubModal isOpen={isClubOpen} onClose={() => setIsClubOpen(false)} />
        <Navbar whatsappNumber={WHATSAPP_NUMBER} />
        <Hero onOpenClub={() => setIsClubOpen(true)} whatsappNumber={WHATSAPP_NUMBER} />
        <HowItWorks onOpenClub={() => setIsClubOpen(true)} />
        <Catalog sheetId={SHEET_ID} apiKey={API_KEY} whatsappNumber={WHATSAPP_NUMBER} />
        <TrustSection />
        <AboutSection />
        <CTASection onOpenClub={() => setIsClubOpen(true)} whatsappNumber={WHATSAPP_NUMBER} />
        <Footer whatsappNumber={WHATSAPP_NUMBER} onAdminLogin={onAdminLogin} />
      </main>
    );
  }
