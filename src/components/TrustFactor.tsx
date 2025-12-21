import React from 'react';
import { Check } from 'lucide-react';

interface TrustFactorProps {
  text: string;
}

const TrustFactor = ({ text }: TrustFactorProps) => (
  <div className="flex items-start gap-4 text-gray-300 py-3 group hover:text-white transition-colors">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F1F1F] flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors mt-0.5">
      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
    </div>
    <span className="text-sm md:text-base font-light leading-relaxed">{text}</span>
  </div>
);

export default TrustFactor;
