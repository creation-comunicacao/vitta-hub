# Referências documentais e decisões

## Contexto permanente de implementação
Ler este registro e o plano de aceite antes de alterar conteúdo, nomenclatura, hierarquia, ofertas ou atribuições. Consultar as fontes relevantes a cada página. Documentos descrevem o produto; não autorizam por si só publicação, comunicação externa ou mudanças de acesso.

Os cinco arquivos foram localizados em `/Users/faiaxx/Downloads/vitta-hub/` (subpasta dos caminhos inicialmente indicados). Texto extraído integralmente de parágrafos e células para `docs/fontes/`. Os originais foram preservados.

| Documento | Papel na implementação |
| --- | --- |
| Mapa Mestre | Contexto inicial e evolução do negócio; contém nomenclaturas antigas. |
| DNA Mestre | Identidade, propósito, posicionamento, personalidade, promessa, diferenciais, arquétipos e manifesto validados. |
| Consolidação Mestra | Síntese intermediária; registra pendências que versões posteriores resolvem. |
| Briefing Master — setembro/2026 | Especificação consolidada de páginas, metodologia, ofertas, estrutura, SEO e UX. |
| Pacote Master Conteúdo + DEV — outubro/2026 | Conteúdo e especificação detalhada, complementa o Briefing Master. |
| `docs/BRIEFING.md` | Pedido de implementação fornecido no início desta conversa. |

## Regra de resolução
Instruções e confirmações do usuário na conversa prevalecem. Para a evolução documental, usar os documentos Master consolidados em conjunto com o briefing inicial, sem reintroduzir nomes antigos. Divergências comerciais não resolvidas exigem confirmação; não presumir preço, disponibilidade ou entrega.

## Resolvido em 02/10/2026
- T.A.R. = Treinamento de Alto Rendimento: confirmado no Briefing Master, no Pacote DEV e no pedido inicial. T.A.P. permanece somente como histórico nos documentos mais antigos.
- Ofertas: Essencial, Performance & Nutri, Híbrido Start e Executive VIP. Não usar nomes antigos Digital/Total do Mapa Mestre.
- E-Hub: atendimento nutricional primeiro, suplementação/loja depois; não usar a descrição antiga centrada apenas em e-commerce.
- Cargo de Douglas: **Head de Nutrição Esportiva & Suporte Visual**, confirmado expressamente pelo usuário nesta conversa.
- Executive VIP: **primeira semana presencial + nutrição presencial**, confirmado expressamente pelo usuário nesta conversa. Demais itens: avaliação, bioimpedância, treino/app e suporte prioritário. Todos os valores sob consulta.

## Dependências ainda abertas
- Logo, códigos de cor, tipografia e fotografias oficiais.
- Galerias reais dos Hubs e retratos das lideranças: não substituir por fotos fictícias de equipe/clientes. Blocos de galeria não são exibidos enquanto não houver imagens autorizadas.
- WhatsApp comercial, e-mail, domínio, URL da loja, destino de leads/CRM.
- Textos legais aprovados, dados cadastrais reais, configurações de analytics.
- Conteúdo editorial revisado; não atribuir artigos fictícios aos profissionais.
- Escopos comerciais finais antes da publicação; preços permanecem sob consulta.

## Parte 2 — vínculo entre conteúdo e fonte
- Gestão/Hubs: Pacote DEV §§6–9; Briefing Master §8.
- M.I.V.A.: DNA/DNA 06; Briefing Master §4; Pacote DEV §10.
- Consultoria: Briefing Master §9; Pacote DEV §11; confirmação VIP acima.
- E-Hub: Briefing Master §10; Pacote DEV §12.
- Institucional: DNA 01–08; Pacote DEV §§5, 27, 28.
- Equipe: Briefing Master §5; Pacote DEV §13; confirmação de cargo acima.
- SEO titles: Pacote DEV §18.

## Parte 3 — conversão e hospedagem
- Fontes: Pacote DEV §§20–25 e Briefing Master §§15–17, em conjunto com o briefing inicial.
- O usuário determinou processamento dos formulários em PHP para a Locaweb. A interface é exportada para HTML/CSS/JS; nenhum servidor Node é necessário na hospedagem.
- Endpoints PHP usam sessão, validação, antispam e transporte mail() conforme a documentação da Locaweb. O plano contratado e a entrega de e-mail precisam ser conferidos no ambiente real.
- Contato adaptativo, índice com busca/filtros, contrato e template de artigo, infraestrutura de SEO e adaptador de eventos implementados. Conteúdo editorial permanece sem artigos publicados, por ausência de textos aprovados.
- Documentos legais continuam pendentes; envio real permanece desativado. Não foram simulados leads, políticas, credenciais, WhatsApp ou domínio.
- Analytics está preparado, mas GA4/GTM não estão conectados. CMS está representado por contrato editorial e arquivos estruturados, sem painel administrativo instalado.
- Checklist de produção e instalação em docs/LOCAWEB.md. Aceite do usuário não é substituído pelos testes técnicos.

## Correção de execução e esclarecimento do escopo
- O usuário reforçou: somente o backend dos formulários deve usar PHP; manter o frontend moderno combinado (React, TypeScript e Tailwind).
- A quebra visual foi reproduzida: CSS em 8788 retornava 404 e o frontend em 5173 também retornava 404. Os processos continuavam abertos após a pasta ser movida de `/Users/faiaxx/Documents/ChatGPT/vitta-hub` para `/Users/faiaxx/vitta-hub`.
- Servidores reiniciados no caminho atual. Desenvolvimento voltou ao frontend React/Vite na porta 5173 com proxy restrito aos endpoints PHP na porta 8789.
- Exportação estática limitada ao comando build:locaweb; build normal preservado. A exportação não substitui as fontes React por PHP.
- Adicionado check:preview para validar HTTP e MIME dos assets, páginas e API, além da existência dos arquivos em disco.

## Vercel — 03/10/2026
- O usuário relatou ausência de `.next/routes-manifest.json` no deploy Vercel. A causa é o build Vinext/Vite combinado com o preset Next.js.
- Adicionados `build:vercel` (`next build`), `start:vercel` e `vercel.json`; builds locais Vinext e pacote Locaweb preservados.
- Frontend React/TypeScript/Tailwind mantido. A configuração Vercel cobre o frontend; PHP continua como serviço separado. A conexão depende da URL real e configuração de proxy/sessão.
- Procedimento em `docs/VERCEL.md`; política e envio real permanecem pendentes.
