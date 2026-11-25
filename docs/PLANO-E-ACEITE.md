# VITTA HUB — implementação em três partes

Escopo de referência: briefing integral fornecido em 02/10/2026. As sete etapas originais estão agrupadas abaixo, preservando a ordem. Cada parte termina com revisão do usuário; alterações decorrentes dessa revisão antecedem o próximo lote.

## Parte 1 — Fundação e Home
- Fundação React/TypeScript com renderização no servidor, tokens e componentes compartilhados.
- Header desktop com dropdown, menu mobile e barra inferior fixa; footer completo.
- Home: Hero, ecossistema/pilares, B2B, três Hubs, M.I.V.A., jornada, T.A.L./T.A.R., quatro ofertas, nutrição antes da suplementação, experiência, lideranças, conteúdos e CTA final B2B.
- Configuração central para dados reais e metadados; staging noindex.

### Aceite para revisar
- [ ] FITNESS PERSONAL permanece como marca principal.
- [ ] Gestão Esportiva Integrada e condomínios dominam a narrativa.
- [ ] Hubs são divisões operacionais B2B, não empresas.
- [ ] Todos os blocos e textos estratégicos da Home estão presentes.
- [ ] M.I.V.A. é metodologia transversal; jornada tem diferentes pontos de partida.
- [ ] Consultoria tem quatro ofertas e preços sob consulta.
- [ ] Nutrição antecede suplementação.
- [ ] Direção visual aprovada, sujeita aos assets oficiais.
- [ ] Mobile, menus, foco e links conferidos.
- [ ] Nenhum dado comercial ou depoimento foi inventado.

## Parte 2 — Páginas do negócio
Ordem: /gestao-esportiva-condominios/, /hub-fitness/, /hub-aquatico/, /hub-esportivo/, /miva/, /consultoria-online/, /e-hub-nutrition/, /vitta-hub/, /equipe/.

### Aceite
- [ ] URLs próprias com conteúdo completo e hierarquia de marca correta.
- [ ] B2B cobre problema, solução, públicos, benefícios, implantação, experiência e FAQ.
- [ ] Hubs se conectam à gestão; M.I.V.A. aos Hubs, consultoria e nutrição.
- [ ] Comparação de planos respeita ofertas, disponibilidade e preços fornecidos.
- [ ] Equipe e atribuições limitadas aos dados documentados.
- [ ] Próximo passo contextual em todas as páginas.

## Parte 3 — Conversão, conteúdo e qualidade
Contato adaptativo; validação, carregamento, erro e sucesso real; antispam; privacidade/termos mediante informações oficiais; índice de conteúdos, busca/filtros e artigos preparados para CMS; analytics desacoplado; sitemap, robots, canonical, schemas e redirects; auditoria final.

### Aceite
- [ ] Formulários entregam a destino real e não simulam sucesso.
- [ ] WhatsApp e loja usam URLs oficiais centralizadas.
- [ ] Eventos só indicam ações efetivamente realizadas, sem dados pessoais.
- [ ] Conteúdos têm modelo editorial completo; nenhuma publicação fictícia.
- [ ] SEO por rota e ambiente, incluindo domínio oficial.
- [ ] Verificar larguras 320, 375, 430, tablet, notebook e desktop.
- [ ] Teclado, contraste, headings, formulários e redução de movimento conferidos.
- [ ] Performance e imagens verificadas; medir Core Web Vitals em produção.
- [ ] Publicação somente após conclusão e revisão dos lotes.

## Dependências externas
Identidade oficial (logo, cores e fontes), fotografias autorizadas, domínio, WhatsApp, e-mail, redes, URL da loja, destino dos leads, dados legais/políticas aprovadas, configuração de analytics e conteúdo editorial validado.

## Estado após a parte 3
A implementação local inclui contato adaptativo com processamento PHP, índice editorial com busca/filtros, template de artigo e infraestrutura de SEO/tracking. O pacote estático com PHP é destinado à Locaweb, conforme pedido do usuário. Ver `VERIFICACAO-PARTE-3.md` e `LOCAWEB.md`.

