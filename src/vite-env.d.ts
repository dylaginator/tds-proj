/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENCY_BEACON_API_KEY: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}