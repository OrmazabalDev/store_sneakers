/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_SHEET_ID: string;
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
