# Devolutiva 07 — versão institucional 1.0

Fonte integral: `docs/fontes/Devolutiva_07_Lancamento.txt`. Esta revisão substitui o escopo editorial anterior; mantém o plano técnico de migração e os registros de e-mail.

## Preservação feita ANTES de editar

- Commit completo: `fee7c36dce1234764d28880f244b913691772bd0`.
- Branch completa: `codex/full-version-before-devolutiva-07`.
- Branch de trabalho isolada: `codex/launch-v1-devolutiva-07`.
- Backup independente local: `/Users/faiaxx/vitta-hub/backups/devolutiva-07/versao-completa.bundle`.
- Bundle contém histórico, código, páginas, textos, mídias e configurações versionadas. Configurações locais existentes foram copiadas separadamente para `configuracao-local/`, com permissões privadas. Dependências instaladas e caches não foram copiados; são reinstaláveis por `npm ci`.
- `git bundle verify` passou. Um clone independente foi criado em `/tmp/vitta-devolutiva07/restauracao-verificada`, recuperando o mesmo SHA. Não depende da pasta de trabalho atual para ler o histórico.
- O bundle e as configurações privadas ficam somente no backup local. O usuário autorizou commit e push das branches de preservação e lançamento; a `main` permanece intacta.

### Restaurar sem sobrescrever o trabalho atual

```sh
git clone /Users/faiaxx/vitta-hub/backups/devolutiva-07/versao-completa.bundle /caminho/novo/vitta-completa
cd /caminho/novo/vitta-completa
git switch codex/full-version-before-devolutiva-07
npm ci
```

Restaurar configurações locais pertinentes de `configuracao-local/` somente no ambiente privado correto. Também existe `RESTAURAR.txt` ao lado do bundle. Não usar reset destrutivo sobre a branch de lançamento.

## Implementação

| Pedido | Resultado |
| --- | --- |
| Navegação | Loja de Suplementos, Contato como último link comum, botão Solicitar Apresentação preservado; mesma organização mobile |
| Loja direta | Destino fixo aprovado `https://loja.fitnesspersonal.com.br`; ativação condicionada a `NEXT_PUBLIC_STORE_VALIDATED=true` após testes operacionais |
| Equipe/Conteúdos | Fora da Home, menus, rodapé, CTAs e sitemap; acessos diretos retornam 404/noindex |
| Home, bloco 4 | Sem links Hubs/Consultoria/Nutrição e sem CTA Conhecer a M.I.V.A.; apresentação animada principal preservada |
| Home, blocos 5/9/10 | Removidos do render da versão 1.0 |
| Home, bloco 6 | Imagem, texto aprovado e CTA Conhecer a Consultoria Online; sem planos |
| Home, bloco 7 | Composição visual de produtos, texto aprovado e CTA interno E-Hub |
| Vitta Hub | Somente texto da caixa E-Hub alterado, além da remoção do CTA para Equipe ocultada |
| Gestão Esportiva | Arquivo de conteúdo integralmente preservado em relação ao commit completo |
| M.I.V.A. | Quatro seções curtas com imagens, quatro símbolos, movimento começa em você, T.A.L./T.A.R.; sem pirâmide detalhada ou bloco negativo |
| Consultoria | Hero amplo e copy aprovada; sem planos/tabelas/preços/sessões; WhatsApp oficial com mensagem exata |
| E-Hub | Landing curta focada na seleção Probiótica; nome da unidade preservado; CTA loja preparado e Contato funcional |
| Contato | Formulário demonstrativo removido; WhatsApp por assunto e e-mail oficial; política preservada |

A versão completa e os dados comerciais históricos continuam disponíveis no backup. Componentes não usados no lançamento também podem permanecer nas fontes; não são renderizados nas páginas públicas.

## Imagens e loja — pendências reais

- Usuário confirmou `https://www.fitnesspersonal.com.br` como único endereço atual e fonte dos produtos.
- Consulta HTTP e navegador nesta rede não permitiram acesso (403/erro de resposta). Nova tentativa solicitada pelo usuário em 19/11/2026 confirmou HTTP 403 tanto na consulta web quanto via HTTP direto. Não foi feito bypass de proteção ou login.
- `https://loja.fitnesspersonal.com.br` falhou no handshake TLS. Isso não comprova indisponibilidade global, mas impede declarar a migração validada.
- Para revisão visual, usados três arquivos de embalagens reais do catálogo oficial da Probiótica: Hiper 100% Whey 900 g, Creatina 300 g e Epic 300 g. URLs e procedência em `public/products/README.md`. Sem embalagens geradas, preços, doses ou promessas adicionadas.
- Conferir com o cliente se estes SKUs/embalagens correspondem ao estoque WBuy e se estão autorizados para publicação. Não foi obtida imagem confirmada de coqueteleira da loja.
- Fotos de movimento reutilizam os assets ilustrativos já existentes, com identificação de IA. Não foram apresentadas como fotos reais da equipe/clientes.
- Enquanto a loja não estiver validada, o menu Loja de Suplementos leva a `/e-hub-nutrition/` e o botão externo permanece desabilitado com orientação de contato. O requisito de menu direto WBuy está **preparado, mas não liberado**. Ativar flag e rebuild somente após SSL/catalogo/checkout conferidos.

## Verificação local

- Lint, testes e build Next.js/TypeScript concluídos.
- Chrome headless: 12 páginas × 7 larguras (320, 375, 430, 768, 1024, 1280, 1440) = **84 verificações**, sem overflow horizontal, imagens quebradas ou erros JavaScript.
- 12 destinos internos com HTTP 200; Equipe, Conteúdos e artigo de teste retornam 404/noindex; sitemap sem áreas ocultas.
- Menu mobile com Contato no último lugar e sem duplicata; navegação ao contato testada.
- Home sem links no bloco M.I.V.A., sem jornada/cards de planos/equipe/conteúdos; Consultoria sem tabela ou condições; página M.I.V.A. com exatamente quatro seções.
- Contato sem `<form>`, e-mail correto e WhatsApp oficial. Cliques não enviaram mensagens reais.
- Gestão Esportiva sem diff de conteúdo. Backup restaurável conferido por clone.

## Aceite de publicação

Não publicado. A branch de trabalho não altera a versão principal no GitHub/Vercel automaticamente.

Antes de marcar horário de publicação:

1. Cliente/WBuy: ativar e validar `loja.fitnesspersonal.com.br` com HTTPS, produtos, carrinho, checkout, frete/pagamento e e-mails transacionais.
2. Cliente: confirmar embalagens/itens e autorização das imagens usadas; substituir por arquivos da loja se necessário.
3. Responsável domínio/e-mail: confirmar continuidade do e-mail corporativo. Nenhum registro DNS, MX, SPF, DKIM ou DMARC foi alterado.
4. Desenvolvimento: ativar flag da loja, rebuild e teste dos links diretos; aplicar o mapa de redirects reais da migração anterior quando fornecido.
5. Cliente: revisar a versão 1.0; então definir janela e autorização de publicação seguindo o plano de rollback existente.

Sem essa validação não há horário de publicação confirmado. O contato por WhatsApp/e-mail permite lançar sem depender da ativação do formulário PHP; a Política de Privacidade ainda precisa do texto oficial aprovado para sair do estado pendente.
