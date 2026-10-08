# Home — auditoria, experiência e mídia

## Auditoria anterior à implementação
- Stack: Next 16/React 19/TypeScript/Tailwind 4; Vinext/Vite na prévia. PHP somente no backend do formulário.
- Seções existentes, mantidas em ordem: Hero; Ecossistema; B2B; Hubs; M.I.V.A.; Jornada e T.A.L./T.A.R.; Consultoria (quatro planos); Nutrição; Experiência; Equipe; Conteúdos; CTA final.
- Conteúdo: Hero “Gestão Esportiva Integrada para uma Vida em Movimento”; ecossistema “Um ecossistema esportivo. Uma gestão integrada.”; B2B “Seu condomínio já possui os espaços. Nós estruturamos o ecossistema esportivo.”; Hubs “Três Hubs. Uma mesma gestão.”; M.I.V.A. “Movimento Inteligente para uma Vida Ativa”; jornada “Diferentes começos. Movimento para a vida.”; consultoria “Seu treino. Sua rotina. Seu acompanhamento.”; nutrição “Nutrição que acompanha o seu movimento.”; experiência “Gestão também é cuidar de cada encontro.”; equipe “Por trás de cada experiência, existe uma equipe.”; conteúdos “Conteúdos para colocar conhecimento em movimento.”; final “Mais vida nos espaços. Mais integração na gestão.”
- Fontes integrais dos textos preservadas: components/sections/ui.tsx, components/sections/home.tsx, components/sections/ecosystem-visuals.tsx, content/home.ts e config/site.ts. Comparação do main.textContent e dos pares texto/href antes/depois: 7.262 caracteres e 33 links idênticos.
- Reutilizados: Hero, CTA, SectionHeader, Hubs (modo cinematográfico exclusivo da Home), OperationMap, MethodSystem, HumanJourney e todas as seções de conteúdo.
- Assets: /hero-700.webp, /hero-1200.webp; seis WebP dos HUBs em /hubs; marca em /brand. Imagens ilustrativas por IA, sem atribuição a clientes. Sem vídeos existentes.
- Cores: --brand-magenta #ad117d; --brand-sky #2694bc; --brand-gold #e7ae00, definidos em app/institutional.css. A nova Home referencia esses tokens, sem novos tons de HUB. Neutros existentes preservados.
- Tipografia: Arial/Helvetica, hierarquia editorial existente. Breakpoints novos de composição: 600/900/1100 px, com sticky apenas em desktop de altura >=780 px.
- Movimento anterior: PageEnhancements aplicava fade-up genérico. Retirado da Home, substituído por um controlador compartilhado, sem instalar biblioteca.
- Referências consultadas: https://anubi.io/ ; https://www.apple.com/macbook-pro/ ; https://supahero.io/hero/eddie ; https://gemini-car.webflow.io/ . Sem reprodução de assets/templates.

## Plano e implementação
| Etapa | Entrada e composição | Scroll / mouse | Saída |
| --- | --- | --- | --- |
| VITTA | Imagem contextual ampla, título e CTAs originais sobrepostos, legenda de IA mantida | Área 130svh no desktop alto, imagem aproxima, luzes das três cores em parallax até 14px | Faixa das três cores conduz ao ecossistema e gestão |
| Contexto B2B | Conteúdo integral, mapa operacional e fluxo de gestão | Título do ecossistema sticky onde cabe; interação nos links do mapa | Fundo grafite contínuo chega à introdução dos Hubs |
| Fitness | Cena com atleta, copy original do Hub, rosa existente | Área 165svh, composição sticky, zoom/órbitas e deslocamento de texto | Máscara elíptica azul entra na base |
| Aquático | Imagem subaquática e título original | Deslocamento horizontal, ondas e refração gráfica em camada | Plano de luz dourada se aproxima pela base |
| Esportivo | Jogador e bola, texto original, dourado | Aproximação diagonal e desenho de trajetória conforme progresso | Gradiente retorna ao grafite e às três cores da M.I.V.A. |
| Integração | Todas as seções seguintes mantidas, nutrição antes da loja | Microinterações específicas em planos, mapa, equipe, temas e CTAs | Retorno ao universo institucional |
| CTA | Copy e destinos originais, composição central | Movimento sutil de título; luzes rosa/azul/dourado convergem | Faixa de marca encontra o rodapé |

