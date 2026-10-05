# Revisão de UX/UI — 05/10/2026

Referência: Documento 02 — Pacote Master de Conteúdo + Especificação DEV, especialmente §§1, 4, 6–12 e 22–23; reforço do usuário nesta conversa.

## Critérios para revisão do usuário

| Diretriz | Aplicação nesta revisão | Situação |
| --- | --- | --- |
| Assessoria integrada, B2B dominante | Hero com contexto de condomínios; CTA de apresentação; mapa de operação na Home/Gestão | Implementado para revisão |
| Identidade existente | Logo original no header/footer, símbolo como favicon, cores da marca como acentos | Implementado; manual de identidade ainda pendente |
| Pessoas + contexto + movimento | Enquadramento mais amplo do hero, com grupo e condomínio; camada de organização abaixo da imagem | Provisório: fotografia real pendente |
| Gestão + movimento + integração | Diagrama navegável conecta Hubs e estrutura operacional à experiência do morador | Implementado para revisão |
| Gestão Esportiva institucional | Composição editorial B2B, mapa da operação e etapas de implantação | Implementado para revisão |
| Consultoria com relação humana | Jornada Pessoa → Profissional → App → Acompanhamento → Evolução | Implementado para revisão |
| Nutrição primeiro | Visual de avaliação/orientação/acompanhamento; loja permanece posterior e secundária | Implementado para revisão |
| M.I.V.A. transversal | Quatro pilares e links aos três contextos de atuação | Implementado para revisão |
| Hubs como família | Estrutura compartilhada com magenta/Fitness, azul/Aquático e amarelo/Esportivo; vínculo visual à gestão | Implementado para revisão |
| Mobile | Menu, WhatsApp e Apresentação na barra inferior; diagramas e jornadas responsivos | Verificado localmente; aguarda aceite visual |

## Imagens reais ainda necessárias

- Home: grupo diverso em atividade orientada, áreas comuns e arquitetura do condomínio visíveis; enquadramento horizontal amplo.
- Gestão: profissionais e programação em contexto de operação, interação com moradores e espaços em uso.
- Fitness/Aquático/Esportivo: atividade real de cada Hub, com orientação e convivência; manter tratamento fotográfico comum.
- Consultoria: relação profissional/pessoa; imagens autorizadas do aplicativo quando disponíveis.
- Nutrição: atendimento e orientação, sem colocar suplementos como protagonistas.

Não usar fotos geradas como registros de clientes ou equipe. O hero atual está explicitamente identificado como ilustração de IA até a entrega de acervo autorizado.

## Marca

A arte do PDF escreve VITA HUB; os textos do site permanecem VITTA HUB por confirmação expressa do usuário. Não corrigir silenciosamente o logo. PNGs são renderizações da arte fornecida, sem redesenho. Fotografias e retratos oficiais continuam pendentes.

## Escopo técnico

Frontend permanece React/TypeScript/Tailwind, compatível com o build Next.js para Vercel. PHP permanece somente no backend dos formulários. Sem ativação de e-mail, analytics ou publicação automática nesta revisão.

## Evidências técnicas

- Build Next.js para Vercel, TypeScript, lint e testes existentes passaram. Backend PHP mantido sem alterações.
- Navegador: 12 páginas em 320, 375, 430, 768, 1024 e 1440 pixels (72 combinações), sem overflow horizontal, com H1 único e imagens carregadas. Isso não equivale a uma certificação completa de acessibilidade.
- Home revisada visualmente em desktop e celular; Gestão e M.I.V.A. em desktop. E-Hub e interação do FAQ da Consultoria conferidos também na compilação de produção Next.js, sem erros de console nessa verificação.
- Logo renderizado diretamente do PDF e conferido contra o original; texto VITA HUB da arte preservado.
- A imagem de IA continua uma pendência explícita para o aceite de fotografias reais.
