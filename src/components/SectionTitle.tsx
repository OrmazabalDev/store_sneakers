import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-16 md:mb-20 text-center space-y-4">
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">{title}</h2>
    {subtitle && (
      <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">{subtitle}</p>
    )}
    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>
  </div>
);

export default SectionTitle;
