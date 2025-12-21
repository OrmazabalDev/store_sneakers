// Enviar datos a la hoja "Clientes" de Google Sheets
export async function sendClientToSheet({ nombre, whatsapp, talla, marcas, modelos }: {
  nombre: string;
  whatsapp: string;
  talla: string;
  marcas: string;
  modelos: string;
}, SHEET_ID: string, API_KEY: string): Promise<{ success: boolean; error?: string }> {
  // El rango comienza en la columna B para omitir el id autoincremental (A)
  const RANGE = 'Clientes!B:F';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
  const body = {
    values: [[nombre, whatsapp, talla, marcas, modelos]]
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return { success: false, error: `Error al registrar cliente: ${res.status} ${res.statusText}` };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: 'No se pudo conectar con Google Sheets para registrar cliente.' };
  }
}
// Funciones utilitarias y tipos globales extraídos de HomePage

export type Product = {
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

export function getUniqueOptions<T extends keyof Product>(arr: Product[], key: T): Product[T][] {
  return Array.from(new Set(arr.map((item) => item[key]))).filter(Boolean).sort();
}

export function getBadgeColor(status: string, destacado: string | boolean): string {
  if (status?.toLowerCase() === 'disponible') return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
  if (status?.toLowerCase() === 'proximamente') return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
  if (status?.toLowerCase() === 'agotado') return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
  if (status?.toLowerCase().includes('exclusivo')) return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
  if (status?.toLowerCase().includes('último')) return 'text-red-500 border-red-500/20 bg-red-500/10';
  if (status?.toLowerCase().includes('limitado')) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
  if (status?.toLowerCase().includes('bajo demanda')) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
  return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
}

export async function fetchProductsFromSheet(SHEET_ID: string, API_KEY: string, RANGE: string): Promise<Product[] | { error: string }> {
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

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(value);
};

export function getWhatsAppLink(WHATSAPP_NUMBER: string, message: string, productData?: { brand: string; model: string; price: number; size: string }) {
  let finalMessage = message;
  if (productData) {
    finalMessage = `Hola, me interesa el siguiente producto:\n\nMarca: ${productData.brand}\nModelo: ${productData.model}\nPrecio: ${formatCurrency(productData.price)}\nTalla: ${productData.size}\n\n¿Sigue disponible?`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
}
