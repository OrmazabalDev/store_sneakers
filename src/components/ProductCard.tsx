import React, { useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';
import Button from './Button';
import { Product, formatCurrency, getWhatsAppLink } from '../utils';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

const ProductCard = ({ product, whatsappNumber }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="group relative bg-[#141414] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(product.status || product.featured) && (
        <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border backdrop-blur-md ${product.badgeColor} flex items-center gap-1.5`}>
          {product.featured && <Star className="w-3 h-3" fill="currentColor" />}
          {product.status && <span>{product.status}</span>}
        </div>
      )}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.brand} ${product.model}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500 text-xs">Sin imagen</div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <Button
            href={getWhatsAppLink(whatsappNumber, '', { brand: product.brand, model: product.model, price: product.price, size: product.size })}
            className="!px-6 !py-3 !text-xs scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl"
            icon={MessageCircle}
            variant="primary"
          >
            CONSULTAR AHORA
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-[0.2em] font-semibold">{product.brand}</div>
        <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-4 line-clamp-2 group-hover:text-[#D4AF37] transition-colors" title={product.model}>
          {product.model}
        </h3>
        <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-white/5">
          <span className="text-[#D4AF37] font-bold text-xl">{formatCurrency(product.price)}</span>
          <span className="text-gray-400 text-xs border border-white/10 px-3 py-1.5 rounded bg-white/5 font-medium">US {product.size}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
