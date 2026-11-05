# Devolutiva Técnica 02 — implementação e aceite

Revisão realizada em **04/11/2026**, a partir do documento de **26/10/2026**. As cinco páginas foram lidas e renderizadas. O Plano Consolidado está incluído no mesmo PDF.

## Resultado por prioridade

| Pedido | Entrega no código | Aceite externo pendente |
| --- | --- | --- |
| P0.1 Contato | PHP com validação, CSRF/sessão, honeypot, limite, confirmação de transporte e fallback WhatsApp; CORS restrito para origem oficial; transporte autenticado opcional | URL PHP, remetente/serviço, política aprovada, teste recebido na caixa oficial |
| P0.2 M.I.V.A./T.A.L./T.A.R. | Nomenclaturas conferidas; nenhum T.A.P. no conteúdo publicado | Revisão do cliente |
| P0.3 Arquitetura | Marca principal, três unidades e Hubs subordinados ao B2B preservados | Revisão do cliente |
| P0.4 Programas | Digital, Total, Híbrido Start, Executive VIP em cards, comparação, FAQ e formulário; links anteriores compatíveis | Entregas, disponibilidade e condições; valores sob consulta |
| P0.5 Nutrition | Nutrição primeiro; removidas afirmações de produtos/marca; loja não liberada sem URL validada | Loja/subdomínio e operação comercial |
| P0.6 Navegação | Mensagens exatas por contexto, fallback geral; links e menu mobile testados | Aceite visual final |
| P0.7 Responsividade | 14 rotas em 1440, 375 e 320 px; entrada M.I.V.A. sem tela totalmente vazia, percurso 220svh | Revisão em aparelhos reais |
| P0.8 SEO | Canonical/sitemap domínio definitivo, metadados, H1, 404, www 301; preview protegido | DNS/Vercel, Search Console e ativação controlada da indexação |
| P0.9 GA4 | Adaptador real configurável + consentimento + três eventos pedidos | ID GA4, política publicada, DebugView e medição real |
| P0.10 Segurança/privacidade | Sem secrets públicos; PHP antispam; consentimento; payloads analytics sem dados dos leads | Texto legal e teste HTTPS/entrega no ambiente oficial |
| P1 | Sem fotos/cases fictícios ou integração comercial não validada | Fotos e cases autorizados; evolução posterior |

## Testes locais

- `npm run lint`: passou.
- `npm test`: 9 testes TypeScript e 23 verificações PHP. Incluem falhas de transporte, token inválido, honeypot, consentimento, idempotência, novos planos e retorno autenticado sem ID.
- `npm run build:vercel`: passou, com TypeScript e 18 páginas geradas.
- Chrome headless em build de produção: **42 verificações de página** (14 rotas × 3 larguras), sem overflow horizontal, um H1, description e canonical corretos.
- 14 destinos internos verificados com HTTP 200; rota desconhecida retornou 404. robots preserva noindex enquanto lançamento não liberado; sitemap usa domínio definitivo.
- Menu mobile até Hub Aquático, plano antigo Essencial → Digital, formulário indisponível sem falso sucesso e fallback WhatsApp, entrada da M.I.V.A. e redução de movimento conferidos.
- HTTP PHP local: origem autorizada recebe CORS correto; origem externa rejeitada com 403; preflight autorizado retorna 204; formulário sem configuração retorna 503.
- Nenhum erro JavaScript observado. Não houve envio real de e-mail, evento GA4 real, checkout ou alteração externa.

## Formulário — configuração concreta

1. Hospedar `php/public/api` e `php/private` na Locaweb; `private` deve ficar fora da raiz pública. Criar `php/private/config.php` com base no exemplo (arquivo ignorado pelo Git).
2. Usar um subdomínio HTTPS **do mesmo domínio registrável** do institucional para manter cookies de sessão same-site, por exemplo um host PHP a confirmar. Configurar `NEXT_PUBLIC_CONTACT_API_ORIGIN` com essa origem (sem `/api` nem barra final). Não cadastrar um endereço hipotético no deploy.
3. `origin` PHP deve corresponder exatamente à origem do frontend autorizada, `https://fitnesspersonal.com.br`; CORS não permite wildcard. Preview vercel.app não é ambiente de leads reais; para testes preview usar proxy same-origin ou ambiente same-site aprovado.
4. Destinatário: `vittahub@fitnesspersonal.com.br`. Remetente técnico do domínio autenticado, nunca e-mail do visitante. `reply_to` usa o visitante.
5. Opção Locaweb: `transport=mail`, conforme serviço contratado. Opção autenticada pronta: `transport=resend`, chave somente em `RESEND_API_KEY` do PHP ou configuração privada, domínio validado no provedor e extensão cURL. Resend não foi contratado nem ativado. API retorna sucesso somente com HTTP 2xx e ID; chave de idempotência protege retries. Referência: https://resend.com/docs/api-reference/emails/send-email.
6. Incluir a política aprovada em `content/legal.ts`, com data e `approved:true`; configurar `privacy_approved` no PHP. Não inventar razão social/CNPJ, retenção ou política aprovada.
7. Testar o transporte de forma controlada, confirmar a mensagem na caixa oficial e registrar data/ID/provedor sem dados pessoais. Somente então liberar `enabled` em produção e publicar o frontend. O aviso indisponível depende do token/serviço e da política; não foi removido antecipadamente.
8. Testar recusa/timeout, campos preservados, alternativa WhatsApp e nova tentativa sem duplicar. Aceite do provedor é confirmação de encaminhamento; entrega na caixa exige evidência separada.

