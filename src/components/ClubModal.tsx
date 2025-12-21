import React, { useState } from 'react';
import { sendClientToSheet } from '../utils';
import { X, Star, Lock, Check } from 'lucide-react';

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClubModal = ({ isOpen, onClose }: ClubModalProps) => {
  // Estado actualizado para coincidir con la DB: Marcas y Modelos separados
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    talla: '',
    marcas: '',
    modelos: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz-oAHKM5di576SG9dfWB0ysGhH3XyePyeZnrCn93Mp-wlJuAVf0hT7oN-kTFtw-Z4ZjA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            nombre: formData.nombre,
            whatsapp: formData.whatsapp,
            talla: formData.talla,
            marcas: formData.marcas,
            modelos: formData.modelos,
          }).toString(),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error("Error al registrar");
      }

      setFormData({
        nombre: "",
        whatsapp: "",
        talla: "",
        marcas: "",
        modelos: "",
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);

    } catch (err) {
      setError("No se pudo registrar. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#111] border border-[#D4AF37]/30 w-full max-w-md p-8 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.1)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
        {!isSuccess ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1F1F1F] text-[#D4AF37] border border-[#D4AF37]/20 mb-4 animate-pulse">
                <Star size={20} className="fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">Club Preferente</h3>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full mb-3">
                <Lock size={12} className="text-[#D4AF37]" />
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Fase de Ingreso Abierto</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Próximamente el acceso será <strong>solo por invitación</strong>. <br/>
                Regístrate hoy para asegurar tu lugar vitalicio.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-500 text-xs text-center mb-2">{error}</div>
              )}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-[#0B0B0B] border border-white/10 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">WhatsApp</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 rounded-l bg-[#222] border border-r-0 border-white/10 text-gray-400 text-sm select-none">+569</span>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full bg-[#0B0B0B] border border-white/10 border-l-0 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors rounded-r"
                      placeholder="12345678"
                      pattern="[0-9]{8}"
                      maxLength={8}
                      minLength={8}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Talla (US)</label>
                  <input 
                    type="text" 
                    name="talla"
                    required
                    value={formData.talla}
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B] border border-white/10 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Ej: 10, 9.5..."
                  />
                </div>
              </div>
              {/* CAMPOS SEPARADOS PARA MARCAS Y MODELOS */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Marcas de preferencia</label>
                <input 
                  type="text" 
                  name="marcas"
                  value={formData.marcas}
                  onChange={handleChange}
                  className="w-full bg-[#0B0B0B] border border-white/10 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Ej: Nike, Jordan, Adidas, New Balance..."
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Modelos de preferencia</label>
                <input 
                  type="text" 
                  name="modelos"
                  value={formData.modelos}
                  onChange={handleChange}
                  className="w-full bg-[#0B0B0B] border border-white/10 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Ej: Air Jordan 1, Yeezy 350, Dunk Low..."
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#b5952f] border-none px-8 py-3 text-black font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  {isSubmitting ? 'REGISTRANDO...' : 'ASEGURAR MI CUPO'}
                </button>
                <p className="text-[10px] text-center text-gray-600 mt-3">
                  *Al unirte aceptas recibir alertas prioritarias.
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 mb-6">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Cupo Asegurado!</h3>
            <p className="text-gray-400 text-sm">Ya estás dentro. Cuando cerremos el registro público, tú seguirás teniendo prioridad.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubModal;
