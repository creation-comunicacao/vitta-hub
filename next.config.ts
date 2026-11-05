import type { NextConfig } from 'next';
import storeRedirects from './config/store-redirects.json';
import {validateStoreRedirects} from './lib/store-redirects';
import {pageMeta} from './content/pages';
// React/TypeScript segue como aplicação padrão. Exportação é uma opção de entrega.
const config: NextConfig = {
  ...(process.env.VITTA_STATIC_EXPORT === 'true' ? { output: 'export' as const } : {}),
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  ...(process.env.VITTA_STATIC_EXPORT === 'true' ? {} : {
    async redirects() {
      return [
        {source:'/:path*',has:[{type:'host' as const,value:'www.fitnesspersonal.com.br'}],destination:'https://fitnesspersonal.com.br/:path*',statusCode:301},
        ...validateStoreRedirects(storeRedirects,process.env.STORE_REDIRECT_ORIGIN || '', ['/', '/contato', '/conteudos', '/privacidade', '/termos', '/robots.txt', '/sitemap.xml', ...Object.keys(pageMeta).map(slug=>`/${slug}`)]),
      ];
    },
    async headers() {
      return [{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},...(process.env.VERCEL_ENV==='preview'?[{key:'X-Robots-Tag',value:'noindex, nofollow'}]:[])]}];
    },
  }),
};
export default config;
