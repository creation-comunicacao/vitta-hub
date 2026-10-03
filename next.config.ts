import type { NextConfig } from 'next';
// React/TypeScript segue como aplicação padrão. Exportação é uma opção de entrega.
const config: NextConfig = {
  ...(process.env.VITTA_STATIC_EXPORT === 'true' ? { output: 'export' as const } : {}),
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
};
export default config;
