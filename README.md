# FITNESS PERSONAL • VITTA HUB

Site implementado em três partes, em revisão. Frontend em React 19, TypeScript, Tailwind CSS e Vinext. Apenas o backend dos formulários é PHP. A exportação para hospedagem compartilhada é uma opção de entrega e preserva os componentes React e suas interações.

## Executar e validar

No desenvolvimento: Node >=22.13.0 e PHP. Instalar com `npm run install:ci`; usar `npm run dev` para iniciar o frontend em http://127.0.0.1:5173 e a API PHP local na porta 8789. O Vite encaminha somente os dois endpoints de formulário para PHP. Validar com `npm test`, `npm run lint` e `npx tsc --noEmit`.

O comando `npm run build` mantém a compilação normal da aplicação. Gerar a entrega opcional para hospedagem compartilhada com `npm run build:locaweb`. Testar o mesmo pacote usando `npm run preview:php`, em http://127.0.0.1:8788. Essa prévia inclui os endpoints PHP. Para desenvolver e revisar o site, preferir a aplicação React na porta 5173. Executar `npm run check:preview` para conferir as páginas, CSS, scripts, imagens e acesso à API por HTTP; passar `-- http://127.0.0.1:8788` para verificar o pacote exportado. Reiniciar as prévias após mover a pasta do projeto.

## Organização

- `app/`, `components/`, `content/`: páginas, componentes e conteúdo estruturado.
- `php/public/api/`: endpoints de contato; `php/private/`: processamento e exemplo de configuração privada.
- `config/site.ts` e `.env.example`: configuração dos dados públicos oficiais.
- `docs/PLANO-E-ACEITE.md`: critérios das três partes.
- `docs/VERIFICACAO-PARTE-3.md`: evidências e pendências da rodada atual.
- `docs/LOCAWEB.md`: instalação e ativação do contato.
- `docs/REFERENCIAS-E-DECISOES.md`: contexto obrigatório e decisões; fontes em `docs/fontes/`.

## Estado da entrega

Home, nove páginas do negócio, contato adaptativo e índice editorial implementados. Modelo de artigo preparado; nenhum artigo fictício publicado. Política e termos aguardam conteúdo aprovado. Formulário permite conferir preenchimento, mas só enviará após configuração real e política aprovada. WhatsApp e loja dependem de URLs oficiais. Analytics preparado, sem coleta ativa ou GA4/GTM conectado.

Pacote em `locaweb/`, com `public/` e `private/` separados. Nunca colocar configuração privada na pasta pública. Staging noindex por padrão; domínio, indexação e dados reais exigem configuração. Sem publicação nesta rodada. Hero ilustrativo gerado por IA; identidade e fotografias oficiais continuam pendentes.
