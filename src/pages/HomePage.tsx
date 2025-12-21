// Utilidad para obtener opciones únicas (corrige error de tipos)
function getUniqueOptions<T extends keyof Product>(arr: Product[], key: T): Product[T][] {
  return Array.from(new Set(arr.map((item) => item[key]))).filter(Boolean).sort();
}
// SelectFilter reutilizable
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

import { useState, useEffect } from 'react';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Moon,
  Check,
  Instagram,
  Menu,
  X,
  Box,
  Star,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const missingEnvVars = !SHEET_ID || !API_KEY || !WHATSAPP_NUMBER;
const RANGE = 'A2:I';


type Product = {
  id: string;
  brand: string;
  model: string;
  price: number;
  size: string;
  image: string;
  stock: string;
  status: string;
  featured: boolean;
  badgeColor: string;
};

function getBadgeColor(status: string, destacado: string | boolean): string {
  if (status?.toLowerCase() === 'disponible') return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
  if (status?.toLowerCase() === 'proximamente') return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
  if (status?.toLowerCase() === 'agotado') return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
  if (status?.toLowerCase().includes('exclusivo')) return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
  if (status?.toLowerCase().includes('último')) return 'text-red-500 border-red-500/20 bg-red-500/10';
  if (status?.toLowerCase().includes('limitado')) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
  if (status?.toLowerCase().includes('bajo demanda')) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
  return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
}

async function fetchProductsFromSheet(): Promise<Product[] | { error: string }> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { error: `Error al cargar productos: ${res.status} ${res.statusText}` };
    }
    const data = await res.json();
    if (!data.values) {
      return { error: 'No se encontraron productos en la hoja de Google Sheets.' };
    }
    return data.values.map((row: any[]): Product => {
      const destacadoRaw = row[8]?.toString().trim().toLowerCase();
      const featured = destacadoRaw === 'si' || destacadoRaw === 'sí' || destacadoRaw === 'true' || destacadoRaw === '1';
      return {
        id: row[0],
        brand: row[1],
        model: row[2],
        price: Number(row[3]),
        size: row[4],
        image: row[5],
        stock: row[6],
        status: row[7],
        featured,
        badgeColor: getBadgeColor(row[7], featured),
      };
    });
  } catch (err: any) {
    return { error: 'No se pudo conectar con Google Sheets. Revisa tu conexión o la API Key.' };
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);
};




