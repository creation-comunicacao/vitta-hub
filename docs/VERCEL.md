# Vercel — frontend Next.js/React

## Causa do erro routes-manifest.json

O comando padrão do projeto utiliza Vinext/Vite e gera `dist/`. A integração Next.js da Vercel espera artefatos nativos em `.next/`, incluindo `routes-manifest.json`. Alterar apenas a pasta de saída para `dist` não transforma os artefatos Vinext em uma saída Next.js válida.

## Configuração

O `vercel.json` versionado define:

- Framework: Next.js.
- Build Command: `npm run build:vercel` (executa `next build`).
- Output Directory: `.next`.
- Install Command: `npm ci`.

No painel da Vercel, usar Root Directory `./`, pois `package.json`, `app/` e `vercel.json` estão na raiz do repositório enviado ao GitHub. Se existirem overrides manuais antigos, alinhar aos valores acima ou desativá-los. Não usar `dist`, `locaweb/public`, `build:locaweb` ou `VITTA_STATIC_EXPORT=true` neste deploy. Node.js 24.x é compatível com a versão usada na validação local; o projeto exige Node >=22.13.0.

Fazer novo deploy usando o commit da correção. Para reproduzir localmente: `npm run build:vercel` e `npm run start:vercel`. O arquivo `.next/routes-manifest.json` é gerado no build e não deve ser commitado.

## Formulário PHP

O frontend permanece React/TypeScript/Tailwind. PHP continua somente no backend do formulário. Esta configuração de deploy Next.js não executa os arquivos de `php/` como funções. A implementação de PHP existente usa sessões, arquivos de rate limit e mail() da hospedagem; deve continuar na Locaweb.

Para abrir o envio quando o frontend estiver na Vercel, ainda será necessário informar a URL HTTPS do servidor PHP e configurar um proxy externo dos dois endpoints `/api/contact-token.php` e `/api/contact.php`, preservando sessão e cookies. Configurar `origin` no PHP com a origem oficial do frontend e verificar a integração com o serviço real. O formulário permanece indisponível até a aprovação da política e a configuração real, conforme a implementação atual. Nenhum envio foi ativado por esta correção.

## Referências oficiais

- [Configuração de build da Vercel](https://vercel.com/docs/builds/configure-a-build).
- [Comandos de build do Next.js](https://nextjs.org/docs/app/api-reference/cli/next).
- [Rewrites para serviços externos](https://vercel.com/docs/routing/rewrites).

## Validação

`npm run build:vercel` concluído com geração das páginas e do manifesto `.next/routes-manifest.json`. Verificação adicional da aplicação compilada feita localmente; conclusão local não equivale à confirmação do deploy no painel Vercel.