Os itens de aceite acima continuam para revisão do usuário. Envio real, links comerciais oficiais, política/termos, publicação de artigos, conexão GA4/GTM, mapa de redirects e medição em produção dependem dos dados e aprovações correspondentes. Nenhum envio ou publicação foi realizado. CMS tem contrato editorial preparado, sem painel de edição instalado.

## Revisão de lançamento — 04/11/2026

Devolutiva Técnica 02 e Plano Consolidado recebidos e aplicados. Acompanhamento item a item e testes: `docs/lancamento/DEVOLUTIVA-02.md`. Permanecem abertos os aceites que exigem recebimento real de e-mail, validação comercial/legal, GA4/Search Console e migração WBuy/DNS; não confundir build local aprovado com liberação de publicação.

## Versão 1.0 — Devolutiva 07
Os critérios anteriores de quatro ofertas, equipe, conteúdos e nutrição clínica não se aplicam à versão enxuta solicitada. Checklist vigente: `docs/lancamento/DEVOLUTIVA-07.md`. A versão completa continua recuperável por branch e backup independente. Publicação depende da operação da loja no subdomínio aprovado e do e-mail preservado.

## Landing page E-Hub — 20/11/2026
Build Next/TypeScript e lint aprovados. Validação Chrome em 320, 375, 768, 1024 e 1440 px: um H1, sem overflow horizontal ou imagens quebradas; CTA Contato navega corretamente; preferência de movimento reduzido respeitada. Textos comerciais existentes preservados. Alterações locais para revisão, sem commit/push.

## Validação E-Hub interativo — 20/11/2026
- Chrome em 320/375/430/768/1024/1440 px: um H1, imagens carregadas, sem overflow ou erros JavaScript.
- Parallax reage ao mouse e retorna ao centro; sequência de scroll percorre estados 0, 1 e 2; âncora Explorar suplementos e contato dos cards testados.
- Preferência de movimento reduzido desliga animações/sticky; sem JavaScript os três destaques continuam visíveis em fluxo normal.
- Fontes dos produtos preservadas; script do recorte valida zero diferenças RGB nos pixels opacos.
- Build/TypeScript, lint e testes do projeto executados; Core Web Vitals reais ainda dependem de medição em produção.
- Mudanças locais para revisão. Sem commit/push ou publicação desta etapa.

## Hero com troca de posições — 20/11/2026
Lint e build/TypeScript aprovados. Chrome: arraste mouse nos dois sentidos, botões, ciclo completo por teclado, modo de movimento reduzido, swipe por eventos touch nativos em 375px e scroll vertical independente; sem erros JS ou overflow. Sem commit/push nesta etapa.

## Revisão cromática E-Hub — laranja e grafite
Build Next/TypeScript aprovado. Chrome em 375/768/1440 px sem overflow ou erros JavaScript; CTA principal confirmado em rgb(255,121,0); troca de produto central funcionando. Hero e catálogo revisados visualmente. Sem commit/push nesta etapa.

## Devolutiva 08 — 24/11/2026
- Home 04: quatro pilares mantidos; removidos somente os rótulos solicitados e seus conectores decorativos.
- Home 07 e E-Hub compartilham a sequência de seis produtos. Mobile e movimento reduzido apresentam os produtos em fluxo normal.
- Seis PNGs enviados integrados com transparência real; inspeção visual em fundos claro/escuro. Originais preservados.
- Lint e build Next/TypeScript aprovados. Chrome em 320/375/768/1440 px nas duas páginas: sem overflow horizontal, imagens quebradas ou erros JavaScript.
- Conferidas as seis etapas de scroll, ciclo dos seis produtos da hero com três visíveis, CTA interno e endereço www da loja.
- Prévia local para revisão; sem commit, push ou publicação nesta etapa.

## Devolutiva 09 — validação local
Lint e build Next/TypeScript aprovados. Chrome em 375 e 1440 px: Home, Consultoria e E-Hub sem overflow, imagens quebradas ou erros JavaScript. Conferidos endereço, target, rel e nome acessível dos links comerciais; dois CTAs WhatsApp do E-Hub contêm a mensagem contextual. Imagens e inscrição branca do rodapé revisadas visualmente. Prévia em http://localhost:3012/. HTTPS externo da loja pendente por certificado incompatível com o subdomínio. Sem commit/push nesta etapa.
