# Verificação técnica — parte 3 — 02/10/2026

Implementação local para revisão; não equivale ao aceite do usuário nem à liberação de produção. Referências: Pacote DEV §§20–25, Briefing Master §§15–17 e instrução do usuário para formulários em PHP na Locaweb.

## Implementado

- Contato adaptativo para oito interesses; campos de condomínio/empresa e cargo no B2B; plano contextual para consultoria.
- Processamento PHP, validação independente no servidor, sessão/token, honeypot, limite por IP, prevenção de duplicidade e tratamento de erro do transporte.
- Interface exportada em HTML/CSS/JS, com 14 páginas e 404. Pacote Locaweb não exige Node em produção. Configuração privada fora da pasta pública.
- Índice editorial com busca sem diferenciação de acentos, filtro por categoria e estado vazio. Contrato e template de artigo preparados, sem artigos fictícios nem painel CMS.
- SEO por página, schemas conforme dados existentes, geração de sitemap/robots e suporte a mapa de redirects. Prévia noindex; canonical omitido sem domínio oficial.
- Adaptador de eventos sem coleta ativa. WhatsApp, e-mail e loja centralizados para configuração futura.
- Privacidade e termos explicitam indisponibilidade; formulário não transmite dados até política e configuração aprovadas.

## Evidências

- `npm test`: 5 testes de conteúdo/validação e 16 verificações PHP passaram, incluindo falha de transporte, CSRF, spam, deduplicação e limites em arquivo. Transportes simulados; nenhum e-mail real enviado.
- `npx tsc --noEmit`, `npm run lint` e `php -l` nos três arquivos de processamento passaram.
- `npm run build:locaweb`: exportação e pacote concluídos. Rota de artigo sem registros intencionalmente não gerada.
- Inspeção dos 15 HTML: um H1 por página, noindex presente, links internos e arquivos referenciados existentes.
- HTTP local: token desativado 503; envio desativado 503; GET no endpoint de envio 405; página inexistente 404.
- Navegador: erros de campos com foco no primeiro inválido; conferência local válida informa expressamente que não enviou; mudança de Consultoria/VIP para Gestão exige empresa/cargo e limpa o plano.
- Busca “prescricao” encontra o assunto “Prescrição além da planilha”; categoria Nutrição filtra para Creatina. Assuntos continuam marcados como em preparação.
- Contato e Conteúdos sem overflow horizontal em 320, 375, 430, 768, 1024 e 1440 pixels. Campos e foco inspecionados visualmente em 375 pixels. Verificações anteriores da Home e páginas comerciais estão nas partes 1 e 2.
- Lint ajustado à entrega estática: links nativos e imagens pré-otimizadas não exigem serviços Next em produção; artefatos gerados excluídos da análise. Leitura inicial da URL após hidratação documentada nas três exceções locais de hooks.

## Pendências de aceite/produção

1. Informar domínio, plano Locaweb (Linux/Windows e serviço de e-mail), remetente e destinatário. Conferir entrega real na caixa de destino após ativação; mail() aceitar não comprova recebimento.
2. Aprovar e fornecer política/termos e dados cadastrais. Não há texto jurídico inventado.
3. Informar WhatsApp, URL da loja e redes oficiais; fornecer assets autorizados e revisar conteúdo comercial.
4. Aprovar artigos e definir operação editorial/painel CMS se necessário. A entrega atual edita conteúdo em arquivos e exige novo build.
5. Definir e conectar analytics/consentimento; verificar eventos com a integração real. Não há GA4/GTM ativo.
6. Fornecer URLs antigas para redirects e concluir Search Console após domínio/publicação.
7. Medir performance/Core Web Vitals no ambiente publicado. Não foi executada certificação WCAG nem medição de campo; o teste de larguras não substitui revisão em dispositivos reais.

Instalação, configuração e limites em `docs/LOCAWEB.md`. Nenhuma publicação nesta rodada.

## Revisão após relato de site quebrado

- Falha reproduzida no navegador: página sem estilos/interações; CSS retornava HTTP 404. O processo PHP e o processo React permaneceram ativos após mudança da pasta do projeto para `/Users/faiaxx/vitta-hub`; apontavam para arquivos no caminho anterior.
- Reiniciados os servidores na localização atual. Frontend React/TypeScript/Tailwind em 5173; serviço PHP em 8789 atende somente `/api/contact.php` e `/api/contact-token.php`, acessíveis pelo proxy do frontend. Prévia exportada em 8788 também restaurada.
- `npm run build` preserva a aplicação normal; exportação limitada a `npm run build:locaweb`. Não houve conversão das páginas/componentes para PHP.
- Novo `check:preview` confere respostas HTTP e MIME em vez de apenas existência em disco. Passou nas 14 páginas nas duas prévias; conferiu 21 assets referenciados no pacote e acesso à API. No Vite, CSS é injetado como módulo JavaScript de desenvolvimento, validado explicitamente.
- Navegador: 14 páginas com estilo aplicado, um H1, sem overflow horizontal na largura da janela e sem imagens quebradas; nenhum erro de console observado. Menu mobile e dropdown desktop abrem; formulário muda campos conforme interesse e leva o foco ao primeiro erro.
- Home conferida em 1440 e 375 pixels, com duas/uma colunas respectivamente e sem overflow horizontal.
- Testes existentes, TypeScript, lint, sintaxe PHP, compilação normal e compilação opcional Locaweb passaram. Nenhum envio de e-mail realizado.
