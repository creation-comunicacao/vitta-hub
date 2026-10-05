# Evolução visual dos HUBs — 05/10/2026

## Escopo
Preservação literal de todo o conteúdo. Reutilizados PageHero, HubVisual, CTA, FAQ e blocos originais. Frontend React/TypeScript/CSS; backend PHP intacto. Sem novas dependências.

Fitness: profundidade magenta, aproximação e órbitas. Aquático: deslocamento lateral, reflexos e bolhas. Esportivo: aproximação diagonal e trajetória tática. Em desktop alto, composição sticky em área de 145svh; em janelas baixas/tablet/mobile, fluxo natural. Sem captura da roda ou bloqueio de navegação. Um requestAnimationFrame sob demanda por Hero, IntersectionObserver e limpeza de listeners. Redução de movimento desativa transformações e sticky.

Referências de acabamento consultadas: https://www.apple.com/macbook-pro/ e https://anubi.io/ . Nenhum template ou asset dessas marcas foi copiado.

## Assets
Gerados com ferramenta imagegen integrada, não são fotografias de clientes ou profissionais da VITTA HUB. Imagens decorativas com alt vazio, sem alegações de identidade. Nenhuma legenda foi acrescentada ao site, respeitando a instrução de não alterar textos. A origem ilustrativa fica registrada aqui e foi informada na conversa.

Arquivos: public/hubs/hub-{fitness,aquatico,esportivo}-{700,1400}.webp. Versões mobile: 31/70/53 KB; desktop: 89/205/131 KB respectivamente. Reservas dimensionais e prioridade somente na imagem da Hero da rota visitada. Sem vídeo: o movimento é da composição e das camadas, não animação corporal do atleta.

## Prompts finais (imagegen integrada)

### Fitness
Use case: stylized-concept. Create a premium cinematic 3D editorial illustration for Vitta Hub fitness hero, landscape 3:2. Athletic adult woman with natural realistic proportions doing a controlled dumbbell goblet squat, full body visible centered slightly right, elegant graphite activewear, soft magenta rim light. Architectural residential fitness studio with large windows and muted apartment towers outside. Sophisticated clearly art-directed CGI, not a real customer photo, subtle fine grain, realistic exercise anatomy and hands, minimal luxurious environment, no aggressive bodybuilding. Deep charcoal scene with magenta light accents, subject well illuminated, negative space on left. No text, numbers, logos, watermarks, UI.

### Aquático
Use case: stylized-concept. Premium cinematic 3D editorial illustration for Vitta Hub aquatic hero, landscape 3:2. One adult swimmer with cap and goggles swimming freestyle left to right, whole body visible centered, viewed underwater just below surface in a residential lap pool. Anatomically correct swimmer, elegant elongated motion, tiled pool lines in distance, refracted sun rays from upper left, delicate bubbles, deep navy to luminous cyan water. Clearly art-directed sophisticated CGI, not a real customer photo. Strong layered depth, premium sports campaign, restrained caustics, minimal composition, no text, numbers, logos, watermark, UI.

### Esportivo
Use case: stylized-concept. Premium cinematic 3D editorial illustration for Vitta Hub sports hero, landscape 3:2. Athletic adult man with natural proportions in charcoal football kit preparing a controlled dribble with football at his feet, full body visible centered slightly right, dynamic elegant pose, modern residential condominium sports court with apartment architecture softly in background. Warm golden sidelight, deep graphite and muted olive environment, gold accent shirt trim, subtly visible court markings. Clearly art-directed polished CGI, not real customer photo, correct anatomy and ball shape, sporting energy without aggression. No text, numbers, logos, watermark, UI.

## Verificação
- Build Next/Vercel e TypeScript aprovados.
- Comparação DOM main.textContent antes/depois: igualdade literal nas 3 rotas (3888 / 3642 / 3666 caracteres).
- 18 combinações: 320, 375, 430, 768, 1024 e 1440 px nas 3 rotas: sem overflow horizontal, um H1, imagens carregadas.
- Inspeção visual desktop e mobile; nenhuma alteração no conteúdo de content/pages.ts, config/site.ts ou componentes de FAQ.
- prefers-reduced-motion implementado em CSS e JS; medição Lighthouse/Core Web Vitals em produção não realizada.
