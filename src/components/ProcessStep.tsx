import React from 'react';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const ProcessStep = ({ number, title, description, icon: Icon }: ProcessStepProps) => (
  <div className="relative p-8 md:p-10 border border-white/5 bg-gradient-to-br from-[#141414] to-[#0F0F0F] hover:border-white/10 transition-all duration-500 group overflow-hidden">
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
      <span className="text-8xl font-bold text-white">{number}</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative">
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1F1F1F] text-[#D4AF37] border border-white/10 group-hover:scale-110 group-hover:border-[#D4AF37]/30 transition-all duration-500 shadow-lg">
        <Icon size={22} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  </div>
);

export default ProcessStep;
