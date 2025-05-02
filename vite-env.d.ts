/// <reference types="vite/client" />

interface ImportMetaEnv {
    NEXT_PUBLIC_GEMINI_API_KEY: any;
    readonly VITE_GEMINI_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  