## Mensuração

- Informar `NEXT_PUBLIC_GA4_ID=G-...` e `NEXT_PUBLIC_ANALYTICS_ENABLED=true` somente no ambiente autorizado, com política publicada. Sem ID real, nenhum script é carregado.
- Consentimento explícito antes de carregar Google; recusa mantém navegação normal e botão no rodapé permite mudar a escolha.
- **Desativar Medição otimizada no fluxo GA4** (inclusive page views por histórico, interações de formulário e outbound clicks). A aplicação controla eventos manualmente para evitar coleta automática de URLs/query e duplicação.
- `click_whatsapp`, `click_email` e `generate_lead`; evento de lead só após `response.ok && body.ok === true`. Tentativas/falhas não geram lead. Query, hash, referrer e valores de formulário não integram payloads.
- Validar DebugView com aceite/recusa, clique WhatsApp, clique e-mail, envio confirmado e erro. Referência: https://developers.google.com/analytics/devguides/collection/ga4/views.

## WBuy, DNS e virada

Leitura pública em 04/11/2026 (não substitui exportação autenticada da zona):

| Registro | Valor observado |
| --- | --- |
| NS | ns1.locaweb.com.br, ns2.locaweb.com.br, ns3.locaweb.com.br |
| MX | 10 mx.a.locaweb.com.br, 10 mx.b.locaweb.com.br, 20 mx.jk.locaweb.com.br |
| A do domínio raiz | 34.195.244.174 |
| CNAME www | 17795.sistemawbuy.com.br |

A leitura HTTPS do domínio raiz falhou no handshake TLS nesta rede. Não foi possível inventariar produtos/categorias por esse acesso. Isso não prova indisponibilidade global. É necessário exportar o inventário no painel WBuy e verificar SSL com o responsável.

1. Confirmar o subdomínio da loja, proposto `loja.fitnesspersonal.com.br`, e responsável pela zona Locaweb. Exportar zona completa incluindo TTL, MX, SPF, DKIM e DMARC; guardar backup em local privado. Nenhum desses registros deve ser apagado.
2. WBuy deve fornecer os registros exatos para o novo domínio e emitir SSL. Não presumir destinos DNS. Validar produto, categoria, carrinho, frete, login, checkout, pagamento e e-mails transacionais com o responsável.
3. Mapear URLs reais no modelo `docs/lancamento/redirects-inventario.csv`. Depois de validar, cadastrar apenas pares aprovados em `config/store-redirects.json` e a origem em `STORE_REDIRECT_ORIGIN`. O build rejeita conflitos/duplicatas/destinos fora da loja. `next.config.ts` entrega **301** exatos; não existe redirect genérico da 404 para a loja.
4. Adicionar raiz e www na Vercel; obter os valores DNS do projeto. Mostrar proposta de alteração ao responsável antes da virada. www → raiz já preparado em 301.
5. Só após loja, redirects, formulário e e-mail validados: confirmar janela, responsável e autorização para troca dos registros web. Manter nameservers e registros de e-mail.
6. Publicar, testar HTTPS/mobile/checkout/e-mail. Configurar `SITE_INDEXABLE=true` apenas no Production, validar robots/canonical, Search Console e sitemap. `GOOGLE_SITE_VERIFICATION` recebe token público real, sem inventá-lo.
7. Rollback: responsável DNS restaura exatamente os registros web e TTL do backup; preservar a loja e o e-mail. Manter deployment anterior Vercel identificado. Fazer testes de pedidos e e-mail após reverter. Prazo/janela dependem do responsável e do TTL real.

## Pendências e responsáveis a confirmar

| Pendência | Responsável proposto | Prazo/risco |
| --- | --- | --- |
| Programa/entregas e política | Cliente/comercial/jurídico | Antes de liberar formulário/ofertas; evitar promessas ou texto legal não aprovado |
| Host PHP, remetente, provedor e teste recebido | Responsável Locaweb/e-mail + desenvolvimento | Antes da virada; captação não liberada |
| GA4 e Search Console | Responsável marketing/domínio | Antes do aceite de mensuração/indexação |
| Subdomínio, exportação de URLs e checkout | Cliente + fornecedor WBuy | Antes de DNS; risco de vendas/links quebrados |
| Backup zona e proposta de registros | Responsável DNS Locaweb | Antes de qualquer troca; risco de e-mail e disponibilidade |
| Janela, responsáveis e rollback | Cliente + infraestrutura | Data a confirmar após P0; não prometer publicação em sete dias sem dependências |

**Conclusão de aceite:** alterações de código implementadas e verificadas localmente. Lançamento não liberado; faltam configuração, evidência de entrega e validações externas listadas acima. Não houve commit/push/publicação nesta revisão.
