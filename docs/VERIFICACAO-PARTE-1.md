# Verificação da Parte 1 — 02/10/2026

## Executado
- `npx tsc --noEmit`: aprovado.
- `npm run build`: aprovado (SSR + cliente). Vinext informa que a classificação estática da rota raiz é indeterminada; não impede a compilação.
- Resposta HTTP 200 após redirecionamentos para todos os destinos internos da Home, imagens, robots e sitemap.
- H1 único com texto aprovado; `lang=pt-BR`; title, description, Open Graph e noindex/nofollow presentes.
- Imagem principal carrega, com versões WebP, dimensões reservadas, srcset e prioridade alta.
- Verificação DOM nas larguras 320, 375, 430, 768, 1024 e 1440: largura total igual à viewport, sem overflow horizontal.
- Menu mobile abre como diálogo; Escape fecha. Dropdown desktop apresenta Gestão Esportiva e os três Hubs.
- Sem erros ou avisos de console na consulta efetuada.
- Capturas de prévia e árvore de acessibilidade revisadas. Ajustados tamanhos de texto, layout intermediário do Hero e espaço do título do menu.

## Não confundir com aprovação final
- Testes de contraste completos, auditoria WCAG, Lighthouse e Core Web Vitals ficam para a etapa de qualidade. A checagem atual não certifica conformidade WCAG.
- Rotas internas são telas transitórias; não representam páginas entregues.
- Contato, loja e WhatsApp não estão conectados. Nenhum envio foi simulado.
- Canonical depende do domínio oficial; sitemap fica vazio enquanto não houver URL configurada.
- Conteúdos aguardam material editorial aprovado; somente categorias são apresentadas.
- Identidade provisória e imagem ilustrativa gerada precisam de avaliação do usuário.
- Aceite de marca, copy e direção visual permanece com o usuário.