Mobile/tablet: fluxo natural, distâncias menores, sem sticky cinematográfico nem vídeo; imagens responsivas. Redução de movimento: transforms, transições, vídeos e sticky desativados. Sem JS o conteúdo permanece legível e os links funcionam.

## Contrato dos vídeos
Vídeos opcionais, autorizados editorialmente antes de preencher `homeVideos`. Não há fontes fictícias/404. HomeVideo é uma camada atrás do texto, sem player, sobre o fallback.

| Arquivo em /public/media/home | Resolução / proporção | Duração | Enquadramento e movimento | Teto por arquivo |
| --- | --- | --- | --- | --- |
| vitta-hero.webm + vitta-hero.mp4 | 1920×1080, 16:9 | 6–8s | Condomínio, pessoas e orientação; corte suave entre universos, área esquerda calma para texto | 3 MB WebM / 4 MB MP4 |
| fitness-hero.webm + fitness-hero.mp4 | 1920×1080, 16:9 | 4–6s | Corpo inteiro à direita; agachamento controlado, câmera estável, sem musculatura exagerada | 2 MB WebM / 3 MB MP4 |
| aquatic-hero.webm + aquatic-hero.mp4 | 1920×1080, 16:9 | 4–6s | Nadador lateral, subaquático, progressão suave e área livre à esquerda | 2.5 MB WebM / 3.5 MB MP4 |
| sports-hero.webm + sports-hero.mp4 | 1920×1080, 16:9 | 3–5s | Jogador à direita com bola no quadro, drible curto, câmera estável | 2 MB WebM / 3 MB MP4 |

24/30 fps, sem áudio, WebM VP9 e MP4 H.264 yuv420p com faststart, loop contínuo sem flashes. Preservar enquadramento do fallback. Preferir master sem texto/logos. Arquivos finais devem passar por revisão anatômica, de direitos e de compressão.

Carregamento: preload=none, src atribuído apenas quando visível e em desktop sem redução de movimento; pausa fora de tela, com aba oculta ou preferência alterada. Falha/autoplay negado deixa o fallback visível. Sem fontes configuradas: nenhum elemento video/request. Mobile usa imagens. Não implementado scroll-scrubbed video: sem arquivos/GOP reais não é possível garantir seek fluido em Safari/iOS; scroll controla as camadas gráficas.

## Performance e limites de verificação
- Um requestAnimationFrame sob demanda; IntersectionObserver limita atualizações às cenas próximas; listeners removidos no cleanup.
- Imagens de HUB com loading=lazy e versões 700/1400px já existentes. Hero prioritária. Dimensões reservadas; sem novas fontes, bibliotecas, WebGL ou canvas.
- Transform/opacity para parallax; máscara simples somente em uma camada por cena. Não há animação contínua em repouso.
- Build Next/Vercel, TypeScript e lint aprovados. Comparação literal de textos/links aprovada.
- LCP, CLS, INP, FPS, memória e CPU/GPU em dispositivos reais e Lighthouse de produção ainda precisam de medição após a inclusão dos vídeos. Não declarar notas ou metas atingidas sem medição.
- Navegador: 320, 375, 430, 768, 1024 e 1440px sem overflow horizontal; um H1, três cenas, nenhum vídeo solicitado e nenhuma imagem concluída com erro. Inspeção visual de Hero desktop/mobile e cenas Fitness/Aquático.