function getWhatsAppLink(message: string, productData?: { brand: string; model: string; price: number; size: string }) {
  let finalMessage = message;
  if (productData) {
    finalMessage = `Hola, me interesa el siguiente producto:\n\nMarca: ${productData.brand}\nModelo: ${productData.model}\nPrecio: ${formatCurrency(productData.price)}\nTalla: ${productData.size}\n\n¿Sigue disponible?`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
}

// --- COMPONENTES ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0B] pt-20">
      {/* Background Texture/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1F1F1F] via-[#0B0B0B] to-[#0B0B0B] opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay"></div>
      {/* Decorative Moon Glow */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#D4AF37] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in-up">
          <Moon className="w-3 h-3 text-[#D4AF37] fill-current" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-300">Aterrizando en Chile · Venta Directa</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-tight mb-6 animate-fade-in-up animation-delay-100">
          EXCLUSIVE <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-gray-500">MOON.</span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg md:text-xl font-light mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
          Define tu gravedad. Accede a sneakers limitadas y modelos fuera de órbita. Sin precios de retail inflados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-300">
          <Button href="#catalogo" icon={ArrowRight} variant="primary">
            EXPLORAR COLECCIÓN
          </Button>
          <Button href={getWhatsAppLink("Hola ExclusiveMoon, quiero saber más.")} variant="secondary">
            HABLAR CON UN ASESOR
          </Button>
        </div>
        {/* Hero Image Concept */}
        <div className="mt-16 relative w-full max-w-4xl opacity-90 animate-fade-in-up animation-delay-400">
          {/* Imagen del Hero */}
          <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl border-t border-x border-white/5 flex items-end justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=2000" 
              alt="Exclusive Moon Hero"
              className="w-full h-full object-cover object-center mix-blend-overlay opacity-50 grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
            />
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent"></div>
          </div>
        </div>
        {/* Beneficios destacados debajo de la imagen */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 mt-10 animate-fade-in-up animation-delay-600">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Originales</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">USA</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Directo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Atención</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ number, title, description, icon: Icon }: any) => (
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

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-[#0B0B0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="CÓMO FUNCIONA"
          subtitle="Simple. Transparente. Sin intermediarios innecesarios. Solo vendemos lo que realmente podemos conseguir."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <ProcessStep
            number="01"
            icon={Box}
            title="Revisa los Drops"
            description="Publicamos drops (fases) reales y modelos aterrizando en Chile. Sin sorpresas."
          />
          <ProcessStep
            number="02"
            icon={MessageCircle}
            title="Contactas Directo"
            description="¿Te interesa un par? Haces clic y hablas directamente con nosotros por WhatsApp."
          />
          <ProcessStep
            number="03"
            icon={ShieldCheck}
            title="Compra y Entrega"
            description="Coordinamos el pago seguro y el envío a tu domicilio en Chile. Garantía de autenticidad."
          />
        </div>
      </div>
    </section>
  );
};

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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm">
              <Moon size={18} className="fill-current" />
            </div>
            {/* BRAND NAME */}
            <span className="text-white font-bold tracking-widest text-lg group-hover:text-gray-200 transition-colors">
                EXCLUSIVE<span className="font-light text-gray-400">MOON</span>
            </span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#catalogo" className="text-gray-300 hover:text-white text-sm tracking-widest transition-colors relative group">Colección<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span></a>
            <a href="#como-funciona" className="text-gray-300 hover:text-white text-sm tracking-widest transition-colors relative group">Proceso<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span></a>
            <a href="#confianza" className="text-gray-300 hover:text-white text-sm tracking-widest transition-colors relative group">Garantía<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span></a>
            <Button href={getWhatsAppLink('Hola, tengo una consulta sobre el stock.')} className="!px-6 !py-2.5 !text-xs bg-[#D4AF37] hover:bg-[#b5952f] text-black border-none shadow-lg shadow-[#D4AF37]/20" variant="primary">WHATSAPP</Button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0B0B]/98 border-b border-white/10 backdrop-blur-xl animate-fade-in fixed top-20 left-0 w-full z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-white hover:bg-white/5 tracking-widest text-sm transition-colors"
            >
              STOCK
            </a>
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-white hover:bg-white/5 tracking-widest text-sm transition-colors"
            >
              PROCESO
            </a>
            <a
              href="#confianza"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-white hover:bg-white/5 tracking-widest text-sm transition-colors"
            >
              GARANTÍA
            </a>
            <div className="px-3 py-2">
              <Button
                href={getWhatsAppLink('Hola, tengo una consulta sobre el stock.')}
                className="w-full !px-6 !py-3 !text-xs bg-[#D4AF37] hover:bg-[#b5952f] text-black border-none"
                variant="primary"
              >
                WHATSAPP
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


