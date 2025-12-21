import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0B0B0B] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h4 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-6 uppercase">Sobre ExclusiveMoon</h4>
        <p className="text-xl md:text-2xl text-white font-serif italic leading-relaxed mb-6">
          "No somos retail. Somos el enlace entre Chile y lo exclusivo. Trabajamos bajo demanda, priorizando lo auténtico, lo raro y lo difícil de conseguir."
        </p>
        <div className="w-16 h-px bg-white/20 mx-auto"></div>
      </div>
    </section>
  );
};

export default AboutSection;