## Intro da Hero — 06/10/2026
- Abertura inspirada no comportamento de Gemini Car, adaptada à imagem contextual existente. Nenhum novo asset, vídeo, biblioteca ou cópia de layout.
- Mesma imagem /hero-1200.webp com srcSet original, uma única instância no DOM. Removido o slot de vídeo da Hero principal; os slots dos HUBs permanecem.
- Máscara central expande em 1.45s; camada de câmera vai de scale(1.23) para 1 em 1.8s. Título começa em 0.8s, descrição em 1.1s, CTAs/secundários em 1.4s. Final em aproximadamente 2.05s.
- Mobile: escala inicial 1.12, máscara mais ampla e expansão em 1.15s. Valores definidos após inspeção da composição existente.
- Intro em CSS, inicializada no HTML para evitar flash de conteúdo seguido de ocultação. Sem JS, as animações terminam normalmente. prefers-reduced-motion não executa a intro.
- Camada hero-camera pertence à intro; imagem interna pertence ao scroll/parallax. Cursor e progresso da abertura não são atualizados durante a intro. Após o término, a camada externa retorna a transform:none e a máscara a none.
- Wheel, touchmove, navegação por teclado, foco e scroll real encerram a intro sem preventDefault. Restauração de scroll/hash inicia no estado final. Listeners/timer removidos no cleanup.
- Verificado no navegador: estado inicial com máscara e scale, estado final sem máscara/transform, uma imagem, texto integral idêntico, interrupção por wheel (scrollY=200 e progresso 0.4325) e Tab. Inspeção visual desktop/mobile. Build Next, TypeScript, lint e diff-check aprovados.
- O contrato anterior de vídeo vitta-hero é supersedido: a primeira experiência utiliza somente a imagem existente, conforme nova orientação.

## Refinamento da intro existente — 06/10/2026
- Evoluída a mesma implementação CSS/React; sem nova dependência, wrapper, timeline ou listener. Navbar, logo, textos, botões, imagem e páginas dos Hubs não foram alterados.
- Moldura inicial mais ampla para incluir a profissional à direita e a moradora central. Pausa inicial curta (15% da expansão); expansão 1.8s, câmera 1.16→1 em 2.15s; título 1.1s, descrição 1.4s, CTAs 1.7s, secundários 1.9s; final ~2.45s.
- Mobile: câmera 1.07→1, expansão 1.35s e sequência final ~1.95s. Sem tracking de mouse. Reduced-motion mantém estado estático sem expansão/parallax.
- Corrigido progresso inicial da Hero: zero no topo, em vez do avanço de 25% da viewport usado nas cenas seguintes. Isso elimina mudança de escala no primeiro evento após intro. Câmera retorna a identidade; imagem interna mantém seu transform de base.
- Mouse ignorado durante intro e limitado na Hero a aproximadamente ±3.85px horizontal / ±2.75px vertical após conclusão; comportamento das outras cenas mantido.
- Verificações: build Next/TypeScript e lint aprovados; inspeção desktop 1440×1000 e mobile 375×812; uma imagem no DOM, conteúdo literal preservado, conclusão sem máscara/transform externo; scroll antecipado encerra intro e continua naturalmente (162.5px observados), sem overflow mobile.

## M.I.V.A. construída pelo scroll — 08/10/2026

A seção 04 usa `components/home/miva-experience.tsx`: no desktop, 280svh de percurso e composição sticky de 100svh. O scroll nativo revela título, pessoa, M.I.V.A., Saúde, Mente, Nutrição, Felicidade / Motivação, órbita, conexões operacionais e CTA. O movimento é reversível; SVGs desenham as conexões e os ícones. Após a construção, os ícones respiram suavemente e o hover realça o pilar e sua conexão.

Sem GSAP pré-instalado, o controle usa requestAnimationFrame agendado por eventos e IntersectionObserver; nenhuma dependência, vídeo, canvas ou WebGL foi adicionada. Mobile e telas baixas usam uma sequência vertical em fluxo normal, revelada pela posição de cada elemento, evitando uma composição fixa maior que a tela. `prefers-reduced-motion` e ausência de JavaScript mostram o conteúdo completo; foco por teclado também revela a composição. Textos permanecem no HTML, com os mesmos quatro destinos de links.

Cores dos ícones mantidas: magenta #ad117d, roxo #7654a8, azul #187c9f e dourado #9b7300; os três últimos valores existentes foram promovidos a variáveis compartilhadas. O MethodSystem utilizado em outras páginas mantém a apresentação anterior.

Verificação: desktop 1440×1000 confirmou sticky, revelação sequencial (Saúde visível antes de Mente/Nutrição/Motivação) e reversão; mobile 375×812 confirmou sequência vertical, textos e links, sem overflow horizontal. Lint e build de produção incluem verificação TypeScript.