// --- PRODUCTOS ---
interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
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
            href={getWhatsAppLink('', { brand: product.brand, model: product.model, price: product.price, size: product.size })}
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

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [status, setStatus] = useState('');
  const [tab, setTab] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    fetchProductsFromSheet().then((data) => {
      if (Array.isArray(data)) {
        setProducts(data);
        setError(null);
      } else if (data && typeof data === 'object' && 'error' in data) {
        setError(data.error);
      }
      setLoading(false);
    });
  }, []);

  // Obtener opciones únicas para filtros
  const brands = getUniqueOptions(products, 'brand');
  const sizes = getUniqueOptions(products, 'size');
  const statuses = getUniqueOptions(products, 'status');

  // Filtrado
  let filteredProducts = products.filter((p) => {
    if (brand && p.brand !== brand) return false;
    if (size && p.size !== size) return false;
    if (status && p.status !== status) return false;
    return true;
  });
  if (tab === 'featured') {
    filteredProducts = filteredProducts.filter((p) => p.featured);
  }

  // Paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section id="catalogo" className="py-24 md:py-32 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="DROPS LIMITADOS" subtitle="Selección exclusiva aterrizando en Chile. Actualizado semanalmente." />
        {/* Tabs TODOS LOS DROPS / DESTACADOS */}
        <div className="flex justify-center gap-4 mb-2">
          <button
            onClick={() => setTab('all')}
            className={`px-6 py-2.5 text-sm font-semibold tracking-wider transition-all duration-300 ${tab === 'all' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}
          >
            TODOS LOS DROPS
          </button>
          <button
            onClick={() => setTab('featured')}
            className={`px-6 py-2.5 text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 ${tab === 'featured' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}
          >
            <Sparkles className="w-4 h-4" />
            DESTACADOS
          </button>
        </div>
        {/* Filtros arriba - Responsive */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-stretch md:items-end justify-between">
          {/* Selector de cantidad por página */}
          <SelectFilter
            label="Item por pag."
            value={pageSize}
            onChange={v => { setPageSize(Number(v)); setPage(1); }}
            options={[10, 20, 30]}
            allLabel="10"
            className="md:w-[110px]"
          />
          {/* Filtros agrupados */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto ml-0 md:ml-auto">
            <SelectFilter
              label="Marca"
              value={brand}
              onChange={v => { setBrand(v); setPage(1); }}
              options={brands}
              allLabel="Todas"
              className="sm:w-[120px]"
            />
            <SelectFilter
              label="Talla"
              value={size}
              onChange={v => { setSize(v); setPage(1); }}
              options={sizes}
              allLabel="Todas"
              className="sm:w-[100px]"
            />
            <SelectFilter
              label="Estado"
              value={status}
              onChange={v => { setStatus(v); setPage(1); }}
              options={statuses}
              allLabel="Todos"
              className="sm:w-[120px]"
            />
          </div>
        </div>
        {/* Productos y paginación */}
        <div>
          {loading ? (
            <div className="text-center text-gray-400 py-20">Cargando productos...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-20 font-semibold text-lg max-w-xl mx-auto">
              {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12">
                {paginatedProducts.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400">No hay productos disponibles.</div>
                ) : (
                  paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
              {/* Paginación abajo */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-3 py-1.5 rounded bg-[#232323] text-white border border-white/10 disabled:opacity-40">&lt;</button>
                <span className="text-xs text-gray-400">Página {page} de {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-3 py-1.5 rounded bg-[#232323] text-white border border-white/10 disabled:opacity-40">&gt;</button>
              </div>
            </>
          )}
        </div>
        <div className="mt-20 text-center p-8 md:p-12 border border-white/10 bg-gradient-to-br from-[#141414] to-[#0B0B0B]">
          <TrendingUp className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
          <p className="text-gray-400 text-base md:text-lg mb-6 font-light">¿No encuentras tu modelo ideal?</p>
          <Button
            href={getWhatsAppLink('Hola, busco un modelo que no está en el catálogo.')}
            className="inline-flex items-center text-white hover:text-[#D4AF37] transition-colors font-semibold border-b-2 border-white/20 hover:border-[#D4AF37] pb-1 text-lg"
            icon={ArrowRight}
            variant="secondary"
          >
            Pregúntanos por disponibilidad bajo pedido
          </Button>
        </div>
      </div>
    </section>
  );
};


// --- SECCIONES FINALES ---
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

const TrustSection = () => {
  return (
    <section id="confianza" className="py-24 md:py-32 bg-[#0B0B0B] border-t border-white/5 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent opacity-30"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#141414] to-[#0F0F0F] border border-white/10 p-10 md:p-16 rounded-sm shadow-2xl">
          <div className="text-center mb-12">
            <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Garantía Lunar</h3>
            <p className="text-gray-500 text-sm md:text-base tracking-wide">Transparencia total en cada paso</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <TrustFactor text="Productos 100% Originales y Verificados" />
            <TrustFactor text="Importación directa USA - Chile" />
            <TrustFactor text="Atención personalizada por humanos" />
            <TrustFactor text="Stock real o bajo demanda transparente" />
            <TrustFactor text="Sin costos ocultos ni sorpresas en aduana" />
            <TrustFactor text="Entregas coordinadas en Santiago" />
          </div>
        </div>
      </div>
    </section>
  );
};

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

const CTASection = () => {
  return (
    <section className="py-32 md:py-40 bg-gradient-to-br from-zinc-900 via-[#0B0B0B] to-black relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 animate-pulse" />
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          ¿Buscas un modelo específico?
        </h2>
        <p className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Si existe en el planeta, lo conseguimos.
        </p>
        <Button
          href={getWhatsAppLink('Hola, estoy buscando un modelo específico que no veo en la web.')}
          className="bg-[#D4AF37] hover:bg-[#c4a02e] text-black border-none text-base md:text-lg px-12 py-5 shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40"
          icon={MessageCircle}
          variant="primary"
        >
          CONTACTAR AHORA
        </Button>
      </div>
    </section>
  );
};

const Footer = () => {
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
          <a href={getWhatsAppLink("Hola ExclusiveMoon!")} className="text-gray-500 hover:text-white transition-colors">
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

export default function HomePage() {
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
      <Navbar />
      <Hero />
      <HowItWorks />
      <Catalog />
      <TrustSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
