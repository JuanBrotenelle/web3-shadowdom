/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_EVENTS_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.lottie" {
  const src: string;
  export default src;
}

declare module "*.json" {
  const src: string;
  export default src;
}
