import React from 'react';

interface SelectFilterProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: (string | number)[];
  allLabel?: string;
  className?: string;
}

const SelectFilter = ({ label, value, onChange, options, allLabel = 'Todos', className = '' }: SelectFilterProps) => (
  <div className={`flex flex-col w-full ${className}`}>
    <label className="text-xs text-gray-300 mb-1 font-semibold uppercase tracking-widest">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-2 py-2 rounded-lg bg-white text-black border border-white/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all w-full"
    >
      <option value="">{allLabel}</option>
      {options.filter(o => o && o.toString().trim() !== '').map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default SelectFilter;
