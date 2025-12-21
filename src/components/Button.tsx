import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ElementType;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, onClick, href, className = '', icon: Icon, variant = 'primary' }: ButtonProps) => {
  const baseClass =
    variant === 'primary'
      ? 'group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold transition-all duration-300 ease-out bg-white text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white shadow-lg hover:shadow-xl'
      : 'inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus:outline-none backdrop-blur-sm';
  if (href) {
    const isInternalAnchor = typeof href === 'string' && href.startsWith('#');
    return (
      <a
        href={href}
        {...(!isInternalAnchor ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`${baseClass} ${className}`}
      >
        {children}
        {Icon && <Icon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
};

export default Button;
