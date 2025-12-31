import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import SelectFilter from './SelectFilter';
import ProductCard from './ProductCard';
import Button from './Button';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Product, getUniqueOptions, fetchProductsFromSheet } from '../utils';

interface CatalogProps {
  sheetId: string;
  apiKey: string;
  whatsappNumber: string;
}

const RANGE = 'A2:I';

const Catalog = ({ sheetId, apiKey, whatsappNumber }: CatalogProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [status, setStatus] = useState('');
  const [tab, setTab] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    fetchProductsFromSheet(sheetId, apiKey, RANGE).then((data) => {
      if (Array.isArray(data)) {
        setProducts(data);
        setError(null);
      } else if (data && typeof data === 'object' && 'error' in data) {
        setError(data.error);
      }
      setLoading(false);
    });
  }, [sheetId, apiKey]);

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
                {(() => {
                  // Filtrar productos inválidos: sin id, stock 0, o ids duplicados
                  const validProducts = paginatedProducts.filter((product, idx, arr) =>
                    product.id && product.stock !== '0' && arr.findIndex(p => p.id === product.id) === idx
                  );
                  if (validProducts.length === 0) {
                    return <div className="col-span-full text-center text-gray-400">No hay productos disponibles.</div>;
                  }
                  return validProducts.map((product) => (
                    <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
                  ));
                })()}
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
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, busco un modelo que no está en el catálogo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:text-[#D4AF37] transition-colors font-semibold border-b-2 border-white/20 hover:border-[#D4AF37] pb-1 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          >
            Pregúntanos por disponibilidad bajo pedido
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
